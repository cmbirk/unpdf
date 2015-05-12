
angular.module('unPDF.filters', [])
  .filter('fileName', function () {
    return function (files) {
      var names = [];

      if (files) {
        angular.forEach(files, function (file) {
          names.push(file.name);
        });

        return names;
      }
    };
  });