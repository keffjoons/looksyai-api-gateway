import type { ZudokuConfig } from "zudoku";

const config: ZudokuConfig = {
  page: {
    title: "LooksyAI API Documentation",
  },
  topNavigation: [
    { id: "docs", label: "Documentation" },
    { id: "api", label: "API Reference" },
  ],
  sidebar: {
    docs: [
      {
        type: "category",
        label: "Getting Started",
        items: [
          "getting-started/authentication",
          "getting-started/quick-start",
        ],
      },
      {
        type: "doc",
        id: "api-reference",
        label: "API Reference",
      },
    ],
  },
  redirects: [{ from: "/", to: "/docs" }],
  apis: {
    type: "file",
    input: "../config/routes.oas.json",
    navigationId: "api",
  },
  docs: {
    files: "/pages/**/*.{md,mdx}",
  },

  // Enable self-service API key management
  // Users can sign up, create accounts, and manage their own API keys
  // Authentication options:
  // - For Clerk: { type: "clerk", clerkPubKey: "pk_..." }
  // - For Auth0: { type: "auth0", domain: "yourdomain.auth0.com", clientId: "..." }
  // - For Supabase: { type: "supabase", provider: "github", supabaseUrl: "...", supabaseKey: "..." }
  //
  // Uncomment and configure one of the following authentication providers:
  /*
  authentication: {
    type: "clerk",
    clerkPubKey: process.env.CLERK_PUBLISHABLE_KEY || "",
  },
  */

  // API Key Management Plugin
  // Enables users to create, view, and delete their API keys from /settings/api-keys
  // Uncomment after configuring authentication above:
  /*
  apiKeys: {
    enabled: true,
  },
  */
};

export default config;
