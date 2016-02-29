'use strict';

// Load modules


const Hoek = require('hoek');
const Insync = require('insync');
const Wreck = require('wreck');

// Declare internals

const internals = {};


internals.mlb = require('./mlb.json');
internals.baseUrl = internals.mlb.protocol + '://' + internals.mlb.host + internals.mlb.basepath + '/';


internals.get = function (options, callback) {

    Hoek.assert(callback, 'Callback is required');

    if (!options.path) {
        return callback(new Error('Path is required'));
    }

    const url = internals.baseUrl + options.path + internals.mlb.files[options.which];
    Wreck.get(url, { timeout: 10000, json: true }, (err, response, payload) => {

        return callback(err, payload);
    });
};


internals.getScoreboard = function (options, callback) {

    options = options || {};
    options.which = 'scoreboard';

    return internals.get(options, function (err, result) {

        if (err) {
            return callback(err);
        }

        let games = Hoek.reach(result, 'data.games.game');
        if (games && !games.length) {
            games = [games];
        }

        return callback(null, games);
    });
};


module.exports = internals.Games = function (options) {

    this.options = options;
    this.plays = [];
};


internals.Games.prototype.get = function (callback) {

    const self = this;

    internals.getScoreboard(self.options, (err, scoreboard) => {

        return callback(err, scoreboard);
    });
};
