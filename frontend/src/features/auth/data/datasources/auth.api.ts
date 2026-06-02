import endpoints from '@/core/constants/endpoints';
import request from '@/core/config/api';
import methods from '@/core/constants/methods';
import type { LoginRequestDto, RegisterRequestDto, AuthResponseDto } from '../dtos/auth.dto';

class AuthApi {
  async register(data: RegisterRequestDto): Promise<AuthResponseDto> {
    return request<AuthResponseDto>({
      url: endpoints.auth.register,
      method: methods.POST,
      data,
    });
  }

  async login(data: LoginRequestDto): Promise<AuthResponseDto> {
    return request<AuthResponseDto>({
      url: endpoints.auth.login,
      method: methods.POST,
      data,
    });
  }

  async logout(): Promise<void> {
    return request<void>({
      url: endpoints.auth.logout,
      method: methods.POST,
    });
  }
}

export default AuthApi;
