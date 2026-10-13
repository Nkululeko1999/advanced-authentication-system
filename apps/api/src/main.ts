import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { Express } from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module.js';
import { configureApp } from './configure-app.js';
import { setupSwagger } from './config/swagger.config.js';
import { requestIdMiddleware } from './common/middleware/request-id.middleware.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get<number>('NODE_PORT', 8080);

  const apiPrefix = configService.get<string>('API_PREFIX') ?? 'api';

  const swaggerEnabled = configService.get<boolean>('SWAGGER_ENABLED') ?? false;

  const expressApplication = app.getHttpAdapter().getInstance() as Express;

  /*
   * Advanced authentication will run behind a reverse proxy
   * such as Vercel, AWS or Nginx.
   */
  expressApplication.set('trust proxy', 1);

  expressApplication.disable('x-powered-by');

  /*
   * Helmet must be registered before
   * other application middleware.
   */
  app.use(
    helmet({
      crossOriginResourcePolicy: {
        policy: 'cross-origin',
      },
      /*
       * Swagger UI uses inline styles and scripts.
       * CSP remains enabled whenever Swagger is disabled.
       */
      contentSecurityPolicy: swaggerEnabled ? false : undefined,
    }),
  );

  app.use(requestIdMiddleware);
  configureApp(app);

  setupSwagger(app, configService);

  await app.listen(port);

  console.log(
    `Advanced Authentication System API running at http://localhost:${port}/${apiPrefix}`,
  );
}

void bootstrap();
