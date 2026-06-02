import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import type { Response } from 'express';
import { IAuthService } from '@features/auth/interfaces/services/auth.iservice';
import {
  LoginDto,
  RegisterDto,
  TokensDto,
  AuthResponseDto,
} from '@features/auth/domains/dtos/auth.dto';
import { Public } from '@core/decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject('IAuthService')
    private readonly authService: IAuthService,
  ) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, type: AuthResponseDto })
  @ApiResponse({ status: 409, description: 'Email already in use' })
  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(dto);
  }

  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const result = await this.authService.login(dto);
    res.cookie('access_token', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return result;
  }

  @ApiOperation({ summary: 'Logout the current user' })
  @ApiResponse({ status: 200, type: Boolean })
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Req() req: { user: { sub: string } }): Promise<boolean> {
    return this.authService.logout(req.user.sub);
  }

  @ApiOperation({ summary: 'Refresh access and refresh tokens' })
  @ApiResponse({ status: 200, type: TokensDto })
  @ApiBearerAuth('AccessToken')
  @Public()
  @UseGuards(AuthGuard('jwt-refresh'))
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refreshTokens(
    @Req() req: { user: { sub: string; refreshToken: string } },
  ): Promise<TokensDto> {
    const user = req.user;
    return this.authService.refreshTokens(user.sub, user.refreshToken);
  }
}
