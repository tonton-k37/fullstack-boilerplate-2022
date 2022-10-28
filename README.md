<h1 align="center"><code>Fullstack boilerplate project</code></h1>

<div align="center">
<img src=".readme_images/apollo.png" alt="drawing" width="60" style="margin: 8px"/>
<img src=".readme_images/chakra.png" alt="drawing" width="60" style="margin: 8px"/>
<img src=".readme_images/gcg.png" alt="drawing" width="60" style="margin: 8px"/>
<img src=".readme_images/graphql.png" alt="drawing" width="60" style="margin: 8px"/>
<img src=".readme_images/jest.png" alt="drawing" width="60" style="margin: 8px"/>
<img src=".readme_images/next-auth.png" alt="drawing" width="60" style="margin: 8px"/>
<img src=".readme_images/nextjs.png" alt="drawing" width="60" style="margin: 8px"/>
<img src=".readme_images/nexus.png" alt="drawing" width="60" style="margin: 8px"/>
<img src=".readme_images/prisma.png" alt="drawing" width="60" style="margin: 8px"/>
<img src=".readme_images/storybook.png" alt="drawing" width="60" style="margin: 8px"/>
<img src=".readme_images/cypress.png" alt="drawing" width="60" style="margin: 8px"/>
</div>

## Overview

This is a boiler plate project using lib's I like today.

| Package         | What For               | Link                                                |
| --------------- | ---------------------- | --------------------------------------------------- |
| Next.js         | react framework        | [:link:](https://nextjs.org/)                       |
| Next Auth       | Auth                   | [:link:](https://next-auth.js.org/)                 |
| Prisma          | Database               | [:link:](https://www.prisma.io/)                    |
| GraphQL         | API                    | [:link:](https://graphql.org/)                      |
| GraphQL Scalars | Scalar                 | [:link:](https://www.the-guild.dev/graphql/scalars) |
| Nexus           | GraphQL Schema         | [:link:](https://nexusjs.org/)                      |
| GCG             | GraphQL Code Generator | [:link:](https://www.the-guild.dev/graphql/codegen) |
| Apollo          | GraphQL Server         | [:link:](https://www.apollographql.com/)            |
| Chakra-UI       | UI                     | [:link:](https://chakra-ui.com/)                    |
| Storybook       | UI / Test              | [:link:](https://storybook.js.org/)                 |
| Jest            | Test                   | [:link:](https://jestjs.io/)                        |
| Faker           | Fake Data              | [:link:](https://fakerjs.dev/)                      |
| React Hook Form | Form                   | [:link:](https://react-hook-form.com/)              |
| yup             | Form Validation        | [:link:](https://github.com/jquense/yup)            |

## Usage

setup all the envs and run `yarn dev`

| Env File Name    |
| ---------------- |
| .env.development |
| .env.test        |

### envs

| Name            | What For                | Tips                      | Link                                                                              |
| --------------- | ----------------------- | ------------------------- | --------------------------------------------------------------------------------- |
| DATABASE_URL    | where to connect for DB |                           | [:link:](https://www.prisma.io/docs/reference/database-reference/connection-urls) |
| NEXTAUTH_URL    | Root Url for Next Auth  |                           | [:link:](https://next-auth.js.org/configuration/options#nextauth_url)             |
| NEXTAUTH_SECRET | To encrypt              | `openssl rand -base64 32` | [:link:](https://next-auth.js.org/configuration/options#secret)                   |

```shell
# .env
DATABASE_URL=postgresql://boilerplate:boilerplate@127.0.0.1:5432/boilerplate?schema=development
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=LATij6FKgkFjzSPD2Ueys0ZEwgfUfmwkYpn5/gBKMAo=
```

## Auth

Using next-auth on this boilerplate project.

### password

The password is encrypted by bcrypt.

> do not move hashing function to prisma's middleware from [/api/auth/[...nextauth]](./pages/api/auth/%5B...nextauth%5D.ts) since prisma's middleware runs twice, before next() and after next(). It will corrupt the hash in the end.

### page

#### Server side

##### protect per page

As an example of [/need-sign-in](./pages/need-signed-in.tsx) page. You can protect the page using unstable_getServerSession in the "getServerSideProps"

Read more details about it at the official doc [:link:](https://next-auth.js.org/configuration/nextjs#unstable_getserversession)

```tsx
// need-singned-in.tsx
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};
```

##### protect using middleware

You can also protect the page by using middleware.
exp: "/protected-by-middleware"
add routes of pages to protect the middleware.ts file.

```typescript
// middleware.ts
export { default } from "next-auth/middleware";

export const config = { matcher: ["/protected-by-middleware"] };
```

#### Client side

use `useSession()` of next-auth.

```tsx
const Home: NextPage = () => {
  const { data: session } = useSession();

  return <div>{session ? "you are signed in" : "not signed in"}</div>;
};
```

#### GraphQL

Use the protectedAction function to check for auth.
This function simply checks whether a user has signed in or not and raises errors if not.

```typescript
protectedAction(ctx)(doSome(args, ctx));
```

You can also pass any extra conditions if necessary.

```typescript
const extraCondtion = [
  {
    check: () => true,
    errorMessage: "some error message",
  },
  {
    check: () => 1 + 1 === 3,
    errorMessage: "1 + 1 is not 3",
  },
];

protectedAction(ctx, extraCondition)(doSome(args, ctx));
```

see the [example](./graphql/types/user/UpdateUser)

## Test

| Package                    | Link                                                  |
| -------------------------- | ----------------------------------------------------- |
| Testing Library            | [:link:](https://testing-library.com/)                |
| Testing Library (jest Dom) | [:link:](https://github.com/testing-library/jest-dom) |
| cypress                    | [:link:](https://www.cypress.io/)                     |

| File       | What For                        |
| ---------- | ------------------------------- |
| components | individual test for component   |
| generated  | test for hooks generated by GCG |
| graphql    | test for types                  |
| pages      | rendering test for page         |
| prisma     | orm test                        |
| cypress    | e2e test                        |

run `yarn test:watch` to run jest
run `yarn test:e2e:open` to open cypress
[cheat seet for react testing library](https://testing-library.com/docs/react-testing-library/cheatsheet)
todo: This boillerplate includes tests for auth already.
todo: ver.2.x.x of apollo-server-testing is not compatible with the version of apollo-server-micro of 3.x. As for that, we use the alpha version of testing. Please, upgrade to official release ver from alpha when its released.

> note:exclamation:: Make sure to write \_\_typename when you are using a fragment in the [types](./graphql/types/User.ts)
> note:exclamation:: Make sure to write all fields when you are using a fragment

```typescript
const mock: MockedResponse = {
  request: { query: FindUserDocument, variables: { id: id } },
  result: {
    data: {
      userById: {
        __typename: "User",
        id,
        email,
        uid: id,
        password: "hogehoge",
        provider: "Credentials",
        createdAt: now,
        updatedAt: now,
      },
    },
  },
};
```

## Prisma

Prisma is an ORM software that works on Node.js. using postgresql for the project. Change to any other DB if you need. setup file is located [here](./prisma/schema.prisma)

Don't forget to install the env variable on the env file of each env.

```shell
# .env
DATABASE_URL=postgresql://<user_name>:<password>@127.0.0.1:5432/<database_name>
```

`yarn prisma generate` to refresh client codes
`yarn prisma studio` to run prisma studio
`yarn prisma db seed`

> This project uses multiple env files. read [doc](https://www.prisma.io/docs/guides/development-environment/environment-variables/using-multiple-env-files) here

## GraphQL

The endpoint is at http://localhost:3000/api/graphql/

### Nexus:(for server side)

using nexus to write schema in safe.  
simply run `yarn build:nexus-typegen` to create schema.graphql. or if access to [endpoint](http://localhost:3000/api/graphql)

[setup guide for next.js users](https://nexusjs.org/docs/adoption-guides/nextjs-users)

### GraphQL Code Generator:(for client side)

using GCG to generate types and hooks to use in the client. Files generated are saved in [generated](./generated/types.tsx) file.
to observe changes to the code. run `yarn graphql-codegen --watch`..
[setup guide. thx to cookpad :hearts:](https://techlife.cookpad.com/entry/2021/03/24/123214)

### Scalars

using [graphql scalars](https://www.the-guild.dev/graphql/scalars/docs/quick-start)

### flow to generate types

1. run server `yarn dev`
2. run GCG watch `yarn graphql-codegen --watch`
3. write prisma schema [exp file](./prisma/schema.prisma) (if you have any models to change)
4. write graphql/types/\*.ts [exp file](./graphql/types/User.ts) (place to write scheme)
5. write oprations [exp file](./graphql/operations/user.graphql) (Query, Mutation for graphQL)
6. run `yarn build:nexus-typegen`(create mutation or queries in graphql/types/..)

> note: There is a plugin called nexus prisma to automatically generates scheme from schema of prisma. however, the plugin is in early review and prisma team is rebuilding. Not using at the moment from this perspective.

## storybook

Storybook is a great component management tool.
run `yarn storybook`.

todo: add some test runner [doc](https://storybook.js.org/docs/react/writing-tests/test-runner)

## Etc

### yup

Using yup as form validator and putting yup schemas in [here](./lib/yup.ts) for the sake of validation consistency.

## Other docs

don't forget to set the envs.

[secret](https://next-auth.js.org/configuration/options#secret)

read the [doc](https://next-auth.js.org/configuration/nextjs#unstable_getserversession)

- protected api [doc](https://next-auth.js.org/getting-started/example#backend---api-route)
- protected serverside page [doc](https://next-auth.js.org/configuration/nextjs#unstable_getserversession)
- protected client page [doc](https://next-auth.js.org/getting-started/example#frontend---add-react-hook)
- providers [doc](https://next-auth.js.org/providers/)
- If you want to store session in record with prisma [doc](https://next-auth.js.org/adapters/prisma)
