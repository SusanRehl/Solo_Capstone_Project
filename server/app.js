var express=require('express');  // sets up express
var app=express();
var path=require('path');  // sets up paths
var bodyParser=require('body-parser');  // sets up body-parser for POST method (for admin user feature stretch goal)
var urlencodedParser=bodyParser.urlencoded( {extended: false} );
var pg=require('pg');  // sets up postgres database
var connectionString='postgres://localhost:5432/disinfectants';

app.use(bodyParser.json());

app.get('/', function(req, res) {  //makes home page available
  res.sendFile(path.resolve('views/index.html'));
});

app.get( '/questionnaire', function( req, res ){  // makes questionnaire.html available
  res.sendFile( path.resolve( 'views/questionnaire.html' ) );
  });

app.get( '/results', function( req, res ){  // makes results.html available
  res.sendFile( path.resolve( 'views/results.html' ) );
  });

var selectedProducts;

app.post('/select', urlencodedParser, function(req, res) { // displaying to do list - uses GET
    console.log("in app.post select disinfectants");
    selectedProducts = [];  // array to hold tasks
    pg.connect(connectionString, function(err, client, done) {  // connecting to todolist database
      if (err) {     // check for errors
      console.log(err);
    } else {
        var products=client.query("SELECT * FROM products WHERE areas= '" + req.body.areas + "'");  // getting products from products table
        var rows = 0;
        products.on('row', function(row) {  // pushing to array
          selectedProducts.push(row);
        });  // end query push
        products.on('end', function() {  // sending to scripts
          console.log("Here are the selected products from app.post in app");
          console.log(selectedProducts);
          return res.json(selectedProducts);
        }); // end products.on function
      done(); // signals done
    } // end else
  }); // end pg connect function
}); // end app.post /list function

app.get( '/list', function( req, res ){  // makes returned list of products available to results.html
      return res.json(selectedProducts);
  }); // end /list GET function

app.listen(8080, 'localhost', function(req, res) {
  console.log('listening on 8080');
});  // end app.listen

app.set("port", (process.env.PORT || 8080));

app.listen(app.get("port"), function(){
    console.log("Listening on port: ", app.get("port"));
});
app.use(express.static('public'));
