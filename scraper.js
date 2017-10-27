#!/usr/bin/env node
'use strict';
const request = require('sync-request');
const fs = require('fs');

const args = process.argv.slice(2);
const address = 'http://gipod.api.agiv.be/ws/v1/';
const output = '/home/xivk/work/anyways/gipod-to-geojson/output/';

var workassignmentsUrl = address + '/workassignment?limit=1000000';
var res = request('GET', workassignmentsUrl);
var assignments = JSON.parse(res.getBody('utf8'));

(assignments).forEach(function(assignment) {
    console.log("Downloading details for " + assignment.gipodId);

    res = request('GET', assignment.detail);
    var details = res.getBody('utf8');

    var file = output + assignment.gipodId + ".json";
    fs.writeFileSync(file, details);
}, this);