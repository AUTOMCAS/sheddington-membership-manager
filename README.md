# Sheddington Membership Manager

## A simplistic membership management application for Sheddington

## About Sheddington

[Sheddington](https://sheddington.org/) is a locally run community space charity. Members and local residents can participate in repairing, making, arts and crafts, gardening, cooking and many more social activities.

## Development map

### Frontend

- [x] Member list: All members are displayed on the main page with full details.
- [x] Member creation: A member can be created using an input form.
- [ ] Member search function: A member can be searched for using name.
- [ ] Member deletion.
- [ ] Member update.

### Backend

- [x] Retrieval of all members.
- [x] Creation.
- [ ] Retrieval by name.
- [ ] Deletion.
- [ ] Update.

## Technologies

### Frontend

- [React](https://github.com/facebook/create-react-app)
- [Typescript](https://github.com/Microsoft/TypeScript)
- [Webpack](https://github.com/webpack/webpack)
- [Babel](https://github.com/babel/babel)
- [Cypress](https://github.com/cypress-io/cypress)

### Backend

- [Node.js](https://github.com/nodejs/node)
- [Express](https://github.com/expressjs/express)
- [Sequelize](https://github.com/sequelize/sequelize)
- [PostgreSQL](https://github.com/postgres/postgres)
- [Jest](https://github.com/facebook/jest)

## Screenshots

![Member list](https://github.com/AUTOMCAS/-sheddington-membership-manager/blob/main/misc/screenshots/view-members.png)
![Member creation](https://github.com/AUTOMCAS/-sheddington-membership-manager/blob/main/misc/screenshots/member-validation.png)
![Member validation](https://github.com/AUTOMCAS/-sheddington-membership-manager/blob/main/misc/screenshots/member-validation.png)

## Setup and installation

Clone this repository.\
`git clone https://github.com/AUTOMCAS/-sheddington-membership-manager.git`

Navigate into the frontend and backend directories and follow the guides to setup and run.\
The backend must be running for most of the frontend features to function.

[Frontend](https://github.com/AUTOMCAS/-sheddington-membership-manager/tree/main/frontend#readme)

[Backend](https://github.com/AUTOMCAS/-sheddington-membership-manager/tree/main/backend#readme)

## Quick run AFTER setup:

### Run backend and frontend

cd /backend
`npm start`

cd /frontend
`npm start`
Navigate to http://localhost:3000/

### Test backend and frontend - backend must be running for frontend tests.

cd /backend
`npm test`

cd /frontend
`npm test`
