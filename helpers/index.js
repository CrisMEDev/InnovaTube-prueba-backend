const dbValidators = require('./db-validators');
const generateJWT = require('./generate-jwt');
const getYoutubeVideos = require('./get-youtube-videos');
const validatePassword = require('./validate-password');


module.exports = {
   ...dbValidators,
   ...generateJWT,
   ...getYoutubeVideos,
   ...validatePassword
}