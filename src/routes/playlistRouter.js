
 var express=require('express');  
 var session=require('express-session');
 var req=require('request') ;
 var app=express();
/*
 var SpotifyWebApi=require('spotify-web-api-node');



app.use(session({ secret:1234 }));
var ses=req.session
var access_token=req.session.token
const spotifyApi = new SpotifyWebApi();

spotifyApi.setAccessToken(access_token);

 // Get a user's playlists
spotifyApi.getUserPlaylists('thelinmichael')
  .then(function(data) {
    console.log('Retrieved playlists', data.body);
  },function(err) {
    console.log('Something went wrong!', err);
  });


*/
var playlistRouter=express.Router();  
var pl_router=function(navMenu){  
    playlistRouter.route("/")  
        .get(function(req,res){  
            res.render('login', {  
                
                menu:navMenu  
            });  
        });  
        return playlistRouter;  
}  
      
module.exports=pl_router;  


