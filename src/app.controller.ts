import { Controller, Get } from '@nestjs/common';


@Controller()
export class AppController {
  constructor() { }

  @Get()
  index() {
    return {
      status: 'online',
      version: '0.1',
    }
  }
}
