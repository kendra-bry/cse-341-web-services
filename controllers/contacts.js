const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

const getAllContacts = async (req, res) => {
  try {
    const data = await mongodb.getDb().db().collection('contacts').find();
    let result = await data.toArray();
    res.status(200).json(result);
  } catch (error) {
    res.status(401).send(error);
  }
};

const getById = async (req, res) => {
  try {
    const data = await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .findOne({ _id: new ObjectId(req.params.id) });
    res.status(200).json(data);
  } catch (error) {
    res.status(401).send(error);
  }
};

module.exports = {
  getAllContacts,
  getById,
};
