declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    ORIGIN: string;
    API_PREFIX: string;
    LOG_LEVEL:
      | "fatal"
      | "error"
      | "warn"
      | "info"
      | "debug"
      | "trace"
      | "silent";
    PORT: number;
    TRUST_PROXY: number;
  }
}
