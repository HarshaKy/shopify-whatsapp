// telling the app to use different URIs based on the environment

var env = process.env.NODE_ENV || 'development';
console.log('env *****', env);
if( env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/ShopifyWhatsapp'
} else if( env === 'production' ) {
//   process.env.MONGODB_URI = 'mongodb://harshaky:harshaky123@ds147890.mlab.com:47890/carrental'
}