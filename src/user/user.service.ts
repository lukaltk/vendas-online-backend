import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './interface/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createUser(user: CreateUserDto): Promise<UserEntity> {
    const salt = 10;

    const passwordHash = await hash(user.password, salt);

    return this.userRepository.save({
      ...user,
      typeUser: 1,
      password: passwordHash,
    });
  }

  async getAllUsers(): Promise<UserEntity[]> {
    return this.userRepository.find();
  }
}
