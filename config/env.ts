import { z } from "zod";

const env = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url(),
  PORT: z.string(),
});

interface Env extends z.infer<typeof env> {}

if (process.env.NODE_ENV === "development") {
  env.parse(process.env);
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends Env {}
  }
}
