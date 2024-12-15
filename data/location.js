import {ObjectId} from 'mongodb';
import {users} from "../config/mongoCollections.js";
import axios from 'axios'
import * as validation from '../utilities/validation.js';
import {usersData} from '../data/index.js';

const exportedMethods = {
    /* Function to API request Trimble for location data.
        Takes in an address and returns an object for further parsing.
        Please do not use until showcase. Limited number of API requests. 
        For testing Geoservices, use the locations in test.js 
    */

    async geocodeAddress(address){
        address = validation.validateString(address);

        const apiKey = 'F0B72CEE61C5594EB0ABF37B0F04A870';
        const region = 'NA';
        const url = `https://singlesearch.alk.com/${region}/api/search`;
    
        let response = await axios.get(url, {
            params: {
                authToken: apiKey,
                query: address,
                maxResults: 1,
            }
        });

        let locationData = response.data.Locations[0]
        if (!locationData) throw `Trimble Geocoding Error.`

        return locationData;
    },


    /* Takes the locationData returned from geocodeAddress and makes it MongoDB friendly */
    async makeGeoJSON(locationData){
        if (!locationData.Coords){
            throw `Error: Location could not be found.`
        }
        const location = {
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [
                    parseFloat(locationData.Coords.Lon),
                    parseFloat(locationData.Coords.Lat),
                ]
            },
            properties: {
                Address: locationData.Address,
                Region: locationData.Region,
                POITypeID: locationData.POITypeID,
                PersistentPOIID: locationData.PersistentPOIID,
                SiteID: locationData.SiteID,
                ResultType: locationData.ResultType,
                ShortString: locationData.ShortString,
                TimeZone: locationData.TimeZone
            } 
        };
        return location;
    },

    async updateLocation(id, location){
        let updateObj = {};
        updateObj.location = location;
        // Use the usersData function to update the location object
        let updateInfo = await usersData.updateUser(id, updateObj);

        return updateInfo;
    },

    /* Returns array of users within distance(miles) from user.*/
    async nearbyUsers(id, distance){
        id = validation.validateObjectID(id);
        distance = validation.validateFloat(distance);

        const usersCollection = await users();
        await usersCollection.createIndex({'location.geometry': '2dsphere'});
        const user = await usersCollection.findOne(
            {_id: id}
        );
        // Edgecase checking
        if (!user) throw `Error: User id ${id} not found.`;
        if (!userLocation || !user.location.geometry) throw `Error: User ${user.username} has not provided location.`;

        const userLocation = user.location.geometry;
        const distMeters = distance * 1609.34 //Convert Miles to Meters

        // Uses the loc geo index to find users within given radius. Returns array
        const nearbyUsers = await usersCollection.find(
            {_id: {$ne: id}, 'location.geometry': {
                $near: {$geometry: userLocation, $maxDistance: distMeters}
            }}, {projection: {hashedPassword: 0}}
        ).toArray();

        return nearbyUsers;
    },

    /* Returns a dummy location */
    defaultLocation(){
        const defaultLoc = {
            type: "Feature", // Declares this as a GeoJSON Feature object
            geometry: {
                type: "Point", // Specifies the geometry type (Point)
                coordinates: [-74.025923, 40.745684] // Longitude first, then latitude
            },
            properties: {
                Address: {
                    StreetAddress: "1 Castle Point Ter",
                    LocalArea: "",
                    City: "Hoboken",
                    State: "NJ",
                    StateName: "New Jersey",
                    Zip: "07030-5906",
                    County: "Hudson",
                    Country: "US",
                    CountryFullName: "United States",
                    SPLC: null
                },
                Region: 4,
                POITypeID: 103,
                PersistentPOIID: -1,
                SiteID: -1,
                ResultType: 10,
                ShortString: "ATM, 1 Castle Point Ter, Hoboken, NJ, US, Hudson 07030-5906",
                TimeZone: "GMT-5:00 EST"
            }
        }
        return defaultLoc;
    }
}

export default exportedMethods;