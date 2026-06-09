import * as fs from "fs";
import * as path from "path";

// 1. Simple helper to parse and load .env file
function loadEnv() {
  try {
    const envPath = path.join(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, "utf8");
      const lines = envContent.split(/\r?\n/);
      for (const line of lines) {
        // Skip comments and empty lines
        if (line.trim().startsWith("#") || !line.trim()) continue;

        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
          const key = match[1];
          let value = match[2] || "";
          value = value.trim();
          // Remove surrounding quotes if present
          if (
            (value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))
          ) {
            value = value.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = value;
          }
        }
      }
    }
  } catch (e) {
    // Silent fail on environment loading
  }
}

// Help instructions
function printHelp() {
  console.log(`
\x1b[1m\x1b[34mContentBay CLI\x1b[0m - Vibe Coding Assistant

\x1b[1mUsage:\x1b[0m
  npx contentbay prompt "<your-model-specifications>"

\x1b[1mOptions:\x1b[0m
  --space <id>   The Workspace Space ID (overrides CONTENTBAY_SPACE_ID)
  --token <key>  The API Token (overrides CONTENTBAY_API_TOKEN)
  --url <url>    The GraphQL API endpoint URL (overrides default)

\x1b[1mExamples:\x1b[0m
  npx contentbay prompt "Create a blog with posts, comments and categories"
  npx contentbay prompt "Add a tag field to the posts model"
  
\x1b[1mFeatures:\x1b[0m
  - Automatically provisions models/fields in your ContentBay workspace.
  - Maintains conversation history context (saved locally in .contentbay-session.json).
  - Generates ready-to-use JS query helpers in contentbay-client.js.
`);
}

async function run() {
  loadEnv();

  const args = process.argv.slice(2);
  let spaceId = process.env.CONTENTBAY_SPACE_ID || "";
  let apiToken = process.env.CONTENTBAY_API_TOKEN || "";
  let apiUrl = process.env.CONTENTBAY_API_URL || "https://api.contentbay.tech/";

  const promptArgs: string[] = [];
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--space" && i + 1 < args.length) {
      spaceId = args[i + 1];
      i++;
    } else if (args[i] === "--token" && i + 1 < args.length) {
      apiToken = args[i + 1];
      i++;
    } else if (args[i] === "--url" && i + 1 < args.length) {
      apiUrl = args[i + 1];
      i++;
    } else {
      promptArgs.push(args[i]);
    }
  }

  // Expect 'prompt' as the first subcommand
  if (promptArgs[0] !== "prompt" || promptArgs.length < 2) {
    printHelp();
    process.exit(0);
  }

  const promptText = promptArgs.slice(1).join(" ").trim();

  if (!spaceId) {
    console.error(
      "\x1b[31mError: Space ID is missing. Set CONTENTBAY_SPACE_ID in .env or pass --space <id>\x1b[0m"
    );
    process.exit(1);
  }

  if (!apiToken) {
    console.error(
      "\x1b[31mError: API Token is missing. Set CONTENTBAY_API_TOKEN in .env or pass --token <key>\x1b[0m"
    );
    process.exit(1);
  }

  console.log(`\x1b[36mSending prompt to ContentBay AI...\x1b[0m`);
  console.log(`Prompt: "${promptText}"`);
  console.log(`Workspace: ${spaceId}`);

  // Load chat session history from local file if it exists
  const sessionPath = path.join(process.cwd(), ".contentbay-session.json");
  let history: Array<{ role: string; content: string }> = [];

  if (fs.existsSync(sessionPath)) {
    try {
      history = JSON.parse(fs.readFileSync(sessionPath, "utf8"));
    } catch (e) {
      console.warn("\x1b[33mWarning: Failed to parse .contentbay-session.json history cache.\x1b[0m");
    }
  }

  // GraphQL query payload
  const query = `
    mutation GenerateAIModels($workspaceId: String!, $prompt: String!, $history: [AIChatMessageInput!]) {
      generateAIModels(workspaceId: $workspaceId, prompt: $prompt, history: $history) {
        success
        message
        models {
          name
          apiId
          fields {
            name
            apiId
            type
          }
        }
        sdkCode
      }
    }
  `;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-contentbay-token": apiToken,
      },
      body: JSON.stringify({
        query,
        variables: {
          workspaceId: spaceId,
          prompt: promptText,
          history,
        },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status}: ${text}`);
    }

    const resBody = (await response.json()) as any;

    if (resBody.errors) {
      throw new Error(resBody.errors[0]?.message || "GraphQL query execution error");
    }

    const data = resBody.data?.generateAIModels;
    if (!data) {
      throw new Error("No data returned from generateAIModels mutation");
    }

    if (!data.success) {
      console.log(`\n\x1b[1m\x1b[33mAI Refusal (Safeguard Block):\x1b[0m`);
      console.log(`\x1b[33m${data.message}\x1b[0m\n`);
      process.exit(0);
    }

    // Success state
    console.log(`\n\x1b[1m\x1b[32mSuccess!\x1b[0m`);
    console.log(`\x1b[32m${data.message}\x1b[0m\n`);

    // Print created models & fields
    if (data.models && data.models.length > 0) {
      console.log(`\x1b[1mProvisioned Structures:\x1b[0m`);
      for (const model of data.models) {
        console.log(`  - \x1b[1m${model.name}\x1b[0m (API ID: \x1b[34m${model.apiId}\x1b[0m)`);
        if (model.fields && model.fields.length > 0) {
          const fieldsStr = model.fields
            .map((f: any) => `${f.name} (${f.type})`)
            .join(", ");
          console.log(`    Fields: ${fieldsStr}`);
        }
      }
      console.log();
    }

    // Save history context
    history.push({ role: "user", content: promptText });
    history.push({ role: "assistant", content: data.message });
    fs.writeFileSync(sessionPath, JSON.stringify(history, null, 2), "utf8");

    // Write generated SDK helpers locally
    if (data.sdkCode) {
      const clientScriptPath = path.join(process.cwd(), "contentbay-client.js");
      fs.writeFileSync(clientScriptPath, data.sdkCode, "utf8");
      console.log(`\x1b[36mGenerated SDK query script written to:\x1b[0m`);
      console.log(`  \x1b[1m${clientScriptPath}\x1b[0m`);
      console.log(`\nImport these query helpers directly to start coding!`);
    }
  } catch (error: any) {
    console.error(`\x1b[31mError during generation: ${error.message || error}\x1b[0m`);
    process.exit(1);
  }
}

run();
