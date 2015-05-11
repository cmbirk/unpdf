var imports = [
  'unPDF.controllers',
  'angular-growl',
  'angularFileUpload'
];

var app = angular.module('unPDF', imports);

app.config(['growlProvider',
  function (growlProvider) {
    growlProvider.globalTimeToLive(5000);
  }]);