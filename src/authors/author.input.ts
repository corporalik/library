import { Field, InputType } from '@nestjs/graphql';

@InputType()
class AuthorInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
}

export default AuthorInput;
