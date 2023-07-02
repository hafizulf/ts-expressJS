# TypeScript - Express

## Description

Repository for learning purpose that aim to know about TypeScript

## Tech Stack

- [NodeJS](https://nodejs.org/en/blog/release/v18.12.0)
- [TypeScript](https://www.typescriptlang.org/)
- [ExpressJS](https://expressjs.com/en/4x/api.html)
- [Sequelize](https://sequelize.org/)
- [MySQL](https://www.mysql.com/)

## Docs

### Install Typescript

- `npm i typescript`
- add command `'rm -rf build/ && tsc'` to `package.json`

### Setup tsconfig

- running `./node_modules/.bin/tsc --init` to init `tsconfig.json`
- enable:

  ```bash
  - allowJS // compiled, part of our program
  - outdir // build dir
  ```

### Types for suggestion

- Types for express pkg `npm i --save-dev @types/express`

### Libraries: Body parser, Compression, CORS, Helmet, Logger

- Use body parser, to parsing `req.body` json
- Use compression to `compressing` request data
- Use `CORS` for cors origin
- Use `helmet` for protecting header
- Use morgan for development logger (dev only)

### Individual Routes

- Create own route by importing `{Router, Request, Response}` from `express`

### Controllers

- Use controller for interface adapter that accepting request from client, and return response

### Refactoring

- Create `abstract class` for `Base Router`

### Middleware

- Use for security/check before controller

### Environment Variable

- `env` is use to store credential

### ORM - Sequelize

- Sequelize is a modern TypeScript and Node.js ORM that used to connection database such as MySql, Oracle, Postgres, MariaDB, SQLite, SQL Server, and more.

  ```bash
    # install sequelize and cli
    npm i sequelize sequelize-cli
  ```

- create `.sequelizerc` file for special configuration

  ```bash
    const path = require('path');

    # build is for production environment, use other if still in development mode
    module.exports = {
      config: path.resolve('build/config', 'database.json'),
      'models-path': path.resolve('build/db', 'models'),
      'seeders-path': path.resolve('build/db', 'seeders'),
      'migrations-path': path.resolve('build/db', 'migrations'),
    };
  ```

- setup migrations

  ```bash
    # init configuration and db
    ./node_modules/.bin/sequelize-cli init

    # example customize config/database.js
    require('dotenv').config();

    module.exports = {
      development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql',
      },
    };

    # example of generate new model
    npx sequelize model:generate --name user --attributes username:string,password:string --underscored

    # running migration
    npx sequelize-cli db:migrate
  ```

- Note:

  - change `config/database.json` into `config/database.js` and every config that direct to `.json` file to `.js` such as in: `.sequelizerc` and `models/index.js` files.

  - `sequelize` is basically safe, so we don't need to implement TypeScript for third-party library, TypeScript implemented on our own app. Therefore to call db we use `require()`

### Async Function

- Because `sequelize` is `asynchronous` so we need `async` function and `await` keyword to return `Promise` with result that produced or generic is `<Response>`

  ```bash
    createUser = async(req: Request, res: Response): Promise<Response> {}
  ```

### Hashing - User Password

- Using `bcrypt` to hashing password one way

  ```bash
    # install
    npm i bcrypt

    # use (asynchronous)
    return bcrypt.hash(password, saltNumber)
  ```

### Validation

- using validator to validation request body, example using `express-validator`

### Login - Token Based Authentication

```bash
  # Client sends login details
  # Server generates JWT from user data
  # Sends back JWT to client - Saves JWT on localstorage (client)
  # Get user profile (authenticated request) - *sets token to header
  {
    headers: {
      'Authorization': 'Bearer ${JWT_TOKEN}'
    }
  }
  # Validates JWT (server) - send user profile on success
```

- More to reads:

  - [cloud google - authenticating users jwt](https://cloud.google.com/api-gateway/docs/authenticating-users-jwt)
  - [auth0 - token based authentication made easy](https://auth0.com/learn/token-based-authentication-made-easy)

- using `jsonwebtoken` to generate token, set `JWT_SECRET_KEY` in `.env` file
- JWT

  ```bash
    # to generate new token
    jwt.sign(payload: string | object | buffer, secretKey)

    # to verify token
    jwt.verify(token, secretKey): string | object

    # to get error message - verify token
    (<any>error).message
  ```

### CRUD

- Setup Model TODO

  ```bash
    # migration file, reference
    user_id: {
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      allowNull: false,
    },

    # model file,
    static associate(models) {
      todo.belongsTo(models.user);
    }
  ```

- CRUD

  ```bash
    # create
    db.todo.create({ description: 'bla bla' })

    # findAll by user id and only return id, description
    db.todo.findAll({
      where: { user_id: id },
      attributes: ['id', 'description']
    })

    # find by Id
    db.todo.findOne({
      # user_id from locals.credential
      # id from req.params
      where: { id, user_id },
    })

    # update
    db.todo.update({ description: 'update bla bla' }, where: { id, user_id })

    # delete
    db.todo.destroy({ where: { id, user_id })
  ```

### Service Layer

- Service Layer: used for application logic, separating logic from controller(interface adapter) and because this is a small app so we define repository layer in service layer too.
