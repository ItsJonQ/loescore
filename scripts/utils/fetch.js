define(['jquery', 'utils/formulas'], function($, formulas) {
    'use strict';

    // Define the export
    var exports;

    // Test JSON
    var apiVideo = 'data/youtube-data.json';
    var apiUser = 'data/youtube-user.json';

    // Fn: Fetch Method via a $.promise
    var fetch = function(url) {

        if(!url) return false;

        var fetchEvent = new $.Deferred();

        $.ajax({
            type: "GET",
            url: url,
            dataType: 'json',
            success: function(data) {

                fetchEvent.resolve(data);

            },
            error: function() {
                fetchEvent.reject('Sorry');
            }
        });

        return fetchEvent.promise();

    };

    // Fn: Method to fetch video Data
    var fetchVideos = function(url) {
        url = url ? url : apiVideo;
        return fetch(url);
    };

    // Fn: Method to getch user Data
    var fetchUser = function(url) {
        url = url ? url : apiUser;
        return fetch(url);
    };

    // Fn:
    var fetchUrlYouTube = function(user) {
        if(!user) return false;

        var videoUrl = 'http://gdata.youtube.com/feeds/api/users/'+user+'/uploads?v=2&alt=json';

        var userUrl = 'http://gdata.youtube.com/feeds/api/users/'+user+'?v=2&alt=json';

        return {
            user: userUrl,
            videos: videoUrl
        };
    };

    // Fn: Method to retrieve view engagement (%) (Private)
    var fetchYouTubeEngagement = function(user, testing) {
        // if(!user) return false;

        var fetchData = fetchUrlYouTube(user);
        var videoUrl = fetchData.videos;
        var userUrl = fetchData.user;

        // Dev: Setting items as undefined to fetch local test data

        if(testing === true) {
            videoUrl = undefined;
            userUrl = undefined;
        }


        var statsObj, views, likes;

        // Fetch the user's info
        $.when(fetchUser(userUrl)).then(function(data) {

            // Defining the sub
            var subs = parseInt(data.entry.yt$statistics.subscriberCount, 10);

            // Fetch the video info
            $.when(fetchVideos(videoUrl)).then(function(data) {

                // Defining the view engagement
                views = formulas.viewAverage(data, subs);

                // Defining the like engagement
                likes = formulas.likeAverage(data, subs);

                // Defining the stats object
                statsObj = {
                    views: views.toFixed(2)+'%',
                    likes: likes.toFixed(2)+'%'
                };

                // TODO: Create a promise and export the statsObj

                // Console logging the stats object
                console.log(statsObj);

            });
        });
    };

    // Fn: Public fetch engagement method
    var fetchEngagementInit = function(user) {
        return fetchYouTubeEngagement(user);
    };

    // Defining the exports
    exports = {
        videos: fetchVideos,
        user: fetchUser,
        engagement: fetchEngagementInit,
        url: {
            youtube: fetchUrlYouTube
        }
    };
    return exports;

});