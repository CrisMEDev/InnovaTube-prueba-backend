const axios = require('axios').default;

const getVideosBySearchQuery = async(searchQuery = '', pageToken = '') => {

   let data = undefined;
   let error = undefined;
   const params = `key=${process.env.YOUTUBE_APIKEY}&type=video&part=snippet&q=${searchQuery}&maxResults=20&pageToken=${pageToken}`;

   await axios.get(`${process.env.YOUTUBE_BASEURI}/search?${params}`)
      .then(resp => {
         const { nextPageToken, prevPageToken, pageInfo, items } = resp.data;

         data = {
            nextPageToken,
            prevPageToken,
            totalResults: pageInfo.totalResults,
            resultsPerPage: pageInfo.resultsPerPage,
            videos: items
         }
      }).catch(err => {
         console.log(err);

         error = `Error al obtener resultados de getVideosBySearchQuery`
      });

      return {
         data,
         error
      };
   
}


module.exports = {
   getVideosBySearchQuery
}

