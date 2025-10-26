export default {
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
};
