import axios from "axios";


//const URL='https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';


export const getPlacesData = async (type, sw, ne) => {
  try {
    //request
    const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {

      params: {
        bl_latitude: sw.lat,
        tr_latitude: ne.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
      },
      headers: {
        'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
        'x-rapidapi-key': 'bf9ab8cd7bmsh81c3e4e96adf49bp10c5d2jsn88384cb36c3b'
      }
    });

    return data;
  } catch (err) {
    console.log(err)
  }
}