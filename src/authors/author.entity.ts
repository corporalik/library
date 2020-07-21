import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  BaseEntity,
} from 'typeorm';

import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Book } from 'src/books/book.entity';

@Entity({ name: 'authors' })
@ObjectType()
export class Author extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field(() => [Book])
  @ManyToMany(
    () => Book,
    book => book.authors,
  )
  books: Book[];
}
