define(function(require) {

    'use strict';

    // Defining the Api object
    var Api = {
        collections: {}
    };

    // Defining the initStatus
    var initStatus = false;

    // Define Required Methods


    // Defining Variables

    var init = function() {

        // Return false if the app has already initiated
        if(initStatus) return false;
        initStatus = true;

        console.log('LoeScore Initialized.');

    };


    Api.init = init;

    // Pushing the Api to the global scope
    window.LoeScore = Api;
    window.Loescore = window.LoeScore;

    return Api;

});