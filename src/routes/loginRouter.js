var express=require('express');  
  
var loginRouter=express.Router();  
var l_router=function(navMenu){  
    loginRouter.route("/")  
        .get(function(req,res){  
            res.render('login', {  
                
                menu:navMenu  
            });  
        });  
        return loginRouter;  
}  
      
module.exports=l_router;  


