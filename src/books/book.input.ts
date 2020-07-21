import { Field, InputType, ID } from '@nestjs/graphql';
import { Author } from '../authors/author.entity';

@InputType()
class BookInput {
  @Field()
  title: string;

  @Field(() => [ID])
  authorIds: Author[];
}

export default BookInput;
