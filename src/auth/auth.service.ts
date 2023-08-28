import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/entity/user.entity';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ReturnLoginDto } from './dto/returnLogin.dto';
import { ReturnUserDto } from '../user/dto/returnUser.dto';
import { LoginPayloadDto } from './dto/loginPayload.dto';
import { validatePassword } from '../utils/password';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(login: LoginDto): Promise<ReturnLoginDto> {
    const user: UserEntity | undefined = await this.userService
      .getUserByEmail(login.email)
      .catch(() => undefined);

    const isMatch = await validatePassword(
      login.password,
      user?.password || '',
    );

    if (!user || !isMatch)
      throw new NotFoundException('Email or password invalid');

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayloadDto(user) }),
      user: new ReturnUserDto(user),
    };
  }
}
