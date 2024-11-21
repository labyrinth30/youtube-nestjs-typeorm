import { IsString } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../../user/entities/user.entity';

export class RegisterDto extends PickType(User, ['username', 'password']) {
  @ApiProperty({
    example: 'test',
    description: 'The username of the User',
    required: true,
  })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'test',
    description: 'The password of the User',
    required: true,
  })
  @IsString()
  password: string;
}
