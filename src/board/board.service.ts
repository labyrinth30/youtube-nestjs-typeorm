import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  create(createBoardDto: CreateBoardDto) {
    return this.boardRepository.save(createBoardDto);
  }

  findAll() {
    return this.boardRepository.find();
  }

  async getBoardById(id: number) {
    const board = await this.boardRepository.findOne({
      where: { id },
    });
    if (!board) {
      throw new NotFoundException(`Board not found with id ${id}`);
    }
    return board;
  }

  async incrementViewCount(id: number) {
    await this.boardRepository.increment({ id }, 'viewCount', 1);
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    await this.boardRepository.update(id, updateBoardDto);
    return this.boardRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.boardRepository.delete(id);

    return id;
  }
}
