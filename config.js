exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://test:password@ds161039.mlab.com:61039/fullstackdb';
                       
exports.PORT = process.env.PORT || 8080;