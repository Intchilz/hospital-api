//Added two routes

const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req,res) => {
    //swagger.tags=['Hi, Welcome to my W03 project!']
    res.send('Hi, Welcome to my W03 project!');
});

router.use('/users', require('./users'));

router.use('/patient', require('./patients'));

module.exports = router;