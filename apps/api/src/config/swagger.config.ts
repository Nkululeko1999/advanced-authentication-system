import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(
  app: INestApplication,
  configService: ConfigService,
): void {
  const enabled = configService.get<boolean>('SWAGGER_ENABLED', false);

  if (!enabled) {
    return;
  }

  const swaggerPath = configService.get<string>('SWAGGER_PATH', 'docs');

  const config = new DocumentBuilder()
    .setTitle('Advanced Authentication System')
    .setDescription('API documentation for the Advanced Authentication System')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter the access token returned during login.',
      },
      'access-token',
    )
    .addTag('System', 'API health and system information')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    operationIdFactory: (_controllerKey, methodKey) => methodKey,
  });

  SwaggerModule.setup(swaggerPath, app, document, {
    useGlobalPrefix: true,
    customSiteTitle: 'Advanced Authentication System API Documentation',
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      docExpansion: 'none',
      filter: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    raw: ['json'],
  });
}
