import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';

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

    const salt = 10;

    const passwordHash = await hash(user.password, salt);

    return this.userRepository.save({
      ...user,
      typeUser: 1,
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
}
