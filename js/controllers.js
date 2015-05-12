angular.module('unPDF.controllers', []);

angular.module('unPDF.controllers')
  .controller('AppController', function ($scope) {
    console.log("this is the app controller");
  })
  .controller('MainController', function ($scope, Upload, growl) {
    function displayProgress(event) {
      var progressPercentage = parseInt(100.0 * event.loaded / event.total, 10);
      console.log('progress' + progressPercentage + '% ' + event.config.file.name);
    }

    function onSuccess(data, status, headers, config) {
      console.log('file ' + config.file.name + ' uploaded.  Response: ' + data);
    }

    $scope.upload = function (files) {
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
  });