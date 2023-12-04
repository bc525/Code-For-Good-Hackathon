const express = require('express')

const { createPost, getPost, getPosts, getPostsByStatus, updatePost, addVolunteer, deletePost } = require('../controllers/postController')

const router = express.Router()

router.post('/createPost', createPost)

router.get('/:id', getPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)

router.get('/', getPosts)
router.post('/add', addVolunteer)

router.get('/by/:status', getPostsByStatus)



module.exports = router