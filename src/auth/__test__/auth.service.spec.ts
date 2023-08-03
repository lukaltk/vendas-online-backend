import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';

import { AuthService } from '../Auth.service';
import { UserService } from '../../user/user.service';

import { jwtMock } from '../__mock__/jwt.mock';
import { loginUserMock } from '../__mock__/login-user.mock';
import { userEntityMock } from '../../user/__mock__/user.mock';
import { ReturnUserDto } from '../../user/dto/returnUser.dto';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            getUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: () => jwtMock,
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should return user if password and email valid', async () => {
    const user = await service.login(loginUserMock);

    expect(user).toEqual({
      accessToken: jwtMock,
      user: new ReturnUserDto(userEntityMock),
    });
  });

  it('should return error if password is invalid', () => {
    expect(
      service.login({ ...loginUserMock, password: 'ABC' }),
    ).rejects.toThrowError();
  });

  it('should return error if email not exists', () => {
    jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(undefined);

    expect(service.login(loginUserMock)).rejects.toThrowError();
  });

  it('should return error in UserService', () => {
    jest.spyOn(userService, 'getUserByEmail').mockRejectedValue(new Error());

    expect(service.login(loginUserMock)).rejects.toThrowError();
  });
});
