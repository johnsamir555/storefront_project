# Storefront Backend Project
The goal of this project is how to handle APIs and uses tokens and authenticate user before go to endpoint .. etc.


# Project Instuctions & Scripts
### Installation
```
$ npm install
```
### Building & Running for Development (using nodemon)
Server will run on port 7000
```
$ npm run start
```
### Building for Production
```
$ npm run build
```
### Running for Production
```
$ npm run start:prod
```
### Testing using jasmine
```
$ npm run test
```
### Linting and fix linting problems
```
$ npm run lint
$ npm run lint:fix
```

### Formatting and fix formatting problems
```
$ npm run format
$ npm run format:fix
```

# How to setup & connect database & Scripts:
## create user and password:
```
$ CREATE USER postgres password '12345';
```
## create databases:
```
$ CREATE DATABASE project_db;
$ CREATE DATABASE project_db_test;
```
## Grant all privileges on databases to the user:
```
$ GRANT ALL PRIVILEGES ON DATABASE project_db TO postgres;
$ GRANT ALL PRIVILEGES ON DATABASE project_db_test TO postgres;
```

### Building all database tables(migration up) [**apply on default database in database.json**]
```
$ npm run migrate:up
```
### drop database tables one by one (migration down)  [**apply on default database in database.json**]:
```
$ npm run migrate:down
```
### Reseting all database tables (migration reset)  [**apply on default database in database.json**]:
```
$ npm run migrate:reset
```

### Building all database tables(migration up) [**apply on test database in database.json**]
```
$ npm run migrate_test:up
```
### drop database tables one by one (migration down)  [**apply on test database in database.json**]:
```
$ npm run migrate_test:down
```
### Reseting all database tables (migration reset)  [**apply on test database in database.json**]:
```
$ npm run migrate_test:reset
```




