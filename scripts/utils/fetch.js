define(['jquery'], function($) {
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
    var fetchVideos = function(callback) {
        return fetch(apiVideo, callback);
    };

    // Fn: Method to getch user Data
    var fetchUser = function(callback) {
        return fetch(apiUser, callback);
    };

    exports = {
        videos: fetchVideos,
        user: fetchUser
    };

    return exports;

});