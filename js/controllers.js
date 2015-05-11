angular.module('unPDF.controllers', []);

angular.module('unPDF.controllers')
  .controller('AppController', function ($scope) {

  })
  .controller('MainController', function ($scope, $upload, growl) {
    $scope.onFileSelect = function ($files, $event) {
      $scope.input = $event.target;

      angular.forEach($files, function (file) {
        $scope.upload = $upload.upload({
          url: 'api',
          file: file
        }).progress(function (event) {
          //console.log('percent: ' + parseInt(100.0 * event.loaded / event.total));
        }).success(function (data) {
          //Download new text file
        }).error(function (data) {
          if (data.messages) {
            angular.forEach(data.messages,
              function (message) {
                growl.addErrorMessage(message.text);
                $scope.errors.push({'text': message.text, 'file': file.name});
              });
          } else {
            growl.addErrorMessage("Unknown error.  Check console for details.");
          }

          console.error(data);
        });
      });
    };
  });