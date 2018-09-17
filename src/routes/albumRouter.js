
var express=require('express');  
  
var albumRouter=express.Router();  

var SpotifyWebApi=require('spotify-web-api-node');

var app=express();
var req=require('request');
var session = require('express-session');
const spotifyApi = new SpotifyWebApi();

// app.use(session({
//     secret: '2C44-4D44-WppQ38S',
//     resave: true,
//     saveUninitialized: true
// }));
//   if(req.session.token) {
//     console.log("********************************************************************")
//     console.log(req.session.token)
//          // req.session.token=access_token;
//   }
//   else {
//     console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
//   }


				// spotifyApi.setAccessToken(request.session.token);

				// spotifyApi.apiUrl = 'https://api.spotify.com/v1';

				// spotifyApi.getAlbums(['382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc', '3KyVcddATClQKIdtaap4bV'])
				//   .then(function(data) {
				//     console.log('Albums information', data.body);
				//   }, function(err) {
				//     console.error(err);
				//   });




/*


  const apiCall = () => {
                    return new Promise((resolve, reject) => {
                      var options = {
                      		 url: 'https://api.spotify.com/v1/me',
                    		 
                            json: true
                      };
                      req.get(options, function(error, res, body) {
                            if(error) reject(error);
                            console.log(body);
                            resolve(body);
                      });
                    });
                  }
     apiCall().then((body) => {
     			app.use(session({secret:'1234'}));
				var sess=req.session;
				var access_token=sess.token;


				spotifyApi.setAccessToken(access_token);

				spotifyApi.apiUrl = 'https://api.spotify.com/v1';

				spotifyApi.getAlbums(['382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc', '3KyVcddATClQKIdtaap4bV'])
				  .then(function(data) {
				    console.log('Albums information', data.body);
				  }, function(err) {
				    console.error(err);
				  });



	})  
	    .catch((err) => console.log(err));            








*/




		
var al_router=function(navMenu){  
    albumRouter.route("/")  
        .get(function(req,res){  
            res.render('albums', {  
        


        		 menu:navMenu  
            });  
        });  
        return albumRouter;  
}  
      
module.exports=al_router;  



