import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';

import { AuthorsService } from './authors.service';
import { Author } from './author.entity';
import AuthorInput from './author.input';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private authorsService: AuthorsService) {}

  @Query(() => [Author])
  async getAuthors(
    @Args('minNumberOfBooks', { type: () => Int, nullable: true })
    minNumberOfBooks?: number,
    @Args('maxNumberOfBooks', { type: () => Int, nullable: true })
    maxNumberOfBooks?: number,
  ): Promise<Author[]> {
    return this.authorsService.getAuthors(minNumberOfBooks, maxNumberOfBooks);
  }

  @Query(() => Author, { name: 'getAuthor', nullable: true })
  async getAuthor(
    @Args('id', { type: () => ID }) id: Author['id'],
  ): Promise<Author | null> {
    return this.authorsService.getAuthor(id);
  }

  @Mutation(() => Author, { name: 'createAuthor' })
  async createAuthor(
    @Args('author', { type: () => AuthorInput }) author: AuthorInput,
  ): Promise<Author> {
    return this.authorsService.createAuthor(author);
  }

  @Mutation(() => Int, { name: 'deleteAuthor' })
  async deleteAuthor(
    @Args('id', { type: () => ID }) id: Author['id'],
  ): Promise<number> {
    return this.authorsService.deleteAuthor(id);
  }
}
