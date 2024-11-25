import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@ApiTags('게시판 관련 API')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @ApiOperation({ summary: '게시판 등록' })
  @ApiResponse({ status: 201, description: '게시판 등록 성공' })
  @ApiResponse({ status: 400, description: '게시판 등록 실패' })
  @ApiBody({ type: CreateBoardDto })
  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @ApiOperation({ summary: '게시판 전체 조회' })
  @ApiResponse({ status: 200, description: '게시판 전체 조회 성공' })
  @ApiResponse({ status: 404, description: '아무 글도 없는 경우' })
  @Get()
  findAll() {
    return this.boardService.findAll();
  }

  @ApiOperation({ summary: '게시물 id로 특정 게시물 상세 조회' })
  @ApiResponse({ status: 200, description: '특정 게시물 조회 성공' })
  @ApiResponse({ status: 404, description: '해당 id의 게시물이 없는 경우' })
  @Get(':id')
  async findOneByBoardId(@Param('id') id: string) {
    await this.boardService.incrementViewCount(+id);
    return this.boardService.getBoardById(+id);
  }

  @ApiOperation({ summary: '게시물 id로 특정 게시물 수정' })
  @ApiResponse({ status: 200, description: '특정 게시물 수정 성공' })
  @ApiResponse({ status: 404, description: '해당 id의 게시물이 없는 경우' })
  @ApiBody({ type: UpdateBoardDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(+id, updateBoardDto);
  }

  @ApiOperation({ summary: '게시물 id로 특정 게시물 삭제' })
  @ApiResponse({ status: 200, description: '특정 게시물 삭제 성공' })
  @ApiResponse({ status: 404, description: '해당 id의 게시물이 없는 경우' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardService.remove(+id);
  }
}
