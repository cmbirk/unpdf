var imports = [
  'unPDF.controllers',
  'unPDF.directives',
  'unPDF.filters',
  'angular-growl',
  'ngFileUpload'
];

var app = angular.module('unPDF', imports);

// app.config(['growlProvider',
//   function (growlProvider) {
//     growlProvider.globalTimeToLive(5000);
//   }]);