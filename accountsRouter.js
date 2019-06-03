const express = require('express');

const router = express.Router();

const accountsDb = require('./data/accounts-model.js')
//working
router.get('/:id', validateUserId, (req, res) => {
    const id = req.params.id;

    accountsDb.findById(id)
    .then( result => {
        res.json(result)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'internal server error'})
    })
})
//working
router.get('/', (req, res) => {
   
    accountsDb.find()
    .then(results => {
        res.json(results)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ message: 'internal server error'})
    })
})
//working
router.post('/', (req, res) => {

    const account = { ...req.body }

    accountsDb.add(account)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ messsage: 'internal server error'})
    })
})
//working
router.delete('/:id', validateUserId, (req, res) => {
    const id = req.params.id;

    accountsDb.remove(id)
    .then(count => {
        res.json(count)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: 'internal server error'})
    })
})
//working
router.put('/:id', validateUserId, (req, res) => {
    const id = req.params.id;
    const changes = { ...req.body }

    accountsDb.update(id, changes)
    .then(count => {
        res.json(count)
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message: 'internal server error'})
    })
})

function validateUserId (req, res, next) {
    if (!req.params.id || !req.params || req.params.id < 1){
        return res.status(404).json({message: 'invalid user id'})
    }
    accountsDb.findById(req.params.id)
        .then( result => {
            if (!result || result.length == 0){
                res.status(404).json({ messgae: 'user not found'})
            } else {
                next();
            }
        })
        .catch( error => {
            res.status(500).json({ message: 'error in validate user id'})
        })
    
}

module.exports = router;