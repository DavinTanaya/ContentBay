import { GraphQLError } from "graphql";

interface AIChatMessage {
  role: string;
  content: string;
}

export interface AISchemaField {
  name: string;
  apiId: string;
  type: string;
  required?: boolean;
  isTitle?: boolean;
  description?: string;
}

export interface AISchemaModel {
  name: string;
  apiId: string;
  description?: string;
  icon?: string;
  fields: AISchemaField[];
}

export interface GroqGenerationResult {
  isAuthorized: boolean;
  refusalMessage?: string;
  models: AISchemaModel[];
  sdkCode: string;
}

export class GroqService {
  private static getApiKey(): string {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      throw new GraphQLError(
        "Groq API Key is missing. Please set GROQ_API_KEY in apps/backend/.env",
        { extensions: { code: "CONFIGURATION_ERROR" } }
      );
    }
    return apiKey;
  }

  static async generate(
    prompt: string,
    history: AIChatMessage[] = []
  ): Promise<GroqGenerationResult> {
    const apiKey = this.getApiKey();

    const systemPrompt = `You are the ContentBay AI Assistant. Your sole purpose is to help developers design database content schemas (Content Models and Content Fields) and write JavaScript/TypeScript queries using the "contentbay" npm package.

You MUST follow these strict guidelines:
1. SAFEGUARD: Your answers MUST be strictly related to database content schemas, headless CMS model definitions, content fields, or SDK query snippets for ContentBay. If the prompt or conversation history is unrelated to these topics (e.g. asking for cooking recipes, writing poems, solving math equations, general coding outside content querying, or general chat), you MUST set "isAuthorized" to false, leave the "models" array empty, and provide a polite refusal message in "refusalMessage" explaining that you only help with ContentBay models and scripts.
2. JSON OUTPUT: You must output a valid JSON object. Do not include any markdown fences (like \`\`\`json) or text explanations outside of the JSON object. The JSON structure must match exactly:
{
  "isAuthorized": boolean,
  "refusalMessage": string (empty or explanation if not authorized),
  "models": [
    {
      "name": "Human-friendly Model Name (e.g. Blog Post)",
      "apiId": "unique-api-identifier-in-snake-or-kebab-case (e.g. blog-post)",
      "description": "Short description of what this model holds",
      "icon": "icon-name (e.g. file, user, image, box, folder, calendar, setting)",
      "fields": [
        {
          "name": "Field Display Name (e.g. Title)",
          "apiId": "camelCaseApiId (e.g. title, publishDate)",
          "type": "text" | "richText" | "number" | "boolean" | "date" | "location" | "asset" | "json" | "reference",
          "required": boolean,
          "isTitle": boolean (true for the primary title/name field of the model, false otherwise),
          "description": "Optional description of the field"
        }
      ]
    }
  ],
  "sdkCode": "A clean, copy-pasteable JavaScript script demonstrating how to query or filter these models using the 'contentbay' npm package. Explain how to initialize it and write clean helper functions (e.g., fetchBlogPosts(), filterPostsByAuthor()) using the builder syntax."
}
3. CONTEXT MEMORY: You are given the chat history. The user may refer to previous models, request modifications, ask to add/remove fields, or ask to write queries for previously generated models. Always integrate this history to provide a continuous, unified response.
4. VALIDATION: Make sure at least one field in each model has "isTitle": true. Ensure all types are strictly "text", "richText", "number", "boolean", "date", "location", "asset", "json", or "reference".`;

    const messages = [
      { role: "system", content: systemPrompt },
      ...history.map((msg) => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content,
      })),
      { role: "user", content: prompt },
    ];

    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages,
            response_format: { type: "json_object" },
            temperature: 0.2,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Groq API responded with status ${response.status}: ${errorText}`
        );
      }

      const responseData = (await response.json()) as any;
      const responseContent = responseData.choices?.[0]?.message?.content;

      if (!responseContent) {
        throw new Error("Empty response received from Groq AI API");
      }

      const result = JSON.parse(responseContent) as GroqGenerationResult;

      // Fallback defaults
      if (typeof result.isAuthorized !== "boolean") {
        result.isAuthorized = true;
      }
      if (!result.models) {
        result.models = [];
      }
      if (typeof result.sdkCode !== "string") {
        result.sdkCode = "";
      }

      return result;
    } catch (error: any) {
      console.error("Error generating AI schema from Groq:", error);
      throw new GraphQLError(
        `AI structure generation failed: ${error.message || error}`,
        { extensions: { code: "AI_GENERATION_FAILED" } }
      );
    }
  }
}
