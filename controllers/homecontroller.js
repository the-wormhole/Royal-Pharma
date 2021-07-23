const Med = require('../models/medicine');

module.exports.home = function(req,res){

     console.log(req.cookies);
    // res.cookie('customer', 1);           //<<<<<<<<<<<---------------Altering Cookie from server side
    Med.find({},function(err,medicines){

        if(err){console.log('Error in loading contacts!!'); return;};
        
        return res.render("home",{
            title:"Royal Pharma",
            medicines: medicines,
            header:"Solution to all miseries"
        });
    })
}
module.exports.homePosts = function(req,res){

    console.log(req.cookies);
   // res.cookie('customer', 1);           //<<<<<<<<<<<---------------Altering Cookie from server side
    return res.render("home_posts",{
        title:" MediBook feed",
        header:"Solution to all miseries"
    })
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