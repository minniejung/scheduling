import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import dotenv from "dotenv";
import * as path from "path";
import { SuccessInterceptor } from "./common/interceptors/succeess.interceptor";

import { webcrypto } from "crypto";

dotenv.config({ path: path.join(process.cwd(), ".env") });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new SuccessInterceptor());

  await app.listen(process.env.PORT!);

  console.log(`Server running on port ${process.env.PORT}`);
}

bootstrap().catch((err) => {
  console.error("앱 실행 중 오류 발생:", err);
});

if (!globalThis.crypto) {
  (globalThis as any).crypto = webcrypto;
}
