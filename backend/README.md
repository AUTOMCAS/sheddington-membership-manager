# Sheddington Membership Manager: Backend

**ATTENTION: Ensure backend server is setup and running before running frontend.**

## Setup

1. Install all dependencies from within this /backend directory using `npm install`

2. Make sure you have PostgreSQL running on your computer with a database called `sheddington_membership_directory` (and `sheddington_membership_directory_test` for testing) and a user who has access to that database with the username postgres and password postgres

3. Create a .env file in backend/src and fill in your username and postgreSQL password. Use the backend/src/.env.sample file as a template.

```DB_USER=user
DB_PASSWORD=password
DB_NAME=sheddington_membership_directory
DB_HOST=127.0.0.1
DB_TEST_NAME=sheddington_membership_directory_test
```

4. Install sequelize-cli using `npm install --save-dev sequelize-cli`

5. cd to backend/src and migrate the models to the database.\
   `npx sequelize-cli db:migrate --env development`  
   `npx sequelize-cli db:migrate --env test`

## Run

From within this /backend directory:

### `npm start`

Run the backend server.\
The backend will restart if you make edits.
Backend address: http://localhost:8080/

### `npm run dev`

Run the server in development mode.

## Test

### `npm test`

Run all tests using Jest.
