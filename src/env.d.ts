/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY?: string;
  // add other env vars as needed
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
