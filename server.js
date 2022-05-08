const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const cors = require("cors"),
  compression = require("compression"),
  helmet = require("helmet"),
  errorHandler = require('./middleware/error-handler'),
  requestHandler = require('./middleware/request-handler');

const PORT = process.env.PORT || 8000;

app.use(compression());
// app.use(helmet());
app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(requestHandler);
app.use(errorHandler);

// app.all('/', (req, res, next) =>{
//   res.redirect("/graphql");
// })

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server running no:http://localhost:${PORT}`);
});
