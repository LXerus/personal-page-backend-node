const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

async function connect(uri) {
  await mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("conection succesful");
    })
    .catch((error) => {
      console.error("[db]", error);
    });
}

module.exports = {
  connect,
};
