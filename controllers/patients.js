const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req,res) => {
    const result = await mongodb.getDatabase().db('project2').collection('patient').find();
    result.toArray().then((users) => {
        res.setHeader('content-Type', 'application/json');
        res.status(200).json(users);
    });
};

const getSingle = async (req,res) => {
    const patientId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db('project2').collection('patient').find({ _id: patientId });
        result.toArray().then((users) => {
        res.setHeader('content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
};

const createPatient = async (req,res) => {
    const patient = {
        fName: req.body.fName,
        lName: req.body.lName,
        birthdate: req.body.birthdate,
        maritalStatus: req.body.maritalStatus,
        contact: req.body.contact,
        email: req.body.email,
        caseHistory: req.body.caseHistory
    };
    const response = await mongodb.getDatabase().db('project2').collection('patient').insertOne(patient);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occured while updating patients.');
    }
};

const updatePatient = async (req,res) => {
    const patientId = new ObjectId(req.params.id);
    const patient = {
        fName: req.body.fName,
        lName: req.body.lName,
        birthdate: req.body.birthdate,
        maritalStatus: req.body.maritalStatus,
        contact: req.body.contact,
        email: req.body.email,
        caseHistory: req.body.caseHistory
    };
    const response = await mongodb.getDatabase().db('project2').collection('patient').replaceOne({_id: patientId}, patient);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.err || 'Some error occured while updating patient.');
    }
};

const deletePatient = async (req,res) => {
    const patientId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('project2').collection('patient').deleteOne({_id: patientId});
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.err || 'Some error occured while deleting patient.');
    }
};

module.exports = {
    getAll,
    getSingle,
    createPatient,
    updatePatient,
    deletePatient,

};