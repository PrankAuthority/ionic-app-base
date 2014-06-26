(function () {
    'use strict';


    angular.module('pa.services', [])
        .factory('VideoSvc', ['$firebase', '$http', services]);

    function services($firebase, $http) {
        // Define the functions and properties to reveal.
        var service = {
            getCategories: getCategories,
            getCategory: getCategory,
            getVideoInfo: getVideoInfo
        };

        return service;

        function getCategories() {
            var ref = new Firebase("https://prank-authority.firebaseio.com/categories");
            return $firebase(ref);
        }

        function getCategory(categoryId) {
            var ref = new Firebase("https://prank-authority.firebaseio.com/categories/" + categoryId);
            ref.on('value', function (dataSnapshot) {
                angular.forEach(dataSnapshot.val().videos, function (video, key) {
                    if (!video.data) {
                        $http({ method: 'GET', url: 'http://gdata.youtube.com/feeds/api/videos/' + video.id + '?v=2&alt=json' })
                            .success(function (data, status, headers, config) {
                                var thumbnails = {};
                                angular.forEach(data.entry.media$group.media$thumbnail, function(thumb) {
                                    thumbnails[thumb.yt$name] = {
                                        height: thumb.height,
                                        //time: thumb.time,
                                        url: thumb.url,
                                        width: thumb.width
                                    };
                                });

                                var videoRef = ref.child('videos/' + key).update({
                                    data: {
                                        author: data.entry.author[0].name.$t,
                                        published: data.entry.published.$t,
                                        title: data.entry.title.$t,
                                        thumbnail: thumbnails,
                                        duration: data.entry.media$group.yt$duration.seconds,
                                        rating: {
                                            average: data.entry.gd$rating.average,
                                            numRaters: data.entry.gd$rating.numRaters,
                                            numDislikes: data.entry.yt$rating.numDislikes,
                                            numLikes: data.entry.yt$rating.numLikes,
                                        },
                                        statistics: data.entry.yt$statistics
                                    }
                                });

                                //videoRef.child('videos/' + key).update({

                                //});
                            })
                            .error(function (data, status, headers, config) {
                                // called asynchronously if an error occurs
                                // or server returns response with an error status.
                            });
                    }
                });
            });
            return $firebase(ref);
        }
        function getVideoInfo(videoId) {

            var result;
            $http({ method: 'GET', url: 'http://gdata.youtube.com/feeds/api/videos/' + videoId + '?alt=json' })
                .success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                })
                .error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            return result;
        }

        //#region Internal Methods        

        //#endregion
    }
})();