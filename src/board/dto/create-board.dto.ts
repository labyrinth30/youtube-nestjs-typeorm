import { ApiProperty, ApiPropertyOptional, PickType } from '@nestjs/swagger';
import { Board } from '../entities/board.entity';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBoardDto extends PickType(Board, [
  'title',
  'contents',
  'viewCount',
]) {
  @ApiProperty({
    example: 'test',
    description: 'The title of the Board',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'test',
    description: 'The contents of the Board',
    required: true,
  })
  @IsString()
  contents: string;

  @IsOptional()
  @ApiPropertyOptional({
    example: 0,
    description: 'The view count of the Board',
    required: false,
  })
  @IsNumber()
  viewCount: number;
}
