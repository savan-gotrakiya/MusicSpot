var express=require('express');  
  
var homeRouter=express.Router();  
var h_router=function(navMenu){  
    homeRouter.route("/")  
        .get(function(req,res){  
            res.render('index', {  
                
                menu:navMenu  
            });  
        });  
        return homeRouter;  
}  
      
module.exports=h_router;  