import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LocalAuthGuard } from './guard/local.guard';
import { ApiBasicAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('인증 관련 API')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 200, description: '로그인 성공' })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() dto: RegisterDto, @Request() req) {
    return this.authService.login(req.user);
  }

  /// /auth/register
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
    schema: { example: { id: 1, username: 'test' } },
  })
  @ApiResponse({ status: 400, description: '이미 존재하는 사용자' })
  @ApiBody({ type: RegisterDto })
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.username, dto.password);
  }
}
