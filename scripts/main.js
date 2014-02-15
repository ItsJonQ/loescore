(function() {

    'use strict';

    // Defining the config for RequireJS
    require.config({

        paths: {
            jquery: ['../bower_components/jquery/jquery'],
            underscore: ['../bower_components/underscore/underscore'],
            backbone: ['../bower_components/backbone/backbone'],
            bootstrap: ['../bower_components/bootstrap/dist/js/bootstrap'],
            rsvp: ['../bower_components/rsvp/rsvp']
        },

        shim: {
            'backbone': {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            },
            'underscore': {
                exports: '_'
            },
            'jquery': {
                exports: '$'
            },
            'bootstrap': {
                deps: ['jquery'],
            },
            'rsvp': {
                exports: 'RSVP'
            },
        }

    });

    require(['jquery', 'underscore', 'backbone', 'rsvp', 'app', 'bootstrap'], function($, _, Backbone, RSVP, App) {

        // Initializing the App
        App.init();

    });

})();