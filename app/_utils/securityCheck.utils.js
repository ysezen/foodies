import xss from 'xss';

const securityCheck = {
   xss: (data) => {
      return xss(data);
   }
};

export default securityCheck;