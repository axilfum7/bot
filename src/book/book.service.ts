import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private repo: Repository<Book>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const book = this.repo.create(createBookDto);
    return this.repo.save(book);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.repo.update(id, updateBookDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.repo.delete(id);
  }
}