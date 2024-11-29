import axios from 'axios'
import convert from 'xml-js'
import * as validation from '../utilities/validation.js'

// uses inputted title to search api for games and returns a list of objects for each game found
export const searchGamesByTitle = async (title) => {
  const { data } = await axios.get(`https://boardgamegeek.com/xmlapi/search?search=${title}`);

  let res = convert.xml2json(data, {compact: true, spaces: 2});  // converts XML to JSON
  let obj = JSON.parse(res)                                      // converts JSON to a object
  if (!obj.boardgames.boardgame) throw 'no results found'
  if (Array.isArray(obj.boardgames.boardgame)) {
    return obj.boardgames.boardgame
  }
  else {    // api does not return a list if only a single item is found, so this check is to ensure a list is returned
    return [obj.boardgames.boardgame]
  }
};

// uses inputted id to search api for a specific game, shows a lot more detail on the game
export const searchGamesByID = async (id) => {
  validation.validateInteger(id);
  const { data } = await axios.get(`https://boardgamegeek.com/xmlapi/boardgame/${id}`);
  
  let res = convert.xml2json(data, {compact: true, spaces: 2});
  let obj = JSON.parse(res)
  if (obj.boardgames.boardgame.error) throw 'no results found'
  return obj.boardgames.boardgame
};
