import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Health check endpoint returning a simple greeting.' })
  @ApiOkResponse({ description: 'API is reachable.', type: String })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
