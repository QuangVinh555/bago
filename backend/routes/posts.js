const express = require('express');
const PostsControllers = require('../controllers/PostsControllers');
const router = express.Router();

router.post('/', PostsControllers.createPost);
router.put('/:id', PostsControllers.updatePost);
router.delete('/:id', PostsControllers.deletePost);
router.put('/:id/like', PostsControllers.likePost);
router.get('/timeline/:userId', PostsControllers.getTimeLinePost);
router.get('/profile/:username', PostsControllers.getUserAllPost);
router.get('/:id', PostsControllers.getPost);

module.exports = router;