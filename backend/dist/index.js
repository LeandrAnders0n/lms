import app from "./app.js"; // TypeScript should recognize the .ts file without the extension
const cors = require('cors');
import { connectToDatabase } from "./db/connection.js";
app.use(cors());
connectToDatabase()
    .then(() => {
    app.listen(5000, () => console.log("Server Open and Connected to Database"));
})
    .catch((error) => console.log(error));
//connections and listeners
//# sourceMappingURL=index.js.map