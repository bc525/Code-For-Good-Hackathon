const User = require('../schemas/userModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}

// login a user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
  
    try {
      const user = await User.login(email, password)
  
      // create a token
      const token = createToken(user._id)
  
      res.status(200).json({user,  token})
    } catch (error) {
      res.status(400).json({error: error.message})
    }
  }

// signup a user
const signupUser = async (req, res) => {
  const {userName, birthday, email, phoneNumber, password, emergencyContact, shirtSize, personalInfo, skills, isAdmin, isGroup} = req.body
  
  try{
    const user = await User.signup(userName, birthday, email, phoneNumber, password, emergencyContact, shirtSize, personalInfo, skills, isAdmin, isGroup)
    const token = createToken(user._id)
    res.status(200).json({user, token})
  } catch (error){
    res.status(400).json({error: error.message})
  }
}

const getUser = async (req, res) => {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'User ID is not valid for getting user'});
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(400).json({ error: 'Error getting user' });
  }
  else{
    return res.status(200).json(user);
  };
}

const getAllUsers = async (req, res) => {

  const users = await User.find();

  if (!users) {
    return res.status(400).json({ error: 'Error getting users' });
  }
  else{
    return res.status(200).json(users);
  };
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'Object Id is not valid for deleting'});
    }
  
    const user = await User.findOneAndDelete({_id: id});
  
    if(!user) {
      console.log(user);
      return res.status(400).json({error: 'No such user for deleting'});
    }
  
    res.status(200).json(user);
  }

  const updateUser = async (req, res) => {
    const { id } = req.params;  // Extract id from req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'Object Id is not valid for updating'})
    }
  
    // read current entry in database
    let currentObject = await User.findOne({ _id: id });
  
    if (!currentObject) {
      return res.status(400).json({error: 'No such user for updating'});
    }
  
    // merge current entry with changed updated key:values
    let newUser = { ...currentObject._doc, ...req.body };
  
    const updatedUser = await User.findOneAndUpdate({ _id: id }, {$set: newUser}, { new: true });
  
    if(!updatedUser) {
      console.log(updatedUser);
      return res.status(400).json({error: 'Error updating user'});
    }
  
    res.status(200).json(updatedUser);
  }
  

module.exports = { signupUser, loginUser, getUser, deleteUser, updateUser, getAllUsers }