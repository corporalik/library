import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';

import { Book } from './book.entity';
import BookInput from './book.input';

import { Author } from '../authors/author.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(Author) private authorRepository: Repository<Author>,
  ) {}

  async getBooks(title?: Book['title']): Promise<Book[]> {
    if (title) {
      return await this.bookRepository.find({
        where: { title: Like(`%${title}%`) },
        relations: ['authors'],
      });
    }
    return await this.bookRepository.find({
      relations: ['authors'],
    });
  }

  async getBook(id: Book['id']): Promise<Book | null> {
    const book = await this.bookRepository.findOne(
      { id },
      { relations: ['authors'] },
    );
    return book || null;
  }

  async createBook(book: BookInput): Promise<Book> {
    const authors = await this.authorRepository.findByIds(book.authorIds);

    const bookEntity = new Book();
    bookEntity.title = book.title;
    bookEntity.authors = authors;

    return await this.bookRepository.save(bookEntity);
  }

  async deleteBook(id: Book['id']): Promise<number> {
    const book = await this.bookRepository.find({ id });
    const entities = await this.bookRepository.remove(book);
    return entities.length;
  }

  async addAuthor(bookId: Book['id'], authorId: Author['id']): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id: bookId },
      relations: ['authors'],
    });

    if (!book) {
      throw new Error('Book not found!');
    }

    const author = await this.authorRepository.findOne({ id: authorId });

    if (!book) {
      throw new Error('Book not found!');
    }

    if (book.authors.indexOf(author) >= 0) {
      return book;
    }

    book.authors.push(author);
    return this.bookRepository.save(book);
  }
}
