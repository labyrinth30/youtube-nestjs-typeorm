import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@ApiTags('유저 관련 API')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '유저 정보 조회' })
  @ApiResponse({ status: 200, description: '유저 정보 조회 성공' })
  @ApiResponse({ status: 404, description: '없는 유저 조회' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get(':username')
  async getUserInfo(@Param('username') username: string) {
    return this.userService.findUserByUsername(username);
  }
}
