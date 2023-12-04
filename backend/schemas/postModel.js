const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String, 
        required: true,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
    biography: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
        unique: true
    },
    volunteersNeeded: {
        type: Number,
        required: true
    },
    volunteers: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    }, 
    postState: {
        type: String,
        enum: ['DRAFT', 'ACTIVE', 'DONE', 'APPLIED'],
        required: true
    },
    skills: {
        type: [String],
        default: {}
    }

})

module.exports = mongoose.model('Post', postSchema)