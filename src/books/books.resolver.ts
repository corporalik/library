import { Resolver, Query, Args, ID, Mutation, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { Author } from 'src/authors/author.entity';
import BookInput from './book.input';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private booksService: BooksService) {}

  @Query(() => Book, { name: 'getBook', nullable: true })
  async getBook(
    @Args('id', { type: () => ID }) id: number,
  ): Promise<Book | null> {
    return this.booksService.getBook(id);
  }

  @Query(() => [Book], { name: 'getBooks' })
  async getBooks(
    @Args('title', { nullable: true }) title?: string,
  ): Promise<Book[]> {
    return this.booksService.getBooks(title);
  }

  @Mutation(() => Book, { name: 'createBook' })
  async createBook(@Args('book') book: BookInput): Promise<Book> {
    return this.booksService.createBook(book);
  }

  @Mutation(() => Int, { name: 'deleteBook' })
  async deleteBook(
    @Args('id', { type: () => ID }) id: Book['id'],
  ): Promise<number> {
    return this.booksService.deleteBook(id);
  }

  @Mutation(() => Book, { name: 'addAuthor' })
  async addAuthor(
    @Args('authorId', { type: () => ID }) authorId: Author['id'],
    @Args('bookID', { type: () => ID }) bookId: Book['id'],
  ): Promise<Book> {
    return this.booksService.addAuthor(bookId, authorId);
  }
}
