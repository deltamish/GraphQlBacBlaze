const b2 = require('../../apis/backblaze');

module.exports = {
   Query: {
      uploadToken: async () => {
         const data = await b2.GetUploadUrl();

         const { uploadUrl, authToken } = data;
         console.log(data);
         return {
            uploadUrl, authToken
         }
      }

   },
   Mutation: {
      downloadFile: async (id) => {
         try {
            const data = await b2.DownloadfileById(id);
            const { fileId, fileStream } = data;
            return {
               fileId,
               fileStream
            };
         } catch (err) {
            console.log(err);
            return 404;
         }
      }
   }

}