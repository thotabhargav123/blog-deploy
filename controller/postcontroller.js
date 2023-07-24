import Post from '../model/post.js';


export const createPost = async (request, response) => {
    try {
        const post = await new Post(request.body);
        post.save();

        response.status(200).json('Post saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}

export const getAllPosts = async (request, response) => {
    // let username = request.query.username;
    let category = request.query.category;
    let posts;
    try {
        // if (username) {
        //     posts = await Post.find({ username: username });
        // }
        if (category) {
            posts = await Post.find({ category: category })
        }
        else {
            posts = await Post.find({})
        }
        // posts = await Post.find({});
        // console.log("The posts are:", posts);
        response.status(200).json(posts);
    } catch (err) {
        // console.log("The error found here", err);
        response.status(500).json(err);
    }

}

export const getPostById = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        response.status(200).json(post);
    }
    catch (error) {
        response.status(500).json(error)
    }
}

export const updatePost = async (request, response) => {
    try {
        const getPost = Post.findById(request.params.id);
        // console.log(getPost);
        if (!getPost) {
            response.status(404).json({ msg: 'No post found' });
        }
        await Post.findByIdAndUpdate(request.params.id, { $set: request.body }); //$set means repalce a+b = b //$addtoset a+b = ab

        response.status(200).json({ msg: 'success' });

    }
    catch (error) {
        response.status(500).json({ msg: "Something went wrong" });
    }
}

export const deletePost = async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);

        await Post.findByIdAndDelete(post._id)

        response.status(200).json('post deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}