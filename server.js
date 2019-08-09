import app from "./server/app";
import swaggerUi from "swagger-ui-express";
import Cors from "cors"
import swaggerDocument from './swagger.json';
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(Cors());
const port = process.env.PORT || 3000;
const server = app.listen(port, function() {
  console.log(`Listening on port: ${port}...`);
});
export default server;

