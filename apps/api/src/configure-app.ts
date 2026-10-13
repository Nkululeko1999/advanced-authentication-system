import { type INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export function configureApp(app: INestApplication): void {
  const configService = app.get(ConfigService);

  const apiPrefix = configService.get<string>('API_PREFIX') ?? 'api';

  const frontendUrl =
    configService.get<string>('FRONTEND_URL') ?? 'http://localhost:5173';
  const frontendOrigins = (
    configService.get<string>('FRONTEND_URLS') ?? frontendUrl
  )
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean);

  app.setGlobalPrefix(apiPrefix);

  app.enableCors({
    origin: frontendOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Request-Id'],
    exposedHeaders: ['X-Request-Id', 'Retry-After'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      validationError: {
        target: false,
        value: false,
      },
    }),
  );
}