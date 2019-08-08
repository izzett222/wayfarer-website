import app from './server/app';

// import config from "config";
// if(!config.get("jwtPrivateKey")){
//   console.log("FATAL ERROR: jwtPrivateKey is not set");
//   process.exit(1);
// }

// // app.use(helmet());

// if(app.get("env")=== "development"){
//   app.use(morgan("tiny"));
//   console.log("morgan enabled...");
// }
// const config = require("config");





const port = process.env.PORT || 4000 ;
app.listen(port, () => console.log(`Listening on port: ${port}...`));