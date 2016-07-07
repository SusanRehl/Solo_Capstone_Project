var express=require('express');  // sets up express
var app=express();
var path=require('path');  // sets up paths
var bodyParser=require('body-parser');  // sets up body-parser for POST method (for admin user feature stretch goal)
var urlencodedParser=bodyParser.urlencoded( {extended: false} );
var pg=require('pg');  // sets up postgres database
var connectionString='postgres://localhost:5432/disinfectants';

app.use( bodyParser.json() );

app.get('/', function(req, res) {  //makes home page available
  res.sendFile(path.resolve('views/index.html'));
});

app.get( '/questionnaire', function( req, res ){  // makes questionnaire.html available
  res.sendFile( path.resolve( 'views/questionnaire.html' ) );
  });

app.get( '/results', function( req, res ){  // makes results.html available
  res.sendFile( path.resolve( 'views/results.html' ) );
  });

app.get('/list', function(req, res) { // displaying to do list - uses GET
    console.log("in app.get get disinfectants list");
    var results = [];  // array to hold tasks
    pg.connect(connectionString, function(err, client, done) {  // connecting to todolist database
      if (err) {     // check for errors
      consle.log(err);
    } else {
        var products=client.query('SELECT * FROM products ORDER BY productname;');  // getting products from products table
        console.log('query '+ products);
        var rows = 0;
        products.on('row', function(row) {  // pushing to array
          results.push(row);
        });  // end query push
        products.on('end', function() {  // sending to scripts
          return res.json(results);
        }); // end products.on function
      done(); // signals done
    } // end else
  }); // end pg connect function
}); // end app.get /getlist function

app.listen(8080, 'localhost', function(req, res) {
  console.log('listening on 8080');
});

app.use(express.static('public'));
