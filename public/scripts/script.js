console.log('script.js is sourced');

var myApp=angular.module('myApp', []);

// app.factory('myService', function() {
//  var savedData = {};
//  function set(data) {
//    savedData = data; }
//  function get() {
//   return savedData;
//  }
//  return {
//   set: set,
//   get: get
// };
// });
// myService.set(yourSharedData);   //put into questionnaire controller
// $scope.desiredLocation = myService.get(); // put into results controller
// Remember to inject myService in the controllers by passing it as a parameter.

myApp.factory('DataService', function() {
    var choices = {};
    function set(data) {
      choices=data;
    } // end function set data
    function get() {
      return choices;
    } // end function get
    return {
      set: set,
      get: get
    }; // end return
  }); // end factory

myApp.controller('productController', ['$scope', '$http', 'DataService', function($scope, $http, DataService) {

  DataService.set(yourSharedData);

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

}]); // end myApp controller
