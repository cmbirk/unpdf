angular.module('unPDF.directives', [])
  .directive('downloadLink', function ($compile) {
    return {
      restrict: 'A',
      scope: {
        getUrlData: '&getData',
        file: '@file'
      },
      link: function (scope, elm, attrs) {
        scope.file = scope.file.replace('.pdf', '.txt');
        console.log(scope.file);
        //TODO: Strip .pdf extension and append .txt extension.
        var url = URL.createObjectURL(scope.getUrlData());

        elm.append($compile(
          '<a class="btn" download="' + scope.file + '"' +
            'href="' + url + '">' +
            'Download' +
            '</a>'
        )(scope));
      }
    };
  });