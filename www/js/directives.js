(function () {
    'use strict';
    angular.module('pa.directives', [])
    .directive('myYoutube', function ($sce) {
        return {
            restrict: 'EA',
            scope: { code: '=' },
            replace: true,
            template: '<iframe width="100%" height="215" src="{{url}}" frameborder="0" allowfullscreen></iframe>',
            link: function (scope) {
                console.log('here');
                scope.$watch('code', function (newVal) {
                    if (newVal) {
                        scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal + "?rel=0&amp;controls=0&amp;showinfo=0");
                    }
                });
            }
        };
    });
})();