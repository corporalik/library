import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/author.module';
import * as ormconfig from '../ormconfig';

@Module({
  imports: [
    BooksModule,
    AuthorsModule,
    TypeOrmModule.forRoot(ormconfig),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
  ],
})
export class AppModule {}
