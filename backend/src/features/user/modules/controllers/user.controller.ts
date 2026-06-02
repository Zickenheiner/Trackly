import {
  CreateUserDto,
  UpdatePreferencesDto,
  UpdateProfileDto,
  UpdateUserDto,
  UserPreferencesDto,
  UserProfileDto,
} from '@features/user/domains/dtos/user.dto';
import { UserEntity } from '@features/user/domains/entities/user.entity';
import { IUserService } from '@features/user/interfaces/services/user.iservice';
import { Public } from '@core/decorators/public.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    @Inject('IUserService')
    private readonly userService: IUserService,
  ) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserEntity] })
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get current user profile' })
  @ApiBearerAuth('AccessToken')
  @ApiResponse({ status: 200, type: UserProfileDto })
  @ApiResponse({ status: 401, description: 'Non authentifié' })
  @Get('me')
  async getProfile(
    @Req() req: { user: { sub: string } },
  ): Promise<UserProfileDto> {
    return this.userService.getProfile(req.user.sub);
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: UserEntity })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: 201, type: Boolean })
  @Public()
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @ApiOperation({ summary: 'Update current user profile' })
  @ApiBearerAuth('AccessToken')
  @ApiBody({ type: UpdateProfileDto })
  @ApiResponse({ status: 200, type: UserProfileDto })
  @ApiResponse({ status: 400, description: 'Validation échouée' })
  @ApiResponse({ status: 401, description: 'Non authentifié' })
  @Patch('me')
  async updateProfile(
    @Req() req: { user: { sub: string } },
    @Body() dto: UpdateProfileDto,
  ): Promise<UserProfileDto> {
    return this.userService.updateProfile(req.user.sub, dto);
  }

  @ApiOperation({ summary: 'Update current user theme preference' })
  @ApiBearerAuth('AccessToken')
  @ApiBody({ type: UpdatePreferencesDto })
  @ApiResponse({ status: 200, type: UserPreferencesDto })
  @ApiResponse({ status: 400, description: 'Validation échouée' })
  @ApiResponse({ status: 401, description: 'Non authentifié' })
  @Patch('me/preferences')
  async updatePreferences(
    @Req() req: { user: { sub: string } },
    @Body() dto: UpdatePreferencesDto,
  ): Promise<UserPreferencesDto> {
    return this.userService.updatePreferences(req.user.sub, dto);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: 200, type: Boolean })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: Boolean })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
