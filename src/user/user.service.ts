import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { UserType } from './enum/user-type.enum';
import { UpdatePasswordDTO } from './dto/update-password.dto';
import { createPassWordHash, validatePassword } from '../utils/password';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    const hasUser = await this.getUserByEmail(user.email).catch(
      () => undefined,
    );

    if (hasUser) throw new BadRequestException('Email already registered.');

    const passwordHash = await createPassWordHash(user.password);

    return this.userRepository.save({
      ...user,
      typeUser: UserType.USER,
      password: passwordHash,
    });
  }

  async getUserByIdUsingRelations(userId: number): Promise<UserEntity> {
    return this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }

  async getUserById(userId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException(`userId: ${userId} - Not Found`);

    return user;
  }
  async getUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new NotFoundException(`email: ${email} - Not Found`);

    return user;
  }

  async updatePasswordUser(
    userId: number,
    updatePassword: UpdatePasswordDTO,
  ): Promise<UserEntity> {
    const user = await this.getUserById(userId);

    const passwordHash = await createPassWordHash(updatePassword.newPassword);

    const isMatch = await validatePassword(
      updatePassword.lastPassword,
      user?.password || '',
    );

    if (!isMatch) {
      throw new BadRequestException('Last password invalid');
    }

    return this.userRepository.save({
      ...user,
      password: passwordHash,
    });
  }
}
