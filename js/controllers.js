angular.module('unPDF.controllers', []);

angular.module('unPDF.controllers')
  .controller('AppController', function ($scope) {
    console.log("this is the app controller");
  })
  .controller('MainController', function ($scope, Upload, growl) {
    $scope.downloads = [];

    function displayProgress(event) {
      var progressPercentage = parseInt(100.0 * event.loaded / event.total, 10);

      console.log('upload progress ' + progressPercentage);
    }

    function onSuccess(data, status, headers, config) {
      $scope.downloads = [{name: $scope.files[0].name, text: data}];
      $scope.files = [];
    }

    $scope.upload = function (files) {
      $scope.files = files;
      var i, file;

      if (files && files.length) {
        for (i = 0; i < files.length; i++) {
          file = files[i];

          Upload.upload({
            url: '/api',
            file: file
          })
            .progress(displayProgress)
            .success(onSuccess);
        }
      }
    };

    $scope.getBlob = function (text) {
      return new Blob([text], {type: "text/plain"});
    };
  });