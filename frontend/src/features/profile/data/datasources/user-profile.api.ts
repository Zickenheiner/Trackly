import endpoints from '@/core/constants/endpoints';
import request from '@/core/config/api';
import methods from '@/core/constants/methods';
import type {
  UserProfileResponseDto,
  UpdateProfileRequestDto,
} from '../dtos/user-profile.dto';

class UserProfileApi {
  constructor(private readonly baseUrl: string = endpoints.users.me) {}

  async getMe(): Promise<UserProfileResponseDto> {
    return request<UserProfileResponseDto>({
      url: this.baseUrl,
      method: methods.GET,
    });
  }

  async updateMe(
    data: UpdateProfileRequestDto,
  ): Promise<UserProfileResponseDto> {
    return request<UserProfileResponseDto>({
      url: this.baseUrl,
      method: methods.PATCH,
      data,
    });
  }
}

export default UserProfileApi;
