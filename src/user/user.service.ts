import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './interface/user.interface';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(user: CreateUserDto): Promise<User> {
    const salt = 10;

    const passwordHash = await hash(user.password, salt);

    const newUser: User = {
      ...user,
      id: this.users.length + 1,
      password: passwordHash,
    };

    this.users.push(newUser);

    return newUser;
  }

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }
}
