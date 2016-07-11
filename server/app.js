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

app.get( '/inputapi', function( req, res ){  // makes inputapi.html available
  res.sendFile( path.resolve( 'views/inputapi.html' ) );
  });

var selectedProducts;
var choices;
var products;
var rows;

app.post('/select', urlencodedParser, function(req, res) { // pulling selected disinfectants from database
    console.log("in app.post select disinfectants");
    selectedProducts = [];  // resets array to empty to hold products
    pg.connect(connectionString, function(err, client, done) {  // connecting to disinfectants database
      if (err) {     // check for errors
      console.log(err);
    } else { // start selection criteria
        if (req.body.format==="No Preference") { // returns products of all formats which meet the criteria below
          console.log('no preference');
        } else { // includes format in the query
            switch(req.body.pathogens) {
              case "Basic bacteria and viruses":
                products=client.query("SELECT * FROM products WHERE surfaces= '" + req.body.surfaces + "' AND format= '" + req.body.format + "' AND noroclaim=FALSE AND cdiffclaim=FALSE");  // getting products from products table
                rows = 0;
                products.on('row', function(row) {  // pushing to array
                  selectedProducts.push(row);
                });  // end query push
                products.on('end', function() {  // sending to scripts
                  console.log("bac and vir products from app.post in app");
                  console.log(selectedProducts);
                  return res.json(selectedProducts);
                }); // end products.on function
              break; // end case bacteria and viruses
              case "Norovirus etc.":
                products=client.query("SELECT * FROM products WHERE surfaces= '" + req.body.surfaces + "' AND format= '" + req.body.format + "' AND noroclaim=TRUE AND cdiffclaim=FALSE");  // getting products from products table
                rows = 0;
                products.on('row', function(row) {  // pushing to array
                  selectedProducts.push(row);
                });  // end query push
                products.on('end', function() {  // sending to scripts
                  console.log("Noro products from app.post in app");
                  console.log(selectedProducts);
                  return res.json(selectedProducts);
                }); // end products.on function
                break; // end case norovirus and enveloped viruses
              case "C difficile":
                products=client.query("SELECT * FROM products WHERE surfaces= '" + req.body.surfaces + "' AND format= '" + req.body.format + "' AND cdiffclaim=TRUE");  // getting products from products table
                rows = 0;
                products.on('row', function(row) {  // pushing to array
                  selectedProducts.push(row);
                });  // end query push
                products.on('end', function() {  // sending to scripts
                  console.log("C diff products from app.post in app");
                  console.log(selectedProducts);
                  return res.json(selectedProducts);
                }); // end products.on function
                break; // end case C difficile
              case "Fungi":
                products=client.query("SELECT * FROM products WHERE surfaces= '" + req.body.surfaces + "' AND format= '" + req.body.format + "' AND fungiclaim=TRUE");  // getting products from products table
                rows = 0;
                products.on('row', function(row) {  // pushing to array
                  selectedProducts.push(row);
                });  // end query push
                products.on('end', function() {  // sending to scripts
                  console.log("Fungi products from app.post in app");
                  console.log(selectedProducts);
                  return res.json(selectedProducts);
                }); // end products.on function
                break; // end case Fungi
            } // end switch
        } //end else
        // var products=client.query("SELECT * FROM products WHERE areas= '" + req.body.areas + "'");  // getting products from products table
        // var rows = 0;
        // products.on('row', function(row) {  // pushing to array
        //   selectedProducts.push(row);
        // });  // end query push
        // products.on('end', function() {  // sending to scripts
        //   // console.log("Here are the selected products from app.post in app");
        //   // console.log(selectedProducts);
        //   return res.json(selectedProducts);
        // }); // end products.on function
      done(); // signals done
    } // end else
  }); // end pg connect function
}); // end app.post /select function

app.post('/choices', urlencodedParser, function(req, res) { // sending choices to choices table for displaying on results page
    console.log("in app.post choices");
    pg.connect(connectionString, function(err, client, done) {  // connecting to disinfectants database
      if (err) {     // check for errors
      console.log(err);
    } else {
        choices=client.query("INSERT INTO choices(areas, surfaces, pathogens, format) VALUES($1, $2, $3, $4)", [req.body.areas, req.body.surfaces, req.body.pathogens, req.body.format]);  // inserting choice values into choices table
        console.log(choices);
          return res.json(choices);
    } // end else
  }); // end pg connect function
}); // end app.post /choices function

app.get( '/list', function( req, res ){  // makes returned list of products available to results.html
      return res.json(selectedProducts);
  }); // end /list GET function

app.get( '/choicelist', function( req, res ){  // makes choices available to results.html
      console.log("sending back from choicelist from app");
      return res.json(choices);
  }); // end /choicelist GET function


// API code
app.post('/sendToDb', urlencodedParser, function(req, res) { // sends API data to disinfectants database
    console.log("in app.post input epa api info");
    productsToInput = [];  // array to hold products
    pg.connect(connectionString, function(err, client, done) {  // connecting to disinfectants database
      if (err) {     // check for errors
      console.log(err);
    } else {
        var products=client.query("INSERT INTO products(productname, manufacturer, eparegno) VALUES($1, $2, $3)", [req.body.productname, req.body.manufacturer, req.body.eparegno]);  // send data to database
        products.on('row', function(row) {  // pushing to array
          productsToInput.push(row);
        });  // end query push
        products.on('end', function() {  // sending to scripts
          console.log("ePA API info to input from app.post in app");
          console.log(productsToInput);
          return res.json(productsToInput);
        }); // end products.on function
      done(); // signals done
    } // end else
  }); // end pg connect function
}); // end app.post /sendToDb function

app.set("port", (process.env.PORT || 8080));

app.listen(app.get("port"), function(){
    console.log("Listening on port: ", app.get("port"));
});
app.use(express.static('public'));
