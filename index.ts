// https://www.traversymedia.com/blog/prisma-crash-course
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // const user = await prisma.user.create({
    //     data: {
    //       name: 'John Doe',
    //       email: 'john@gmail.com',
    //     },
    //   });
//       const users = await prisma.user.findMany();
// console.log(users);
// const article = await prisma.article.create({
//     data: {
//       title: 'Johns First Article',
//       body: 'This is Johns first article',
//       author: {
//         connect: {
//           id: 1, // relation with user 1
//         },
//       },
//     },
//   });
//   const articles = await prisma.article.findMany();

// Creating Article and User combined
// const user = await prisma.user.create({
//     data: {
//       name: 'Sara Smith',
//       email: 'sara@gmail.com',
//       articles: {
//         create: {
//           title: 'Saras First Article',
//           body: 'This is my first article',
//         },
//       },
//     },
//   });
//   const articles = await prisma.article.findMany();
//   console.log(articles);
const users = await prisma.user.findMany({
    include: {
      articles: true,
    },
  });
  console.log(users);
users.forEach((user) => {
    console.log(`User: ${user.name}, Email: ${user.email}`);
    console.log('Articles:');
    user.articles.forEach((article) => {
      console.log(`- Title: ${article.title}, Body: ${article.body}`);
    });
    console.log('\n');
  });
}


main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });