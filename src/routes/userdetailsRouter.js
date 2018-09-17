var express=require('express');  
var session = require('express-session');
var app=express();
var request=require('request')

var SpotifyWebApi=require('spotify-web-api-node');


const spotifyApi = new SpotifyWebApi();



/*           app.use(session({secret: 'keyboard cat'}));

         var sess=request.session;
      
        var token=sess.access_token;

        spotifyApi.setAccessToken(token);
    

    


 // Get the authenticated user
spotifyApi.getMe()
  .then(function(data) {
    console.log('Some information about the authenticated user', data.body);
                             console.log(data.body);

  }, function(err) {
    console.log('Something went wrong!', err);
  });

*/  
 
var userdetailsRouter=express.Router();




var ur_router=function(navMenu){  
    userdetailsRouter.route("/")  
        .get(function(req,res){  
            res.render('user-details', {  
                menu:navMenu  ,
              
            });  
        });  
        return userdetailsRouter;  
}  
      
module.exports=ur_router;  


