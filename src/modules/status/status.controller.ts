import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { StatusService } from './status.service';

@ApiTags("status")
@Controller('status')
export class StatusController
{
  constructor(private readonly statusService: StatusService) { }
  
  //Get all Status
  //-----------------
  @Get()
  async allStatus()
  {
    return await this.statusService.allStatus();
  }

  //Get one status
  //-----------------
  @Get(':ID')
  async oneStatus(@Param('ID', ParseIntPipe) ID: number) {
    return await this.statusService.oneStatus(ID);
  }
}
