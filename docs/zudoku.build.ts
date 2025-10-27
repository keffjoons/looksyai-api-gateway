import type { ZudokuBuildConfig } from "zudoku/config";

const config: ZudokuBuildConfig = {
  // Disable SSR prerendering to avoid build errors
  prerender: false,
};

export default config;
