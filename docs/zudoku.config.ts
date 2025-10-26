import type { ZudokuConfig } from "zudoku";

const config: ZudokuConfig = {
  apis: {
    type: "file",
    input: "../config/routes.oas.json",
  },
};

export default config;
