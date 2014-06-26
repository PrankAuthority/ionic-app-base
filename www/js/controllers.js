(function () {
    'use strict';
    angular.module('pa.controllers', [])
        .controller('AppCtrl', ['$scope', 'VideoSvc', function ($scope, VideoSvc) {
            $scope.categories = VideoSvc.getCategories();
        }])
        .controller('CategoryCtrl', ['$scope', '$stateParams', 'VideoSvc', function ($scope, $stateParams, VideoSvc) {
            var catRef = VideoSvc.getCategory($stateParams.categoryId);
            catRef.$on("value", function (dataSnapshot) {
            });
            $scope.category = catRef;

        }])
        .controller('VideoCtrl', ['$scope', '$stateParams', 'VideoSvc', function ($scope, $stateParams, VideoSvc) {
            $scope.videoInfo = VideoSvc.getVideoInfo($stateParams.videoId);
        }])
        .controller('DashboardCtrl', function ($scope, $stateParams) {
        });
})();