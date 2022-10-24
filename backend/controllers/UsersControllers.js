const User = require('../models/User');
const bcrypt = require('bcrypt');

const UsersControllers = {
    //Update user
    updateUser: async (req, res) => {
        if(req.body.userId === req.params.id || req.body.isAdmin) {
            if(req.body.password){
               try {
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password, salt);
               } catch (error) {
                    return res.status(500).json(error);           
               }
            }
            try {       
                await User.findByIdAndUpdate(req.params.id, {$set: req.body});
                return res.status(200).json("Cập nhật user thành công");
            } catch (error) {
                return res.status(500).json(error);
            }
        }
        else {
            return res.status(401).json("Bạn không có thể cập nhật trên tài khoản này");
        }
    },
    deleteUser: async (req, res) => {
        if(req.body.userId === req.params.id || req.body.isAdmin) {
            try {       
                await User.findByIdAndDelete(req.params.id);
                return res.status(200).json("Xóa user thành công");
            } catch (error) {
                return res.status(500).json(error);
            }
        }
        else {
            return res.status(401).json("Bạn không có thể xóa trên tài khoản này");
        }
    },
    //[GET] /api/user
    getUser: async (req, res) => {
        try {
            const userId = req.query.userId;
            const username = req.query.username;

            const user = userId 
                ? await User.findById(userId)
                : await User.findOne({ username: username});
            const {password, updatedAt, ...other} = user._doc;
            return res.status(200).json(other);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    // [PUT] /:id/follow
    followUser: async (req, res) => {
        if(req.body.userId !== req.params.id) {
            try {
                const user = await User.findById(req.params.id);
                const currentUser = await User.findById(req.body.userId);
                if(!user.followers.includes(req.body.userId)){
                    await user.updateOne({$push: {followers: req.body.userId}});
                    await currentUser.updateOne({$push: {followings: req.params.id}});
                    return res.status(200).json("Bạn đã theo dõi thành công");
                }
                else{
                    res.status(403).json("Bạn đã theo dõi người này rồi!");
                }

            } catch (error) {
                res.status(500).json(error);
            }
        }
        else{
            res.status(500).json("Không thể tự follow chính bạn!");
        }
    },
    unFollowUser: async (req, res) => {
        if(req.body.userId !== req.params.id) {
            try {
                const user = await User.findById(req.params.id);
                const currentUser = await User.findById(req.body.userId);
                if(user.followers.includes(req.body.userId)){
                    await user.updateOne({$pull: {followers: req.body.userId}});
                    await currentUser.updateOne({$pull: {followings: req.params.id}});
                    return res.status(200).json("Bạn đã hủy theo dõi thành công");
                }
                else{
                    res.status(403).json("Bạn chưa theo dõi người này!");
                }

            } catch (error) {
                res.status(500).json(error);
            }
        }
        else{
            res.status(500).json("Không thể tự unfollow chính bạn!");
        }
    },
    // get friends list
    // [GET] friends/:userId
    getFriends: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId);
            const friends = await Promise.all(
                user.followings.map(friendId => {
                    return User.findById(friendId);
                })
            )
            let friendList = [];
            friends.map(friend => {
                const {_id, username, profilePicture} = friend;
                friendList.push({_id, username, profilePicture});
            })
            return res.status(200).json(friendList);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    //[GET] /alluser
    getAllUser: async (req, res) => {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
        
    }
}

module.exports = UsersControllers;