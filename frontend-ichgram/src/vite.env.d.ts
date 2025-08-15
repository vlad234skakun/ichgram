/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // добавь сюда другие переменные, если нужно
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
