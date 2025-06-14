const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req,res) => {
    const result = await mongodb.getDatabase().db('project2').collection('users').find();
    result.toArray().then((users) => {
        try {
            res.setHeader('content-Type', 'application/json');
            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(response.error || 'Some error occured while updating users.');
        }
});
};

const getSingle = async (req,res) => {
    const userId = new ObjectId(req.params.id);
    try {
        const result = await mongodb.getDatabase().db('project2').collection('users').find({ _id: userId });
            result.toArray().then((users) => {
            res.setHeader('content-Type', 'application/json');
            res.status(200).json(users[0]);
        });
    } catch (err) {
        console.error('Error updating users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createUser = async (req,res) => {
    const users = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };
    try {
        const response = await mongodb.getDatabase().db('project2').collection('users').insertOne(users);
        if (response.acknowledged) {
        res.status(204).send();
        }  else {
        res.status(500).json(response.error || 'Some error occured while updating users.');
        }
    } catch (err) {
        console.error('Error updating users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateUser = async (req,res) => {
    const userId = new ObjectId(req.params.id);
    const user = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };
    try {
        const response = await mongodb.getDatabase().db('project2').collection('users').replaceOne({_id: userId}, user);
        if (response.modifiedCount > 0) {
        res.status(204).send();
        } else {
        res.status(500).json(response.err || 'Some error occured while updating users.');
        }
    } catch (err) {
        console.error('Error updating users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
    
    
};

const deleteUser = async (req,res) => {
    const userId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDatabase().db('project2').collection('users').deleteOne({_id: userId});
        if (response.deletedCount > 0) {
        res.status(204).send();
        } else {
        res.status(500).json(response.err || 'Some error occured while deleting users.');
        }
    } catch (err) {
        console.error('Error updating users:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
    
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};