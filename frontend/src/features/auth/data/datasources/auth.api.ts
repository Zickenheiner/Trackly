import endpoints from '@/core/constants/endpoints';
import request from '@/core/config/api';
import methods from '@/core/constants/methods';
import type { RegisterRequestDto, AuthResponseDto } from '../dtos/auth.dto';

class AuthApi {
  constructor(private readonly baseUrl: string = endpoints.auth.register) {}

  async register(data: RegisterRequestDto): Promise<AuthResponseDto> {
    return request<AuthResponseDto>({
      url: this.baseUrl,
      method: methods.POST,
      data,
    });
  }
}

export default AuthApi;
