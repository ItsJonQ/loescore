define(['jquery', 'utils/formulas'], function($, formulas) {
    'use strict';

    // Define the export
    var exports;

    // Test JSON
    var apiVideo = 'data/youtube-data.json';
    var apiUser = 'data/youtube-user.json';

    // Fn: Fetch Method via a $.promise
    var fetch = function(url) {

        var fetchEvent = new $.Deferred();

        var fetchUrl = url ? url : apiVideo;
        $.ajax({
            type: "GET",
            url: fetchUrl,
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

    var fetchViewEngagement = function(user) {
        if(!user) return false;

        var videoUrl = 'http://gdata.youtube.com/feeds/api/users/'+user+'/uploads?v=2&alt=json';
        var userUrl = 'http://gdata.youtube.com/feeds/api/users/'+user+'?v=2&alt=json';

        $.when(fetchUser(userUrl)).then(function(data) {
            var subs = parseInt(data.entry.yt$statistics.subscriberCount, 10);

            $.when(fetchVideos(videoUrl)).then(function(data) {
                var total = formulas.viewAverage(data, subs);
                console.log(total);

            });

        });
    };

    exports = {
        videos: fetchVideos,
        user: fetchUser,
        views: fetchViewEngagement
    };
    return exports;

});