import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { status: string, message: string, timestamp: string } {
    return {
      status: 'ok',
      message: 'Hello World!',
      timestamp: new Date().toISOString(),
    };
  }

  getHealth(): { status: string; message: string, timestamp: string } {
    return {
      status: 'ok',
      message: 'API is healthy and running.',
      timestamp: new Date().toISOString(),
    };
  }
}
