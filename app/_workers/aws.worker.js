import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const aws = {
   uploadFileToS3: async (fileName, file, fileFolder) => {
      const awsS3Client = new S3Client({
         region: process.env.AWS_S3_REGION_NAME,
         credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
         },
      });

      // Convert File to Buffer
      const buffer = await file.arrayBuffer().then(buffer => Buffer.from(buffer));

      const params = {
         Bucket: process.env.AWS_S3_BUCKET_NAME,
         Key: `${fileFolder}/${fileName}`, // Include folder in the key if needed
         Body: buffer, // Use the buffer instead of the File object
         ACL: 'public-read',
         ContentType: file.type,
      };

      const command = new PutObjectCommand(params); // Use PutObjectCommand for uploading

      try {
         const data = await awsS3Client.send(command);
         console.log('File uploaded successfully:', data);
      } catch (error) {
         console.error('Error uploading file:', error);
      } finally {
         // Any cleanup or final steps can be done here
      }
   }
}

export default aws;