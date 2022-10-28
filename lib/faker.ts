import { faker } from "@faker-js/faker/locale/ja";

const Users: any[] = [];

export function createRandomUser() {
  return {
    uid: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    provider: "Credentials",
  };
}

Array.from({ length: 10 }).forEach(() => {
  Users.push(createRandomUser());
});

export { Users };
