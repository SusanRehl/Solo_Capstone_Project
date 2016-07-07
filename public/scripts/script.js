console.log('script.js is sourced');

var myApp=angular.module('myApp', []);

var disinfectantList=[]; // creates array of disinfectant results

myApp.controller('productController', ['$scope', '$http', function($scope, $http) {
  $scope.getProducts = function() {
      console.log("clicked submit button");
      $http({   // gets recordset via GET
        method: 'GET',
        url: '/list',
      }).then( function( response ){  // success call - runs function with response parameter
        // console.log(response);
        $scope.disinfectantList = response.data;  // pulls the data from app.js and sets to disinfectantList
      }, function myError( response ){
        console.log( response.statusText );
      }); // end error function
  }; // end getProducts function
}]);
