/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_HUGGINGFACE_API_KEY: string
  readonly VITE_TRADER_MATCHING_MODEL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 