/// <reference types="vite/client" />

interface ImportMetaEnvironment {
  readonly VITE_API_BASE_URL?: string;
  readonly VITE_BACKEND_DOMAIN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnvironment;
}
