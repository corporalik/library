import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import AuthorInput from './author.input';
import { Book } from '../books/book.entity';
import { noop } from 'rxjs';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author) private authorRepository: Repository<Author>,
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async getAuthor(id: Author['id']): Promise<Author | null> {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: ['books'],
    });
    return author || null;
  }

  async getAuthors(
    minNumberOfBooks = 0,
    maxNumberOfBooks?: number,
  ): Promise<Author[]> {
    const authors = await this.authorRepository.find({ relations: ['books'] });

    if (maxNumberOfBooks) {
      return authors.filter(
        ({ books }) =>
          books.length >= minNumberOfBooks && books.length <= maxNumberOfBooks,
      );
    }

    return authors.filter(author => author.books.length >= minNumberOfBooks);
  }

  async createAuthor(author: AuthorInput): Promise<Author> {
    return this.authorRepository.save(author);
  }

  async deleteAuthor(id: Author['id']): Promise<number> {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: ['books'],
    });

    if (!author) {
      return 0;
    }

    await this.authorRepository.remove(author);

    return 1;
  }

  async deleteAuthorWithBooks(id: Author['id']): Promise<number> {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: ['books'],
    });

    if (!author) {
      return 0;
    }

    const books = author.books;

    books.forEach(async authorBook => {
      const book = await this.bookRepository.findOne({
        where: { id: authorBook.id },
        relations: ['authors'],
      });

      const authorIndex = book.authors.findIndex(
        bookAuthor => bookAuthor.id === author.id,
      );

      if (authorIndex >= 0) {
        book.authors.splice(authorIndex, 1);
        if (book.authors.length === 0) {
          await this.bookRepository.remove(book);
        } else {
          await this.bookRepository.save(book);
        }
      }
    });

    await this.authorRepository.remove(author);

    return books.length;
  }
}
