const express = require('express');
const UsersControllers = require('../controllers/UsersControllers');
const router = express.Router();

router.put('/:id', UsersControllers.updateUser);
router.delete('/:id', UsersControllers.deleteUser);
router.get('/', UsersControllers.getUser);
router.put('/:id/follow', UsersControllers.followUser);
router.put('/:id/unfollow', UsersControllers.unFollowUser);
router.get('/friends/:userId', UsersControllers.getFriends);
router.get('/alluser', UsersControllers.getAllUser);

module.exports = router;