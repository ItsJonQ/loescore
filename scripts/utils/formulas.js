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

    exports = {
        view: calculateViewEngagement,
        likes: calculateLikeEngagement
    };

    return exports;

});