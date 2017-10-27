#!/usr/bin/env node
'use strict';
const request = require('sync-request');
const fs = require('fs');

const output = '/home/xivk/work/anyways/source-gipod/output/';

var features = [];
var geojson = {
    type: 'FeatureCollection',
    features: []
  };
fs.readdir(output, (err, files) => {
    files.forEach(file => {
        if (file.endsWith(".json")) {
            var details = JSON.parse(fs.readFileSync(output + file));
            console.log("Building geojson for " + details.gipodId);

            if (details.location &&
                details.location.geometry) {
                var feat = {
                    geometry: details.location.geometry,
                    type: 'Feature',
                    properties: {
                        description :details.description,
                        state: details.state,
                        startDateTime: details.startDateTime,
                        endDateTime: details.endDateTime,
                        type: details.type,
                        contractor: details.contractor,
                        mainContractor: details.mainContractor,
                        gipodId: details.gipodId,
                        owner: details.owner,
                        reference: details.reference,
                        comment: details.comment,
                        latestUpdate: details.latestUpdate
                    }
                };
                features.push(feat);
        
                var localFeature = {
                    type: 'FeatureCollection',
                    features: [
                        feat
                    ]
                };
        
                var geoJsonFile = output + details.gipodId + ".geojson";
                fs.writeFileSync(geoJsonFile, JSON.stringify(localFeature));
            }
        }
    });

    geojson.features = features;
    fs.writeFileSync(output + "all.geojson", JSON.stringify(geojson));
  });
