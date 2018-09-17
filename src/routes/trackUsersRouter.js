var express=require('express');  
var session = require('express-session');
var app=express();
var request=require('request')

 
var trackUsersRouter=express.Router();




var tr_router=function(navMenu){  
    trackUsersRouter.route("/")  
        .get(function(req,res){  
            res.render('track-users', {  
                menu:navMenu  ,
              
            });  
        });  
        return trackUsersRouter;  
}  
      
module.exports=tr_router;  


