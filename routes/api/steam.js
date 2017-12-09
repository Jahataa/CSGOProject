const express = require('express');
const request = require('request');
const path = require('path').posix;
const url = require('url');
const querystring = require('querystring');
//Read the configuration file
const config = require("../../config.json");

var router = express.Router();

const STEAM_API_URL = "http://api.steampowered.com";
const ACHIEVEMENTS_URL = "/ISteamUserStats/GetPlayerAchievements/v0001/";
const STATS_URL = "/ISteamUserStats/GetUserStatsForGame/v0002/";

function steamApiRequest(req, res, steamResourse) {
    var steamId = req.query.id;
    if (!steamId) {
        req.status(400);
        req.json({
            status: 400
        });
    }
    var apiCallUrl = url.parse(STEAM_API_URL);

    apiCallUrl.pathname = steamResourse;

    apiCallUrl.query = {
        appid: 730,
        key: config.steamApiKey,
        steamid: steamId
    };

    var formattedUrl = url.format(apiCallUrl);
    request(formattedUrl, function (error, steamRes, body) {
        if (error) {
            res.status(503);
            res.json({
                status: 503,
                error: error
            })
        }

        var apiResponse = JSON.parse(body)
        res.json(apiResponse);
    });
}

router.get('/achievements', function (req, res, next) {
    steamApiRequest(req, res, ACHIEVEMENTS_URL);
});

router.get('/stats', function (req, res, next) {
    steamApiRequest(req, res, STATS_URL);
});
// 404 handler
router.use(function (req, res, next) {
    res.status(404);
    res.json({
        status: 404
    });
});

module.exports = router;
