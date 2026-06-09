import { Context } from "../../context";
import { GraphQLError } from "graphql";
import { assertUser, assertWorkspaceAccess } from "../../lib/auth-helpers";
import { GroqService, AISchemaModel } from "../../services/groq.service";
import { ContentModelRepository } from "../../repositories/content-model.repo";
import { prisma } from "../../db/prisma";

// Map field types to display icons in the CMS Modeler
function getFieldIcon(type: string): string {
  switch (type.toLowerCase()) {
    case "richtext":
    case "rich-text":
    case "richtextfield":
      return "rich-text";
    case "number":
      return "number";
    case "boolean":
      return "boolean";
    case "date":
      return "calendar";
    case "location":
      return "location";
    case "asset":
    case "media":
      return "media";
    case "json":
      return "json";
    case "reference":
      return "reference";
    default:
      return "text";
  }
}

// Normalize field type string to exact CMS spec types
function normalizeFieldType(type: string): string {
  const t = type.toLowerCase().trim();
  if (t === "richtext" || t === "rich-text") return "richText";
  if (t === "media") return "asset";
  return t; // text, number, boolean, date, location, asset, json, reference
}

export const aiResolvers = {
  Mutation: {
    generateAIModels: async (
      _: unknown,
      {
        workspaceId,
        prompt,
        history = [],
      }: {
        workspaceId: string;
        prompt: string;
        history: Array<{ role: string; content: string }>;
      },
      context: Context
    ) => {
      // 1. Authenticate user
      let finalUserId: number;

      if (context.workspaceId) {
        // CLI API Token Auth
        if (context.workspaceId !== workspaceId) {
          throw new GraphQLError("Forbidden: API token is not authorized for this workspace", {
            extensions: { code: "FORBIDDEN" }
          });
        }
        const workspace = await prisma.workspace.findUnique({
          where: { id: workspaceId },
        });
        finalUserId = workspace?.createdBy || 1;
      } else {
        // User Session Auth (Dashboard)
        const userId = assertUser(context.userId);
        await assertWorkspaceAccess(userId, workspaceId);
        finalUserId = userId;
      }

      // 2. Security Safeguard: Limit prompt & history sizes to prevent token abuse/DoS
      if (prompt.length > 2000) {
        throw new GraphQLError("Bad Request: Prompt exceeds maximum length of 2000 characters", {
          extensions: { code: "BAD_USER_INPUT" }
        });
      }
      if (history.length > 10) {
        throw new GraphQLError("Bad Request: Chat history exceeds maximum of 10 messages", {
          extensions: { code: "BAD_USER_INPUT" }
        });
      }

      // 3. Call Groq service to generate schema & code
      const result = await GroqService.generate(prompt, history);

      if (!result.isAuthorized) {
        return {
          success: false,
          message:
            result.refusalMessage ||
            "I am only authorized to assist with ContentBay-related structures.",
          models: [],
          sdkCode: "",
        };
      }

      const createdOrUpdatedModels: AISchemaModel[] = [];

      // 4. Apply schema modifications to database
      for (const modelData of result.models) {
        const { name, apiId, description = "", icon = "box", fields } = modelData;

        // Sanitize model apiId
        const sanitizedModelApiId = apiId.replace(/[^a-zA-Z0-9_-]/g, "").trim().toLowerCase();
        if (!sanitizedModelApiId) continue;

        // Check if model already exists in this workspace
        const existingModel = await prisma.contentModel.findUnique({
          where: {
            workspaceId_apiId: {
              workspaceId,
              apiId: sanitizedModelApiId,
            },
          },
        });

        // Map and validate fields (Strict Type Whitelisting & apiId Sanitization)
        const allowedTypes = [
          "text",
          "richtext",
          "rich-text",
          "richtext",
          "number",
          "boolean",
          "date",
          "location",
          "asset",
          "media",
          "json",
          "reference",
        ];
        const mappedFields = fields
          .filter((f) => f.name && f.apiId && f.type && allowedTypes.includes(f.type.toLowerCase()))
          .map((field) => {
            const sanitizedFieldApiId = field.apiId.replace(/[^a-zA-Z0-9_-]/g, "").trim();
            const normalizedType = normalizeFieldType(field.type);
            return {
              name: field.name.trim(),
              type: normalizedType,
              apiId: sanitizedFieldApiId,
              required: !!field.required,
              isTitle: !!field.isTitle,
              description: field.description || "",
              icon: getFieldIcon(field.type),
            };
          })
          .filter((f) => f.apiId.length > 0);

        // Skip model if it has no valid fields or lacks a title field
        if (mappedFields.length === 0) continue;
        if (!mappedFields.some((f) => f.isTitle)) {
          // Force first field to be title if none marked
          mappedFields[0].isTitle = true;
        }

        let savedModel;

        if (existingModel) {
          // Update model and its fields
          savedModel = await ContentModelRepository.update(existingModel.id, {
            name: name.trim(),
            description,
            icon,
            updatedBy: finalUserId,
            fields: mappedFields,
          });
        } else {
          // Create new model and its fields
          savedModel = await ContentModelRepository.create({
            workspaceId,
            name: name.trim(),
            apiId: sanitizedModelApiId,
            description,
            icon,
            createdBy: finalUserId,
            fields: mappedFields,
          });
        }

        createdOrUpdatedModels.push({
          name: savedModel.name,
          apiId: savedModel.apiId,
          description: savedModel.description || "",
          icon: savedModel.icon,
          fields: savedModel.fields.map((f) => ({
            name: f.name,
            apiId: f.apiId,
            type: f.type,
            required: f.required,
            isTitle: f.isTitle,
            description: f.description || "",
          })),
        });
      }

      return {
        success: true,
        message: `Successfully provisioned ${createdOrUpdatedModels.length} models and fields in workspace.`,
        models: createdOrUpdatedModels,
        sdkCode: result.sdkCode,
      };
    },
  },
};
