import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user ;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload, { secret: 'secret' }),
    };
  }

  async register(username: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({ username });

    if (existingUser) {
      throw new BadRequestException('이미 가입한 이메일입니다!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return this.userRepository.save({
      username,
      password: hashedPassword,
    });
  }
}
