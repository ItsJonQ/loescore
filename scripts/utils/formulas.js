define(function() {

    'use strict';

    var exports;

    // Fn: Calculating the engagement of Views
    var calculateViewEngagement = function(views, subs) {

        // Return false if views or subs is not defined
        if(!views || !subs) return false;

        // Return false if views or subs are not numbers
        if(typeof views !== 'number' || typeof subs !== 'number') return false;

        // Returning the (percentage) result
        return (views / subs) * 100;

    };

    // Fn: Calculating the engagement of "Likes" / "Dislikes"
    var calculateLikeEngagement = function(likes, dislikes, views) {

        // Return false if arguments are not defined
        if(!likes || !dislikes || !views) return false;

        // Return false if arguments are not numbers
        if(typeof likes !== 'number' || typeof dislikes !== 'number' || typeof views !== 'number') return false;

        // Returning the (percentage) result
        return ((likes + dislikes) / views) * 100;

    };

    // Fn: Calculating the YouTube Stat Totals
    var calcYouTubeTotals = function(data, subs) {

        // TODO: Make this method NOT dependant on subs to get likes only

        // Return false if data or subs is not defined
        if(!data || !subs) return false;

        // Defining the vars
        var stats = [];
        var entries = data.feed.entry;
        var entriesLen = entries.length;
        var len = 10;

        // Adjust the len/threshold if entry length is less than 10
        if(entriesLen < len) {
            len = entriesLen;
        }

        // Loop through the entries based on threshold
        for (var i = 0; i < len; i++) {

            // Defining the entry
            var entry = data.feed.entry[i];

            // Skip video in loop if stats is not defined
            if(!entry.yt$statistics) continue;

            // Defining the stats
            var views = parseInt(entry.yt$statistics.viewCount, 10);

            // Skip video in loop if ratings is not defined
            if(!entry.yt$rating) continue;

            var likes = parseInt(entry.yt$rating.numLikes, 10);
            var dislikes = parseInt(entry.yt$rating.numDislikes, 10);

            // Pushing the calculated view into the cached array
            stats.push({
                view: calculateViewEngagement(views, subs),
                likes: calculateLikeEngagement(likes, dislikes, views)
            });
        }

        // Returning the total stats array
        return stats;
    };


    // Fn: Calculating the average video stats
    var calcVideoAverage = function(type, data, subs) {
        // Return false if data or subs is not defined
        if(!data || !subs || !type) return false;

        // Define the videos by using the caclViewTotals method
        var videos = calcYouTubeTotals(data, subs);

        // Defining the vars for the loop
        var videoStatsSum = 0;
        var videoStatsLength = videos.length;

        // Looping through the videos array
        for (var x = 0; x < videos.length; x++) {
            // Adding the view percentage to the statsSum
            var video = videos[x];
            videoStatsSum += video[type];
        }

        // Returning the average
        return videoStatsSum / videoStatsLength;
    };

    // Fn: Calcuating View Average
    var calcViewAverage = function(data, subs) {
        return calcVideoAverage('view', data, subs);
    };

    // Fn: Calculating the Like Average of videos
    var calcLikeAverage = function(data, subs) {
        return calcVideoAverage('likes', data, subs);
    };

    // Exporting the formula object
    exports = {
        view: calculateViewEngagement,
        likes: calculateLikeEngagement,
        statsTotal: calcYouTubeTotals,
        viewAverage: calcViewAverage,
        likeAverage: calcLikeAverage
    };

    return exports;

});