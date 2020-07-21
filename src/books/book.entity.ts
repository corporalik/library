import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Author } from '../authors/author.entity';

@Entity({ name: 'books' })
@ObjectType()
export class Book extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field(() => [Author])
  @ManyToMany(
    () => Author,
    author => author.books,
  )
  @JoinTable()
  authors: Author[];
}
