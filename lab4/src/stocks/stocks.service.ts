import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StocksService {
  constructor(
    @InjectRepository(Stock)
    private stocksRepository: Repository<Stock>
  ) {}

  async create(createStockDto: CreateStockDto): Promise<Stock> {
    const stock = this.stocksRepository.create(createStockDto);
    return this.stocksRepository.save(stock);
  }

  async findAll(title?: string): Promise<Stock[]> {
    if (title) {
      return this.stocksRepository.find({
        where: { title: title }
      });
    }
    return this.stocksRepository.find();
  }

  async findOne(id: number): Promise<Stock> {
    const stock = await this.stocksRepository.findOne({
      where: { id: id }
    });
    if (!stock) {
      throw new NotFoundException(`Stock with ID ${id} not found`);
    }
    return stock;
  }

  async update(id: number, updateStockDto: UpdateStockDto): Promise<Stock> {
    const stock = await this.findOne(id);
    Object.assign(stock, updateStockDto);
    return this.stocksRepository.save(stock);
  }

  async remove(id: number): Promise<void> {
    const stock = await this.findOne(id);
    await this.stocksRepository.remove(stock);
  }
}
