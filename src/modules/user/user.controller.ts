import { UserService } from '../user/user.service';
import {Body,Controller,Delete,Get,Param,ParseIntPipe,Post, Put} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("users")
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async allUsers() {
    return await this.userService.allUsers();
  }


  @Get(':id')
  async oneUser(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.oneUser(id);
  }


  @Post()
  async addNewUser(@Body() user: { username: string; password: string }) {
    return await this.userService.addNewUser(user.username, user.password);
  }


  @Put(':id')
  async updateUser(
    @Param('id',ParseIntPipe) id: number,
    @Body() user: { username: string; password: string },
  ) {
    return await this.userService.updateUser(id, user);
  }


  @Delete(':id')
  async deleteUser(@Param('id',ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }
}
