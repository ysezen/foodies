const environment = {
   getImagePath: (imageName) => {
      if (process.env.NODE_ENV === 'production') {
         return `${process.env.AWS_S3_BUCKET_URL}/images/${imageName}`;
      } else {
         return `/images/${imageName}`;
      }
   }
};

export default environment;