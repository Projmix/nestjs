import { Controller, Get, Render } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('reset-problems')
  async resetProblemsFlag() {
    const count = await this.userService.resetProblemsFlag();
    const users = await this.userService.getAllUsers();
    return { message: `${count} users had problems set to true.`, users };
  }

  @Get()
  @Render('users')
  async getUsers() {
    const users = await this.userService.getAllUsers();
    return { users };
  }

  @Get('randomize-problems')
  async randomizeProblems() {
    await this.userService.randomizeProblems();
    const users = await this.userService.getAllUsers();
    return { users };
  }
}
