const AWS = require("aws-sdk");

AWS.config.getCredentials(function(err) {
    if (err) console.log(err.stack);
    // credentials not loaded
    else {
      console.log("Access key:", AWS.config.credentials.accessKeyId);
    }
  });

const credentials = AWS.config.credentials;

const client = new AWS.Location({
   credentials,
   region: AWS.config.region // region containing the identity pool
});

// rsp.Results contains search results for geocoding
const rsp = client.searchPlaceIndexForText({
    IndexName: "GalaPlaceIndex",
    Text: "4200 Pine St, Philadelphia, PA 19104",
}).promise();

console.log(rsp.Results)