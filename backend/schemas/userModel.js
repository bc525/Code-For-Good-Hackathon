const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true
    },
    password: {
        type: String,
        required: true
    },
    emergencyContact: {
        type: [String],
        required: true
    },
    shirtSize: {
        type: String,
        required: true
    },
    personalInfo: {
        type: String
    },
    skills: {
        type: [String]
    },
    isAdmin: {
        type: Boolean,
        required: true
    },
    isGroup: {
        type: Boolean,
        required: true
    },

})

userSchema.statics.signup = async function(userName, birthday, email, phoneNumber, password, emergencyContact, shirtSize, personalInfo, skills, isAdmin, isGroup) {
    if (!email || !password || !userName || !phoneNumber) {
      throw new Error('Please fill out all fields');
    }
  
    if (password.length < 10) {
      throw new Error('Password must be at least 10 characters' + password);
    }

    // if(phoneNumber.length <10 || phoneNumber.length>10) {
    //   throw new Error('Phone Number must be 10 digits');
    // }
  
    // if (!/^\d+$/.test(password)) {
    //   throw new Error('Password must contain at least one number' + password);
    // }
    // 
    const exists = await this.findOne({ email });

  
    if (exists) {
      throw new Error('User already exists');

    }
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt)
        const user = await this.create({userName, birthday, email, phoneNumber, password:hash, emergencyContact, shirtSize, personalInfo, skills, isAdmin, isGroup})

    return user;
}

userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({ email })
  if (!user) {
    throw Error('Incorrect email')
  }

  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}
  
  
  module.exports = mongoose.model('User', userSchema)