const { ObjectId } = require('mongodb');
const mongodb = require('../db/connect');

const getAllContacts = async (req, res) => {
  try {
    const data = await mongodb.getDb().db().collection('contacts').find();
    let result = await data.toArray();
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
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
    console.log(error);
    res.status(401).send(error);
  }
};

const insertContact = async (req, res) => {
  /*
    #swagger.requestBody  = {
      description: 'Add a contact.',
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/Contact'}
    }
  */
  try {
    validateContact(req.body);
    const response = await mongodb.getDb().db().collection('contacts').insertOne(req.body);
    res.status(201).send(response);
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
};

const updateContact = async (req, res) => {
  /*
    #swagger.requestBody  = {
      description: 'Update a contact.',
      in: 'body',
      required: true,
      schema: { $ref: '#/definitions/Contact'}
    }
  */
  try {
    validateContact(req.body);
    await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .updateOne(
        {
          _id: new ObjectId(req.params.id),
        },
        { $set: req.body },
        { upsert: true }
      );
    res.status(204).send();
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
};

const deleteContact = async (req, res) => {
  try {
    await mongodb
      .getDb()
      .db()
      .collection('contacts')
      .deleteOne({ _id: new ObjectId(req.params.id) });
    res.status(200).send('Ok');
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
};

const validateContact = (data) => {
  if (!data.firstName) {
    throw Error('firstName is required.');
  }
  if (!data.lastName) {
    throw Error('lastName is required.');
  }
  if (!data.email) {
    throw Error('email is required.');
  }
  if (!data.favoriteColor) {
    throw Error('favoriteColor is required.');
  }
  if (!data.birthday) {
    throw Error('birthday is required.');
  }
};

module.exports = {
  getAllContacts,
  getById,
  insertContact,
  updateContact,
  deleteContact,
};
