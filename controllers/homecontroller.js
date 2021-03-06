const Med = require('../models/medicine');
const Post = require('../models/post');
const Customer = require('../models/customer');

module.exports.home = function(req,res){

     console.log(req.cookies);
    // res.cookie('customer', 1);           //<<<<<<<<<<<---------------Altering Cookie from server side
    Med.find({},function(err,medicines){

        if(err){console.log('Error in loading medicine list!!'); return;};
        
        return res.render("home",{
            title:"Royal Pharma",
            medicines: medicines,
            header:"Solution to all miseries"
        });
    })
}


module.exports.homePosts = async function(req,res){

    //console.log(req.cookies);
   // res.cookie('customer', 1);           //<<<<<<<<<<<---------------Altering Cookie from server side
//    Post.find({},function(err,posts){
//        if(err){console.log('Error in loading posts!!');return;}

//        return res.render("home_posts",{
//         title:" MediBook feed",
//         header:"Solution to all miseries",
//         posts:posts
//     });
//    })
            // Without async-await
/*Post.find({})
   .populate('customer')
   .populate({
       path: 'comments',
       populate:{
           path: 'customer'
       }
   })
   .exec(function(err,posts){             //<<<--------- pre populating the user from its customer_id in the database to display it on the home page
    if(err){console.log('Error in loading posts!!',err);return;}

        Customer.find({},function(err,customers){

            return res.render("home_posts",{
                title:" MediBook feed",
                header:"Solution to all miseries",
                posts:posts,
                all_customers: customers
                })
        });

    });
*/

// to avoid call back hell we use async-await 

try{

    let posts = await Post.find({})
    .populate('customer')
    .populate({
        path: 'comments',
        options: { sort: '-createdAt' },
        populate:{
            path: 'customer'
        }
    }).sort('-createdAt');                  //<<<<<<-------- For sorting the posts in reverse chronological order

    let customers = await Customer.find({});

    return res.render("home_posts",{
        title:" MediBook feed",
        header:"Solution to all miseries",
        posts:posts,
        all_customers: customers
    })

}catch(err){

    console.log("Error in reading posts from DB!", err);
}

}
module.exports.destroy = function(req,res){

    let id = req.query.id;
    //console.log(typeof(id));
    Med.findByIdAndDelete(id,function(err){
        if(err){console.log("Error in deleting the Medicine from DB"); return;}

        return res.redirect('back');
    });

}

module.exports.create = function(req,res){

    Med.create({
        Name:req.body.Name,
        Company: req.body.Company
    },function(err,newMedicine){
        if(err){
            console.log('Error in creating contact');
            return;
        }
        console.log('******',newMedicine);
        return res.redirect('back');
    })
}