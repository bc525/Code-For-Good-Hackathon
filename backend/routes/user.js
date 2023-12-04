const express = require('express');

const { loginUser, signupUser, getUser, updateUser, deleteUser, getAllUsers } = require('../controllers/userController');

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signupUser);
router.get('/:id', getUser);
router.put('/:id', updateUser); //update user
router.delete('/:id', deleteUser); 
router.get('/', getAllUsers)

module.exports = router;
