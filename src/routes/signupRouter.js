var express=require('express');  
  
var signupRouter=express.Router();  
var s_router=function(navMenu){  
    signupRouter.route("/")  
        .get(function(req,res){  
            res.render('signup', {  
                
                menu:navMenu  
            });  
        });  
        return signupRouter;  
}  
      
module.exports=s_router;  