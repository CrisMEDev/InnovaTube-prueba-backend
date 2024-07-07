const { request, response } = require('express');

const { getVideosBySearchQuery } = require('../helpers');

const getVideosByQuery = async(req = request, res = response) => {

   const { searchQuery } = req.query;
   
   try {
      const {data, error} = await getVideosBySearchQuery(searchQuery);

      if (error){
         return res.status(400).json({
            ok: false,
            error,
            msg: 'No se pudo completar la petición'
         });
      }

      res.status(200).json({
         ok: true,
         data,
         msg: 'Búsqueda realizada correctamente'
      });

   } catch (error) {
      console.log(error);
      return res.status(500).json({
         msg: 'Algo salió mal, contacte a su administrador'
      });
   }
}


module.exports = {
   getVideosByQuery
}
