console.log('script.js is sourced');

var myApp=angular.module('myApp', []);

myApp.controller('productController', ['$scope', '$http', function($scope, $http) {

  $scope.disinfectantList=[]; // creates array of disinfectant results

  $scope.selectProducts = function() {
      event.preventDefault();
      var objectToSend ={  // package inputs into object to send
        areas: $scope.places,  // reference these in questionnaire.html
        surfaces: $scope.surfaces,
        pathogens: $scope.pathogens,
        format: $scope.format
        }; // end object
      $http({  // sends object via POST
        method: 'POST',
        url: '/select',
        data: objectToSend
      }); // end post call
    var path="/results";  // sends user to results page on click
    window.location.href=path;
  }; // end selectProduct function

    $scope.getProducts = function() {
      $http({   // gets recordset via GET
        method: 'GET',
        url: '/list',
      }).then( function(response){  // success call - runs function with response parameter
      // console.log(response.data);
      $scope.disinfectantList = response.data;  // pulls the data from app.js and sets to disinfectantList
      // console.log("log from select function in script:");
      // console.log($scope.disinfectantList);
    }, function myError(response){
      console.log(response.statusText);
      }// end error function
    ); // end then response
  }; // end getProducts function

// API CODE
  $scope.everySearch=[]; // gets disinfectants from EPA's API

  $scope.productSearch = function(){
    console.log('in productSearch: ' + $scope.numberIn);

    var apiURL = 'https://ofmpub.epa.gov/apex/pesticides/ppls/' + $scope.numberIn; // assemble API URL
    console.log("apiURL: " + apiURL);

    $http({   //  http call to the API url
      method: 'GET',
      url: apiURL
    }).then(function(response){ //end http get, start function
      console.log('response.data.items ', response.data.items[0] );       // log the response from the http call
      var thisProduct = response.data.items[0];
      var productObject={
        eparegno: thisProduct.eparegno,
        productname: thisProduct.productname,
        manufacturer: thisProduct.companyinfo[0].name
      }; // end object
      console.log(productObject);
      $scope.everySearch.push(productObject); // push API data into array
      console.log('productObject: ' + productObject.eparegno + " " + productObject.productname + productObject.manufacturer);
      console.log('everySearch: ' + $scope.everySearch);
    }); // end then
    $scope.numberIn='';    // clear input field
  }; // end productSearch function
//end API CODE

}]); // end myApp controller
