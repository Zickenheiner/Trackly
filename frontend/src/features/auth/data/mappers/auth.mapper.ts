import type { AuthEntity } from '../../domain/entities/auth.entity';
import type { AuthResponseDto } from '../dtos/auth.dto';

class AuthMapper {
  toEntity(dto: AuthResponseDto): AuthEntity {
    return {
      accessToken: dto.accessToken,
      refreshToken: dto.refreshToken,
      user: {
        id: dto.user.id,
        title: dto.user.title,
        firstName: dto.user.firstName,
        lastName: dto.user.lastName,
        age: dto.user.age,
        email: dto.user.email,
        currency: dto.user.currency,
      },
    };
  }
}

export default AuthMapper;
