console.log('script.js is sourced');

var myApp=angular.module('myApp', []);

myApp.controller('productController', ['$scope', '$http', function($scope, $http) {

  var disinfList=[]; // creates array of disinfectant results
  $scope.disinfectantList=[];
  $scope.choices=[];
  var objectToSend={};

  $scope.selectProducts = function() { // pulls criteria values from questionnaire
      event.preventDefault();
      objectToSend ={  // package inputs into object to send
        areas: $scope.places,  // reference these in questionnaire.html
        surfaces: $scope.surfaces,
        pathogens: $scope.pathogens,
        format: $scope.format
        }; // end object
        console.log("in scripts select about to run savechoices");
        $scope.saveChoices(); // calls saveChoices function to send choices to choices table in database for use on results page
      $http({  // sends object via POST to select products to return
        method: 'POST',
        url: '/select',
        data: objectToSend
      });
    var path="/results";  // sends user to results page on click
    window.location.href=path;
  }; // end selectProduct function

  $scope.saveChoices = function() { // pulls choice values from questionnaire
    event.preventDefault();
    $http({  // sends object via POST to capture choice values to display on results page
      method: 'POST',
      url: '/choices',
      data: objectToSend
    }); // end post call
  }; // end saveChoices function

  $scope.resultsInit = function() { // ng-init function for results page which calls both getProducts and getChoices functions
    $scope.getProducts();
    $scope.getChoices();
  }; //end resultsInit function

  $scope.getProducts = function() { // gets all products for results page
    console.log("in getProducts function in script");
    event.preventDefault();
    $http({   // gets recordset via GET
      method: 'GET',
      url: '/list',
    }).then( function(response){  // success call - runs function with response parameter
    // console.log(response.data);
      disinfList = response.data;  // pulls the data from app.js and sets to global var disinfList
      $scope.disinfectantList= disinfList.slice(0, 3); // slices top 3 products and sends to DOM
      console.log($scope.disinfectantList);
    }, function myError(response){
      console.log(response.statusText);
    }// end error function
    ); // end then response
  }; // end getProducts function

  $scope.viewAllMatches = function() { // gets entire product array list to return to results page
    console.log("in viewAllMatches function in script");
      $scope.disinfectantList= disinfList;
      console.log($scope.disinfectantList);
  }; // end viewAllMatches function

  $scope.getChoices = function() {  // get choices for display on results page
    event.preventDefault();
    $http({   // gets recordset via GET
      method: 'GET',
      url: '/choicelist',
    }).then( function(response){  // success call - runs function with response parameter
    $scope.choices = response.data;  // pulls the data from app.js and sets to choices
    console.log("log from get choices function in script: ", $scope.choices);
  }, function myError(response){
    console.log(response.statusText);
    }// end error function
  ); // end then response
}; // end getChoices function

$scope.downloadPDF = function() {   // Export results to PDF using html2canvas and pdfmake
  html2canvas(document.getElementById('exportPDF'), {
    onrendered: function(canvas) {
      var data=canvas.toDataURL();
      var docDef={
        content: [{
          image: data,
          width: 500,
        }]
      };
      pdfMake.createPdf(docDef).download('MyDisinfectantSelections.pdf');  // download the PDF
    } // end making pdf out of rendered canvas image
  }); //end html2canvas export function
}; // end downloadPDF function


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

  $scope.sendProducts = function() {
      event.preventDefault();
      var objectToSend ={  // package inputs into object to send
        productname: $scope.everySearch.productname,  // reference these in questionnaire.html
        manufacturer: $scope.everySearch.manufacturer,
        eparegno: $scope.everySearch.eparegno
        }; // end object
      $http({  // sends object via POST
        method: 'POST',
        url: '/sendToDb',
        data: objectToSend
      }); // end post call
  }; // end sendProducts function
//end API CODE

}]); // end myApp Product controller

//MODAL CODE
myApp.directive('modalDialog', function() { //
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true,
    transclude: true,
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>" // See below
  };
}); // end app.directive

myApp.controller('MyCtrl', function($scope) {
  $scope.modalShown = false;
  $scope.toggleModal = function() {
    $scope.modalShown = !$scope.modalShown;
  };
});
//end Modal Code

//Swiper Carousel code
$(document).ready(function () {     //initialize swiper when document ready
    var mySwiper = new Swiper ('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      nextButton: '.swiper-button-next',
      prevButton: '.swiper-button-prev',
      spaceBetween: 0,
      direction: 'horizontal',
      loop: true
    });
  });
//End Swiper Carousel Code
