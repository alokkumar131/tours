const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');


//User Routes
router.get('/api/tours/users', userController.getAllUsers);
router.get('/api/tours/user/:id', userController.getUser);
router.post('/api/tours/user', userController.createUser);
router.patch('/api/tours/user/:id', userController.updateUser);
router.delete('/api/tours/user/:id', userController.deleteUser);

module.exports = router;