import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.repo.create(createUserDto);
    return this.repo.save(user);
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(id: string) {
    return this.repo.findOne({ where: { id: parseInt(id) } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.repo.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.repo.delete(id);
  }

  async saveUser(telegramId: number) {
    const existing = await this.repo.findOne({ where: { telegramId } });
    if (!existing) {
      const user = this.repo.create({ telegramId });
      await this.repo.save(user);
    }
  }
}