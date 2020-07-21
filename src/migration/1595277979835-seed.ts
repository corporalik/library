import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { Author } from '../authors/author.entity';
import { Book } from '../books/book.entity';

export class seed1595277979835 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository('authors').save([
      {
        firstName: 'Walt',
        lastName: 'Whitman',
      },
      {
        firstName: 'Christian',
        lastName: 'Andersen',
      },
      {
        firstName: 'Jane',
        lastName: 'Austen',
      },
      {
        firstName: 'Anton',
        lastName: 'Chekhov',
      },
      {
        firstName: 'Fyodor',
        lastName: 'Dostoevsky',
      },
      {
        firstName: 'Franz',
        lastName: 'Kafka',
      },
      {
        firstName: 'Thomas',
        lastName: 'Mann',
      },
      {
        firstName: 'William',
        lastName: 'Shakespeare',
      },
    ]);

    const books = [
      {
        title: 'Eloquent JavaScript, Second Edition',
        authors: [2, 3],
      },
      {
        title: 'Fairy tales',
        authors: [1],
      },

      {
        title: 'The Divine Comedy',
        authors: [4, 1, 2],
      },
      {
        title: 'The Epic Of Gilgamesh',
        authors: [7],
      },
      {
        title: 'The Book Of Job',
        authors: [7],
      },
      {
        title: 'One Thousand and One Nights',
        authors: [2, 3, 7, 6, 5],
      },
      {
        title: 'Ficciones',
        authors: [5],
      },
      {
        title: 'The Stranger',
        authors: [3, 4],
      },
      {
        title: 'Poems',
        authors: [5],
      },
      {
        title: 'Journey to the End of the Night',
        authors: [6],
      },
      {
        title: 'Great Expectations',
        authors: [1, 7, 4],
      },
      {
        title: 'Nostromo',
        authors: [7, 1],
      },
      {
        title: 'Crime and Punishment',
        authors: [6],
      },
    ];

    const authors = (await getRepository('authors').find()) as Author[];
    const booksList = [];

    books.forEach(book => {
      const bookE = new Book();
      bookE.title = book.title;
      bookE.authors = authors.filter(
        author => book.authors.indexOf(author.id) >= 0,
      );
      booksList.push(bookE);
    });

    await getRepository('books').save(booksList);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
