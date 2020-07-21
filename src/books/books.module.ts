import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { Book } from './book.entity';
import { Author } from '../authors/author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Author, Book])],
  providers: [BooksResolver, BooksService],
  exports: [BooksService],
})
export class BooksModule {}
