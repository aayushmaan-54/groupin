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
    JWT_SECRET: string;
    ACCESS_TOKEN_TTL: string;
    REFRESH_TOKEN_TTL: string;
    ENCRYPTION_KEY: string;
    NEONDB_POLL_URL: string;
    NEONDB_URL: string;
  }
}
