const Comment = require('../models/comments');
const Post = require('../models/post');

module.exports.create = async function(req,res){

    try{
        let post = await Post.findById(req.body.post);
        //,function(err,post){

        if(post){                           //<<<<<<<<<---------- Check if the post exists in the database
            let comment = await Comment.create({
                content:req.body.content,
                customer:req.user._id,
                post:req.body.post
            });
            //,function(err,comment){

            post.comments.push(comment);
            post.save();                //<<<----------- Updating the array of comments and saving it (functionality provided by mongoDB)

            console.log(comment);
            res.redirect('/');
            //})
        }
    //})
    }catch(err){

        console.log("Error in adding Comment",err);
        return;
    }
    
    //console.log(req.body.post);
    
}
module.exports.destroy = async function(req,res){

    try{
        let comment = await Comment.findById(req.params.id);
        //,function(err,comment){
        if(comment.customer == req.user.id){

        let postId = comment.post;
        comment.remove();
            
        await Post.findByIdAndUpdate(postId, {$pull : {comments: req.params.id}},{useFindAndModify: false}); //<<<<-------------- 'useFindAndModify': true by default. Set to false to make findOneAndUpdate() and findOneAndRemove() use native findOneAndUpdate() rather than findAndModify().
        //,function(err,post){
        return res.redirect('back');
        //});
        }else{
            return res.redirect('back');
        }
    //});
    }catch(err){
        
        console.log("Error in Deleting comments!!",err);
    }
    
}