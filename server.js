import app from "./server/app";
const port = process.env.PORT || 3000;
const server = app.listen(port, function() {
  console.log(`Listening on port: ${port}...`);
});
export default server;

