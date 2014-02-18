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

    // Fn: Calculating the View Totals
    var calcViewTotals = function(data, subs) {

        // Return false if data or subs is not defined
        if(!data || !subs) return false;

        // Defining the vars
        var arr = [];
        var entries = data.feed.entry;
        var entriesLen = entries.length;
        var len = 10;

        // Adjust the len/threshold if entry length is less than 10
        if(entriesLen < len) {
            len = entriesLen;
        }

        // Loop through the entries based on threshold
        for (var i = 0; i < len; i++) {

            // Defining the entry and views
            var entry = data.feed.entry[i];
            var views = parseInt(entry.yt$statistics.viewCount, 10);

            // Pushing the calculated view into the cached array
            arr.push(calculateViewEngagement(views, subs));
        }

        // Returning the view total array
        return arr;
    };

    // Fn: Calcuating View Average
    var calcViewAverage = function(data, subs) {

        // Return false if data or subs is not defined
        if(!data || !subs) return false;

        // Define the videos by using the caclViewTotals method
        var videos = calcViewTotals(data, subs);

        // Defining the vars for the loop
        var videoStatsSum = 0;
        var videoStatsLength = videos.length;

        // Looping through the videos array
        for (var x = 0; x < videos.length; x++) {
            // Adding the view percentage to the statsSum
            videoStatsSum += videos[x];
        }

        // Returning the average
        return videoStatsSum / videoStatsLength;
    };


    // Exporting the formula object
    exports = {
        view: calculateViewEngagement,
        likes: calculateLikeEngagement,
        viewTotal: calcViewTotals,
        viewAverage: calcViewAverage
    };

    return exports;

});