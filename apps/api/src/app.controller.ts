import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('System')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Get a greeting message' })
  @ApiResponse({
    description: 'A greeting message from the API.',
    schema: {
      example: {
        status: 'ok',
        message: 'Hello World!',
        timestamp: new Date().toString(),
      },
    },
  })
  getHello() {
    return this.appService.getHello();
  }

  @Get('health')
  @ApiOperation({ summary: 'Get API health status' })
  @ApiResponse({
    description: 'The API is operational.',
    schema: {
      example: {
        status: 'ok',
        service: 'advanced-authentication-system',
        timestamp: new Date().toString(),
      },
    },
  })
  getHealth(): { status: string; message: string } {
    return this.appService.getHealth();
  }
}
