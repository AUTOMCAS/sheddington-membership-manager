// const { ErrorHandler } = require('../helpers/error');

const db = require('../models');

const Members = db.members;

async function create(member) {
  try {
    return await Members.create(member);
  } catch (error) {
    // throw new ErrorHandler(error.statusCode, error.message);
  }
}
async function getAll() {
  try {
    return await Members.findAll();
  } catch (error) {
    throw new Error(error);
    //throw new ErrorHandler(error.statusCode, error.message);
  }
}

module.exports = { create, getAll };
