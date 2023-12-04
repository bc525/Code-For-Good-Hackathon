const Post = require('../schemas/postModel')
const mongoose = require('mongoose')
const { findByIdAndUpdate } = require('../schemas/userModel')

// TO IMPLEMENT:
//get all posts
//get all active posts

// login a user
const createPost = async (req, res) => {
  const {title, location, biography, description, volunteersNeeded, postState, skills} = req.body
  const volunteers = []

  try {
    const post = await Post.create({title, location, biography, description, volunteersNeeded, volunteers, postState, skills})

    res.status(200).json({post})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const getPost = async (req, res) => {
    const {id} = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Post ID is not valid for getting user' });
    }
  
    try {
      const post = await Post.findById(id).populate('volunteers');
      if (!post) {
        return res.status(400).json({ error: 'Error getting post' });
      }
      return res.status(200).json(post);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
  
  const getPosts = async (req, res) => {
      try {
          const posts = await Post.find().populate('volunteers'); // Populate volunteers for all posts
          res.status(200).json(posts);
      } catch (error) {
          res.status(400).json({error: error.message});
      }
  }
  
  const getPostsByStatus = async (req, res) => {
      const { status } = req.params;
      
      try {
        const posts = await Post.find({ status: status }).populate('volunteers'); // Populate volunteers based on status
        res.json(posts);
      } catch (err) {
        res.status(400).send(err.message);
      }
  };   


//   Post.find({status: status}, function(err, posts) 
//   {
//      // if there is an error retrieving, send the error. nothing after res.send(err) will execute
//      if (err)
//      {
//          res.send(err);
//      }
//      // return all todos in JSON format
//      res.json(posts);

//  });



const deletePost = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'Object Id is not valid for deleting'})
    }
  
    const post = await Post.findOneAndDelete({_id: id})
  
    if(!post) {
      console.log(post)
      return res.status(400).json({error: 'No such post for deleting'})
    }
  
    res.status(200).json(post)
  }

  const updatePost = async (req, res) => {
    const { id } = req.params;  // Extract id from req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'Object Id is not valid for updating'})
    }
  
    // read current entry in database
    let currentObject = await Post.findOne({ _id: id });
  
    if (!currentObject) {
      return res.status(400).json({error: 'No such post for updating'});
    }
  
    // merge current entry with changed updated key:values
    let newPost = { ...currentObject._doc, ...req.body };
  
    const updatedPost = await Post.findOneAndUpdate({ _id: id }, {$set: newPost}, { new: true });
  
    if(!updatedPost) {
      console.log(updatedPost);
      return res.status(400).json({error: 'Error updating post'});
    }
  
    res.status(200).json(updatedPost);
  }

  const addVolunteer = async (req, res) => {
    const { id, volunteerId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(volunteerId)) {
        return res.status(400).json({ error: 'Invalid post or volunteer ID' });
    }

    try {
        const post = await Post.findById(id);
        console.log(post);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Add volunteerId to the volunteers array if it's not already added
        if (!post.volunteers.includes(volunteerId)) {
            post.volunteers.push(volunteerId);
            await Post.findByIdAndUpdate(volunteerId, id, {});
        }

        res.status(200).json({ message: 'Volunteer added to post successfully', post });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



module.exports = { createPost, getPost, deletePost, updatePost, getPostsByStatus, getPosts, addVolunteer }