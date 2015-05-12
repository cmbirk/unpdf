angular.module('unPDF.directives', [])
  .directive('downloadLink', function ($compile) {
    return {
      restrict: 'A',
      scope: {
        getUrlData: '&getData'
      },
      link: function (scope, elm, attrs) {
        var url = URL.createObjectURL(scope.getUrlData());

        elm.append($compile(
          '<a class="btn" download="out.txt"' +
            'href="' + url + '">' +
            'Download' +
            '</a>'
        )(scope));
      }
    };
  });