const bodyParser = require("body-parser");

const PORT = 3100;

const app = express();

//MiddleWare
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
