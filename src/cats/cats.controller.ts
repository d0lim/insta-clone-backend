import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './schemas/cat.schema';

@Controller('cats')
@ApiTags('Cats API')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @ApiOperation({
    summary: 'Find all cats',
    description: `Return all cats' list`,
  })
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new cat',
    description: `This api gets new cat's data and create a new cat.`,
  })
  @ApiBody({ type: CreateCatDto })
  @ApiCreatedResponse({ description: 'Cat created!' })
  async create(@Body() catData: CreateCatDto): Promise<Cat> {
    return this.catsService.create(catData);
  }
}
