import {locationData} from './index.js';

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
let userOneId = '674a770368fd3a4cf77fe182';

// try{
//     result = await locationData.makeGeoJSON(Hoboken)
//     // let info = await locationData.updateLocation('6749fff90a8d264b706ea28e', result)
//     console.log(result);
// } catch(e){
//     console.log(e);
// }

try{
    const nearbyUsers = await locationData.nearbyUsers('674a770368fd3a4cf77fe182', 1.8)
    console.log(nearbyUsers);
} catch(e){
    console.log(e);
}