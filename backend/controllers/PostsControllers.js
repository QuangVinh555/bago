const Post = require('../models/Post');
const User = require('../models/User');

const PostsControllers = {
    // create a user
    createPost: async(req, res) => {
        try {
           
            const newPost = new Post({
                userId: req.body.userId,
                desc: req.body.desc,
                img: req.body.img,
                likes: req.body.likes
            })

            const post = await newPost.save();
            return res.status(200).json(post);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    updatePost: async(req, res) => {
        try {
            const post = await Post.findById(req.params.id)
            if(post.userId === req.body.userId) {
                await post.updateOne({$set: req.body});
                return res.status(200).json("Cập nhật bài viết thành công!");
            }
            else{
                return res.status(404).json("Chỉ được cập nhật bài viết của bạn!");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    // deletePost: async(req, res) => {
    //     try {
    //         const post = await Post.findById(req.params.id)
    //         if(post.userId === req.body.userId) {
    //             await post.deleteOne();
    //             return res.status(200).json("Xóa bài viết thành công!");
    //         }
    //         else{
    //             return res.status(404).json("Chỉ được xóa bài viết của bạn!");
    //         }
    //     } catch (error) {
    //         return res.status(500).json(error);
    //     }
    // },
    deletePost: async(req, res) => {
        try {
            await Post.findByIdAndDelete(req.params.id);
            return res.status(200).json("Xóa bài viết thành công")
        } catch (error) {
            return res.status(500).json(error);
        }

    },

    likePost: async(req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            if(!post.likes.includes(req.body.userId)){
                await post.updateOne({$push: {likes: req.body.userId}});
                return res.status(200).json("Bạn đã like!");
            }
            else{
                await post.updateOne({$pull: {likes: req.body.userId}});
                return res.status(200).json("Bạn đã hủy like!");
            }
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getPost: async(req, res) => {
        try {
            const post = await Post.findById(req.params.id);
            return res.status(200).json(post)
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    getTimeLinePost: async(req, res) => {
        try {
            const currentUser = await User.findById(req.params.userId);
            const userPosts = await Post.find({userId: currentUser._id});
            const friendPosts = await Promise.all(
                currentUser.followings.map(friendId => (
                    Post.find({userId: friendId})
                ))
            );
            res.status(200).json(userPosts.concat(...friendPosts));
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    getUserAllPost: async(req, res) => {
        try {
            const user = await User.findOne({username: req.params.username});
            const post = await Post.find({userId: user._id});
            return res.status(200).json(post);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = PostsControllers;