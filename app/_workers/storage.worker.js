import fs from 'node:fs';
import aws from '@/app/_workers/aws.worker';

const imageFolder = process.env.MEDIA_FOLDER

const storage = {
   saveImage: async (fileName, file) => {
      const extension = file.name.split('.').pop();
      fileName = `${fileName}.${extension}`;

      if (process.env.NODE_ENV === 'production') {

         aws.uploadFileToS3(fileName, file, imageFolder,);

      } else {

         const stream = fs.createWriteStream(`public/${imageFolder}/${fileName}`);
         const bufferedImage = await file.arrayBuffer();

         stream.write(Buffer.from(bufferedImage), (error) => {
            if (error) {
               throw new Error('Saving image failed');
            }
         });
      }

      return fileName;
   }
};

export default storage;