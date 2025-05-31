import Post from "../model/post.js"

//add post
 export const postCreate=async (req,res)=>{
    const{title,content}=req.body;
    try{
        const newpost=new Post({
            title,content,author:req.id
        })
         await newpost.save();
        res.status(201).json(newpost);
    }
    catch(e){
        res.status(500).json({message:e.message})
    }
 }
 //get all post
 function likecount(posts){
   const formattedPosts = posts.map(post => ({
      ...post.toObject(),
      likeCount: post.likes.length
    }));
    return formattedPosts;
    
 }
 export const allpost=async(req,res)=>{
  try{
    const posts=await Post.find().populate('author' ,'username avatar').sort({createdAt:-1});
    if(!posts) return res.status(200).json({message:"no post founded"})
      const formattedPosts = likecount(posts)
    res.status(200).json(formattedPosts);
  }
  catch(e){
    res.status(500).json({message:e.message})
  }
 }

 //get single post
export const getsinglepost=async (req,res)=>{
    const id=req.params.id;
    try{
       const post= await Post.findById(id).populate('author' ,'username avatar').populate('comments.author', 'username avatar');
       if(!post)return res.status(400).json({message:"no post found"})
        const formattedPosts = {...post,likecount:post.likes.length}
    res.status(200).json(formattedPosts)
    }
    catch(e){
        res.status(500).json({message:e.message})
    }
}

// update post

export const updatepost = async (req, res) => {
  const userid=req.id;
  const id = req.params.id;
  const { title, content } = req.body;
  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
     if(post.author.toString() !== userid) {
  return res.status(403).json({ message: "Only author can edit" });
}
    // Only update fields if they are provided
    const updateFields = {};
    if (title) updateFields.title = title;
    if (content) updateFields.content = content;

    await Post.updateOne({ _id: id }, { $set: updateFields });

    res.status(200).json({ message: "Post updated successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


//delete post

export const deletepost = async (req, res) => {
  const id = req.params.id;
  const userid=req.id;
  console.log("id")
console.log(userid)
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Optional: Only allow the author to delete their own post
    // if (post.author.toString() !== req.id) {
    //   return res.status(403).json({ message: "You are not authorized to delete this post" });
    // }
    if(post.author.toString() !== userid) {
  return res.status(403).json({ message: "Only author can delete" });
}

    await Post.deleteOne({ _id: id });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
 
//likes update

export const togglelike=async(req,res)=>{
  const userId=req.id;
  const postId=req.params.id;
  
  try{
    const post=await Post.findById(postId);
    if(!post) res.status(404).json({message:"no post found"})
    
    //likes 
    
    const index=post.likes.indexOf(userId)
    if(index===-1 || post.likes.length===0){
      post.likes.push(userId)//adding likes
    }
    else{
      post.likes.splice(index, 1);
    }
    await post.save();
    res.status(200).json({ message: "Like status updated", likes: post.likes.length });
  }
  catch(e){
    res.status(500).json({message:e.message})
  }
}

// In controller/postController.js
export const addComment = async (req, res) => {
  const postId = req.params.id;
  const { text } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = {
      user: req.id,
      text,
      createdAt: new Date()
    };

    post.comments.push(comment);
    await post.save();

    res.status(200).json({ message: "Comment added", comments: post.comments });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

// In controller/postController.js
export const getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.id }).sort({ createdAt: -1 }).populate('author' ,'username avatar').populate('comments.user', 'username avatar');
    const formattedPosts=likecount(posts)
    res.status(200).json(formattedPosts);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

//update comment
export const updateComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const userId = req.id;
  const { text } = req.body;

  if (!text) return res.status(400).json({ message: "Comment text is required" });

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== userId) {
      return res.status(403).json({ message: "Only the comment author can update" });
    }

    comment.text = text;
    await post.save();

    res.status(200).json({ message: "Comment updated", comment });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

//delete comment
export const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const userId = req.id;

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const isAuthor = comment.user.toString() === userId;
    const isPostOwner = post.author.toString() === userId;

    if (!isAuthor && !isPostOwner) {
      return res.status(403).json({ message: "Not authorized to delete comment" });
    }

    comment.remove();
    await post.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
