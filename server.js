/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var path=require('path')
var bodyParser=require('body-parser');
var client_id = '3468ff4c1d6e41928cba3784a042c158'; // Your client id
var  client_secret = 'd6d554fb071647f1b024758ea4785d1d'; // Your secret
var redirect_uri = 'http://localhost:8888/user-details'; // Your redirect uri
var router = express.Router();

var app=express();
var app2=express();


// viewed at http://localhost:8080
var port = 8888; // setting port for the application   
let name='savan';
//Following function is starts sockets and start listen from particular port. In following code I have given call back which contains err. So when port willbe start and listen function will be fire then this function will be execute.   

//token
//access_token=BQCyAJkrqWEC4fbE48mBp43v00qoNjOLQcWYDfYr6_Cd_5Qq1CLQtUHrnC-G2Hx1M9NCdHe0aoTFX-w_hOc0B_gNgLSzzpJAFeCp9uVhMB54DNQSSTTs3YjDw7uXNBcIZ45yxVBhKQN_5C3BsFKqBNwi0DL7f_RMOq2iAuTAxdYT4uwFSpzU&refresh_token=AQCfJ8clubJGVPQv8rRAvSCnlBRJ3rJfHfWM-0zLcx4RMYUe9PfwxAuiRgMmyjp3X2wppNZ_XkKRUCqqB-YaWMkPnCZoBPVv_fzEMUzMZO6jIYtrRYTE7HV_fc3Ymbn0q9hHFg


/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */


var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(cookieParser());

app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));
   
app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-read-currently-playing';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/user-details', function(req, res) {


  console.log("callback-----------------------------")

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/index' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
  console.log("state matched")
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };




  console.log("no error")
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

            req.session.token=access_token;
            console.log('token' + req.session.token);

              if(req.session.token) {
                console.log("********************************************************************")
                console.log(req.session.token)
               // req.session.token=access_token;
              }
              else {
                console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
              }

   
          var SpotifyWebApi=require('spotify-web-api-node');
          const spotifyApi = new SpotifyWebApi();
           spotifyApi.setAccessToken(req.session.token);
           

              spotifyApi.getArtistRelatedArtists('137W8MRPWKqSmrBGDBFSop')
              .then(function(data2) {
                console.log('Top Related Artists:') 
                console.log(data2.body.artists[0].name);
   
                 app.use(session({
                            secret: '2C44-4D44-WppQ38S',
                            resave: true,
                            saveUninitialized: true

                   }));
           
              req.session.save(function(err)
              {
                req.session.ar_name=data2.body.artists[0].name;

              })
                
                name=data2.body.artists[0].name;

               // res.cookie(ar_name , data2.body.artists[0].name)

                console.log("name global",name);
              }, function(err) {
                done(err);


    });

      spotifyApi.getAlbums(['382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc', '3KyVcddATClQKIdtaap4bV'])
          .then(function(data) {

         });


/*
         spotifyApi.getAlbums(['382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc', '3KyVcddATClQKIdtaap4bV'])
          .then(function(data) {
           console.log('Albums information Name', data.body.albums[0].name);

           app.use(session({
              secret: '2C44-4D44-WppQ38S',
              resave: true,
              saveUninitialized: true
          }));

           req.session.al_name=data.body.albums[0].name;


          // req.session.al_pop=data.body.albums[0].href;
        
         req.session.al_image=data.body.albums[0].images[0].url;

           
        //   req.session.al_image=data.body.albums[0].images[0].url;

           app.use(session({
            secret: '2C44-4D44-WppQ38S',
            resave: true,
            saveUninitialized: true
        }));
*/
       
          // console.log(req.session.al_pop);
          // console.log(req.session.al_image);
                      

//*********************************************//    

  const apiCall2 = () => {
                    return new Promise((resolve, reject) => {
                      var options = {
                            url: 'https://api.spotify.com/v1/me',
                            headers: { 'Authorization': 'Bearer ' + access_token },
                            json: true
                      };
                    
                    request.get(options, function(error, res, body) {
                            if(error) reject(error);
                              resolve(body);

                      });
                    });
                  }

              console.log('API2---------------------');
 
              apiCall2().then((body) => {

                            spotifyApi.getMyCurrentPlaybackState({
                                        })
                                        .then(function(data) {
                                          // Output items
                                          console.log("Now Playing: ",data.body);
                                        }, function(err) {
                                          console.log('Something went wrong!', err);
                                        });



                              spotifyApi.getAlbums(['382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc', '3KyVcddATClQKIdtaap4bV'])
                              .then(function(data) {
                               console.log('Albums information Name', data.body.albums[0].name);
                              console.log('Albums information Artist Name', data.body.albums[0].artists[0].name);
                               console.log('Albums information', data.body);


                            app2.use(session({
                                  secret: '2C44-4D44-WppQ38S',
                                  resave: true,
                                  saveUninitialized: true
                              }));
                           
                                          

                                          req.session.al_name1=data.body.albums[0].name;
                                          req.session.al_name2=data.body.albums[1].name;
                                          req.session.al_name3=data.body.albums[2].name;
                                          req.session.al_name4=data.body.albums[3].name;
                                          
                                          req.session.al_image1=data.body.albums[0].images[0].url;
                                          req.session.al_image2=data.body.albums[0].images[1].url;
                                          req.session.al_image3=data.body.albums[1].images[0].url;
                                          req.session.al_image4=data.body.albums[1].images[1].url;
                                          req.session.al_image5=data.body.albums[2].images[0].url;
                                          req.session.al_image6=data.body.albums[2].images[1].url;
                                          req.session.al_image7=data.body.albums[2].images[0].url;
                                          req.session.al_image8=data.body.albums[3].images[0].url;
                                          req.session.al_image9=data.body.albums[3].images[1].url;
                                        
                                          req.session.al_ar_name1=data.body.albums[0].artists[0].name;
                                          req.session.al_ar_name2=data.body.albums[1].artists[0].name;
                                          req.session.al_ar_name3=data.body.albums[2].artists[0].name;
                                          req.session.al_ar_name4=data.body.albums[3].artists[0].name;
                                        
                                         req.session.al_label1=data.body.albums[0].label;
                                         req.session.al_label2=data.body.albums[1].label;
                                         req.session.al_label3=data.body.albums[2].label;
                                         req.session.al_label4=data.body.albums[3].label;
                                             
                                   

                                          console.log('Albums information Name Session', req.session.al_name);
                                           req.session.save(function(err) {
                                
                                              // session saved
                                            })
                                      

                               }, function(err) {
                                console.error(err);
                               });
        
                           
                         
                        /*      app.use(session({
                                  secret: '2C44-4D44-WppQ38S',
                                  resave: true,
                                  saveUninitialized: true
                              }));
 */                            console.log('---------------------------------------');
                             console.log(req.session.al_name);
  
               })

                  .catch((err) => console.log(err));


         console.log('API2222 ----',req.session.token)
          const apiCall3 = () => {
                    return new Promise((resolve, reject) => {
                      var options = {
                            url: 'https://api.spotify.com/v1/me/player/currently-playing',
                            headers: { 'Authorization': 'Bearer ' + req.session.token },
                            json: true
                      };
                      request.get(options, function(error, res, body) {
                            if(error) reject(error);
                       
                            console.log("Now Playing: ",body);
                       
                      /*   if(body='undefined')
                         {
                            req.session.timestamp='Open Song'
                            req.session.progress_ms='Open Song'
                            req.session.album_href='Open Song'
                            req.session.album_name='Open Song'
                            req.session.artist_name='Open Song'
                            req.session.title='Open Song'
                            req.session.is_playing='Open Song'
                         } 
                         else{*/
                            console.log('timestamp:',body.timestamp);
                            console.log('progress_ms:',body.progress_ms);
                            console.log('album_href:',body.item.album.href);
                            console.log('album_name:',body.item.album.name);
                            console.log('artist_name:',body.item.artists[0].name);
                            console.log('title:',body.item.name);
                            console.log('is_playing:',body.is_playing);
                            
                            req.session.timestamp=body.timestamp
                            req.session.progress_ms=body.progress_ms
                            req.session.album_href=body.item.album.href
                            req.session.album_name=body.item.album.name
                            req.session.artist_name=body.item.artists[0].name
                            req.session.title=body.item.name
                            req.session.is_playing=body.is_playing
                           // }
                            
                           // console.log('-----------Now Playing----------------',body.display_name);
                        //    console.log(body.id)
                            resolve(body);

                      });
                    });
                  }
                 apiCall3().then((body) => {



                      })

                  .catch((err) => console.log(err));











        const apiCall = () => {
                    return new Promise((resolve, reject) => {
                      var options = {
                            url: 'https://api.spotify.com/v1/me',

                            headers: { 'Authorization': 'Bearer ' + access_token },
                            json: true
                      };
                      request.get(options, function(error, res, body) {
                            if(error) reject(error);
                            console.log(body);
                            console.log('-----------name----------------',body.display_name);
                            req.session.display_name=body.display_name
                            req.session.email=body.email
                            req.session.type=body.type
                            req.session.id=body.id
                            req.session.image=body.images[0]
                            req.session.followers=body.followers.total
                            req.session.country=body.country
                          
                        //    console.log(body.id)
                            resolve(body);

                      });
                    });
                  }

                  apiCall().then((body) => {

      //get user play list track
  
  // Get tracks in a playlist

  spotifyApi.getPlaylistTracks('thelinmichael', '3ktAYNcRHpazJ9qecm3ptn', {
      offset: 1,
      limit: 5,
      fields: 'items'
    })
    .then(
      function(data) {
        console.log('The playlist contains these tracks', data.body);
      },
      function(err) {
        console.log('Something went wrong!', err);
      }
    );



  //get current state

         // Get a user's playlists
      
              req.session.save(function(err)
              {

              })

          spotifyApi.getUserPlaylists(body.id)
          .then(function(data3) {
            console.log('Playlist')
            console.log(data3.body)
            console.log('tracks info');
            console.log('id',data3.body.items[0].id)
                     

            //get song inside user play list

            console.log('link',data3.body.items[0].href)
            console.log('image',data3.body.items[0].images[0].url)
            console.log('Album Name',data3.body.items[0].name)
            console.log('Artist',data3.body.items[0].owner.display_name)
            
          

           req.session.playlist_link=data3.body.items[0].href;
           req.session.playlist_link2=data3.body.items[1].href;
           req.session.playlist_link3=data3.body.items[2].href;
           req.session.playlist_link4=data3.body.items[3].href;
           req.session.playlist_link5=data3.body.items[4].href;
           req.session.playlist_link6=data3.body.items[5].href;
           req.session.playlist_link7=data3.body.items[6].href;
          

            req.session.playlist_image=data3.body.items[0].images[0].url;
            req.session.playlist_image2=data3.body.items[1].images[0].url;
            req.session.playlist_image3=data3.body.items[2].images[0].url;
            req.session.playlist_image4=data3.body.items[3].images[0].url;
            req.session.playlist_image5=data3.body.items[4].images[0].url;
            req.session.playlist_image6=data3.body.items[5].images[0].url;
            req.session.playlist_image7=data3.body.items[6].images[0].url;
           
            req.session.playlist_album=data3.body.items[0].name;
            req.session.playlist_album2=data3.body.items[1].name;
            req.session.playlist_album3=data3.body.items[2].name;
            req.session.playlist_album4=data3.body.items[3].name;
            req.session.playlist_album5=data3.body.items[4].name;
            req.session.playlist_album6=data3.body.items[5].name;
            req.session.playlist_album7=data3.body.items[6].name;
           
           
           req.session.playlist_artist=data3.body.items[0].owner.display_name;
           req.session.playlist_artist2=data3.body.items[1].owner.display_name;
           req.session.playlist_artist3=data3.body.items[2].owner.display_name;
           req.session.playlist_artist4=data3.body.items[3].owner.display_name;
           req.session.playlist_artist5=data3.body.items[4].owner.display_name;
           req.session.playlist_artist6=data3.body.items[5].owner.display_name;
           req.session.playlist_artist7=data3.body.items[6].owner.display_name;
                                req.session.save(function(err) {
                                
                                              // session saved
                                            })
                       

            console.log('Retrieved playlists', data3.body.playlists.href);
          },function(err) {
            console.log('Something went wrong!', err);
          });
    

      


  
// Get the authenticated user
spotifyApi.getMe()
  .then(function(data) {
    console.log('Some information about the authenticated user', data.body);
                             console.log(data.body);

  }, function(err) {
    console.log('Something went wrong!', err);
  });

  console.log("api.then")
                    console.log(body)
app.set('views', path.join(__dirname, 'src/views/'));// set function to tell express where we have store the views
app.set('view engine','ejs');  //to tell express which template engine you are going to use.
     
        res.render(
          'user-details',{name:req.session.display_name,email:req.session.email,type:req.session.type,id:req.session.id,image:req.session.image,followers:req.session.followers,country:req.session.country}
            // {access_token: access_token,
            // refresh_token: refresh_token} 
          );
                      // do your things here
                  })
                  .catch((err) => console.log(err));
        // we can also pass the token to the browser to make requests from there
        // res.redirect('/user-details'
        //   ,
        //     {access_token: access_token,
        //     refresh_token: refresh_token}
        //   );
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});









app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});



app.listen(port, function(err) {  
    if (typeof(err) == "undefined") {  
        console.log('Your application is running on : ' + port + ' port');  
    }  
});




var navMenu=[
             { href:'/index',text:'Home'},  
             { href:'/Playlist',text:'Playlist'},  
             { href:'/books',text:'books'},  
             { href:'/signup',text:'SignUp'}, 
             { href:'/login',text:'login'}, 
             { href:'/user-details',text:'UserDetails'}, 
             { href:'/albums',text:'Albums'}, 
             { href:'/track-users',text:'Track Users'}       
        
          ];


app.use(session({
          secret: '2C44-4D44-WppQ38S',
          resave: true,
          saveUninitialized: true
      }));



app.get('/playlist', function (req, res) {
               //res.send(req.session.al_name);
               //console.log("********************************************************************")
    
          if(req.session.ar_name) {
            console.log(req.session.ar_name)
            res.render('playlist', { image: req.session.playlist_image, album_name:req.session.playlist_album,artist_name:req.session.playlist_artist,song:req.session.playlist_link,
           image2: req.session.playlist_image2,image3: req.session.playlist_image3,image4: req.session.playlist_image4,image5: req.session.playlist_image5,image6: req.session.playlist_image6,image7: req.session.playlist_image7,
           album_name2:req.session.playlist_album2,album_name3:req.session.playlist_album3,album_name4:req.session.playlist_album4,album_name5:req.session.playlist_album5,album_name6:req.session.playlist_album6,album_name7:req.session.playlist_album7,
           artist_name2:req.session.playlist_artist2,artist_name3:req.session.playlist_artist3,artist_name4:req.session.playlist_artist4,artist_name5:req.session.playlist_artist5,artist_name6:req.session.playlist_artist6,artist_name7:req.session.playlist_artist7,
           song2:req.session.playlist_link2,song3:req.session.playlist_link3,song4:req.session.playlist_link4,song5:req.session.playlist_link5,song6:req.session.playlist_link6,song7:req.session.playlist_link7

            });
            // req.session.token=access_token;
          }
          else {
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
          }



});


app.get('/track-users', function(req, res) {
      //  res.send(req.session.token)
        //  res.send(req.session.ar_name);
  console.log("********************************************************************")

         console.log(name)
         if(req.session.ar_name) {
          console.log(req.session.ar_name)
        

          res.render('track-users', { timestamp:  req.session.timestamp,progress_ms:req.session.progress_ms,
                                      album_href:req.session.album_href,album_name:req.session.album_name,
                                      artist_name:req.session.artist_name,title:req.session.title,
                                      is_playing:req.session.is_playing

          });
          // req.session.token=access_token;
        }
        else {
          console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        }
});



 app.use(session({
    secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

app.get('/albums', function (req, res) { 
    //res.send(req.session.al_name);
    res.render('albums', {
   image1: req.session.al_image1, al_name1: req.session.al_name1,al_ar_name1:req.session.al_ar_name1,al_label1:req.session.al_label1,
   al_name2: req.session.al_name2,al_name3: req.session.al_name3,al_name4: req.session.al_name4,image2: req.session.al_image4,image3: req.session.al_image4,
   image4: req.session.al_image4,image5: req.session.al_image5,image6: req.session.al_image6,image7: req.session.al_image7,image8: req.session.al_image8,
   image9: req.session.al_image9,al_ar_name2:req.session.al_ar_name2,al_ar_name3:req.session.al_ar_name3,al_ar_name4:req.session.al_ar_name4,
   al_label2:req.session.al_label2,al_label3:req.session.al_label3,al_label4:req.session.al_label4


  });
});





app.use(express.static('public'));



app.set('views','/src/views');// set function to tell express where we have store the views
app.set('view engine','ejs');  //to tell express which template engine you are going to use.



//routing using Router  
    
var signupRouter=require('./src/routes/signupRouter')(navMenu,'savan');  
var loginRouter=require('./src/routes/loginRouter')(navMenu);  
var homeRouter=require('./src/routes/homeRouter')(navMenu);  
var userdetailsRouter=require('./src/routes/userdetailsRouter')(navMenu);  
var albumRouter=require('./src/routes/albumRouter')(navMenu);
var playlistRouter=require('./src/routes/playlistRouter')(navMenu);  
var trackUsersRouter=require('./src/routes/trackUsersRouter')(navMenu);  


 //tell our application which router will be used for each different routes
  
  app.use('/index',homeRouter);  
  app.use('/login',loginRouter);  
  app.use('/signup',signupRouter);  
   app.use('/user-details',userdetailsRouter);  
  app.use('/albums',albumRouter);  
 app.use('/playlist',albumRouter);  
app.use('/track-users',trackUsersRouter);  

