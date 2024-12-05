import {gamesData, locationData, usersData} from './index.js';

let address = '1 Castle Point Terrace, Hoboken'
// try{
//     const result = await locationData.geocodeAddress(address)
//     console.log(result);
// } catch(e){
//     console.log(e);
// }

let Hoboken = {
    Address: {
      StreetAddress: '1 Castle Point Ter',
      LocalArea: '',
      City: 'Hoboken',
      State: 'NJ',
      StateName: 'New Jersey',
      Zip: '07030-5906',
      County: 'Hudson',
      Country: 'US',
      CountryFullName: 'United States',
      SPLC: null
    },
    Coords: { Lat: '40.745684', Lon: '-74.025923' },
    Region: 4,
    POITypeID: 103,
    PersistentPOIID: -1,
    SiteID: -1,
    ResultType: 10,
    ShortString: 'ATM, 1 Castle Point Ter, Hoboken, NJ, US, Hudson 07030-5906',
    TimeZone: 'GMT-5:00 EST'
  };

let JerseyCity = {
    Address: {
        StreetAddress: '30 Montgomery St',
        LocalArea: '',
        City: 'Jersey City',
        State: 'NJ',
        StateName: 'New Jersey',
        Zip: '07302',
        County: 'Hudson',
        Country: 'US',
        CountryFullName: 'United States',
        SPLC: null
    },
    Coords: { Lat: '40.717753', Lon: '-74.033697' },
    Region: 4,
    POITypeID: 103,
    PersistentPOIID: -1,
    SiteID: -1,
    ResultType: 10,
    ShortString: 'Bank, 30 Montgomery St, Jersey City, NJ, US, Hudson 07302',
    TimeZone: 'GMT-5:00 EST'
};
let location = {};
let result;

// try{
//     result = await locationData.makeGeoJSON(Hoboken)
//     // let info = await locationData.updateLocation('6749fff90a8d264b706ea28e', result)
//     console.log(result);
// } catch(e){
//     console.log(e);
// }

// try{
//     const nearbyUsers = await locationData.nearbyUsers('674a770368fd3a4cf77fe182', 1.8)
//     console.log(nearbyUsers);
// } catch(e){
//     console.log(e);
// }

// let userOneId = '674b592aeb565b1db2edbaca'; //username: u1
// let updateObject = {
//     firstName: 'First',
//     lastName: 'Lastname',
//     username: 'Primero'
// };
// try{
//     currUser = await usersData.updateUser(userOneId, updateObject)
//     console.log(currUser);
// } catch(e){
//     console.log(e);
// }

let monopolyId = '6750ed218558ce1c2ee99dbb';    // Monopoly owned by u2
let connect4Id = '6750e72d2dd74aae564d862c';    // Connect 4 owned by u1
let u1id = '6750ed218558ce1c2ee99db0'   // u1 user one
let u2id = '6750e72d2dd74aae564d8621'   // u2 user two
let u3id = '6750e72d2dd74aae564d8622'   // u3 user three
let u4id = '6750e72d2dd74aae564d8623'   // u4 user four

let approval = true;
let currGame;
try {
    currGame = await gamesData.handleRequest(monopolyId, u1id, approval);
    console.log(currGame);
} catch(e){
    console.log(e);
}