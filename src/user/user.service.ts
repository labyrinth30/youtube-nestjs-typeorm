import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findUserByUsername(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    if (!user) {
      return undefined;
    }
    return user;
  }
}
