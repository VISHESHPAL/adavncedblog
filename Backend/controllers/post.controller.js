import Post from "../models/post.model.js";

export const createPost = async( req, res ) =>{
    try {

        const {title , content , tags} =  req.body;
        if(!title){
            return res.status(401).json({
                success : false ,
                message : "Title is Required ! "
            })
        }

        const post =  await Post.create({
            title,
            content,
            tags,
            author : req.user.id
        })
        
        return res.status(201).json({
             success : true,
             message : "Post created Successfully !",
             post
        })
    } catch (error) {
        return res.status(500).json({
            success : false ,
            message : "Error in the creating the post ! "
        })
    }
}

export const updatePost = async( req, res ) =>{
    try {

        const post =  await Post.findById(req.params.id)
        if(!post){
            return res.status(404).json({
                success : false ,
                message : "Post Not Found ! "
            })
        }

        if(post.author.toString() !== req.user.id && req.user.role !== "admin"){
             return res.status(403).json({
                success : false ,
                message : "Not allowed to edit this post !"
             })
        }

        Object.assign(post, req.body)
        await post.save();

        return res.status(201).json({
            success : true ,
            message : "Post Updated Successfully ! ",
            post
        })
        
    } catch (error) {
         return res.status(500).json({
            success : false ,
            message : "Error in the updating the post ! "
        })
    }

}


export const deletePost = async( req, res ) =>{

    try {

        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({
                success : false ,
                message : "Post Not found ! "
            })
        }
        
        if(post.)
    } catch (error) {
        
    }

}
export const togglePublish  = async( req, res ) =>{

    try {
        
    } catch (error) {
        
    }

}

export const getAllPublicPosts = async( req, res ) =>{

    try {
        
    } catch (error) {
        
    }

}

export const getSinglePost = async( req, res ) =>{

    try {
        
    } catch (error) {
        
    }

}