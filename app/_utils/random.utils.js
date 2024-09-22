import { v4 as uuidv4 } from 'uuid';
import slugify from "slugify";

const randomData = {
   getUIIDV4: () => {
      return uuidv4();
   },
   getSlug: (text) => {
      return slugify(text, { lower: true });
   }
};

export default randomData;