const fs = require("fs");
csv = fs.readFileSync("./sales-data.csv");
const converttojson = () => {
  var splitArray = csv.toString().split("\r\n");

  const keysArray = splitArray[0].split(",");
  const salesObjArray = splitArray.slice(1).map((data) => {
    const tempObj = {};
    const dataSplitArray = data.split(",");
    keysArray.map((key, index) => {
      tempObj[key] = dataSplitArray[index];
    });
    return tempObj;
  });
  //   console.table(salesObjArray);
  return salesObjArray;
};
module.exports = converttojson;
