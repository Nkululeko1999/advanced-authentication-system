import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import envSchema from './config/env.validation.js';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
    validationSchema: envSchema,
    validationOptions: {
      libraryOptions: {
          allowUnknown: true,
          abortEarly: false,
        },
    },
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
