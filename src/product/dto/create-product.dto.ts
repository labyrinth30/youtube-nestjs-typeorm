import { IsNumber, IsString } from 'class-validator';
import { Product } from '../entities/product.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';

export class CreateProductDto extends PickType(Product, [
  'name',
  'description',
  'price',
]) {
  @ApiProperty({
    example: 'test',
    description: 'The name of the Product',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'test',
    description: 'The description of the Product',
    required: true,
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 1000,
    description: 'The price of the Product',
    required: true,
  })
  @IsNumber()
  price: number;
}
