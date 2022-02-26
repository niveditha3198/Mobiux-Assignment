const converttojson = require("./csvtojson");
const {
  getTotalSales,
  getMonthlySales,
  monthNames,
  getSKUList,
} = require("./salesutil");

const annualSales = converttojson();
initialValue = 0;
const totalsales = getTotalSales(annualSales);
console.log(totalsales);

const monthlySales = getMonthlySales(annualSales);
monthNames.forEach((monthName) => {
  console.log(
    `Total sales for ${monthName} - ${getTotalSales(monthlySales[monthName])}`
  );
});

const SKUList = getSKUList(annualSales);
const monthlySalesBySKU = {};
monthNames.forEach((monthName) => {
  monthlySalesBySKU[monthName] = {};
  SKUList.forEach((SKU) => {
    monthlySalesBySKU[monthName][SKU] = {
      totalQuantity: 0,
      totalRevenue: 0,
      SKU,
    };
  });
  monthlySales[monthName].forEach((saleData) => {
    monthlySalesBySKU[monthName][saleData.SKU]["totalQuantity"] += parseInt(
      saleData.Quantity
    );
    monthlySalesBySKU[monthName][saleData.SKU]["totalRevenue"] += parseInt(
      saleData["Total Price"]
    );
  });

  const maxQuantity = Math.max(
    ...Object.values(monthlySalesBySKU[monthName]).map((SKUDetails) => {
      return SKUDetails.totalQuantity;
    })
  );

  const maxRevenue = Math.max(
    ...Object.values(monthlySalesBySKU[monthName]).map((SKUDetails) => {
      return SKUDetails.totalRevenue;
    })
  );

  console.log(
    monthName,
    "- Highest selling",
    Object.values(monthlySalesBySKU[monthName]).find((SKUDetails) => {
      return SKUDetails.totalQuantity === maxQuantity;
    })
  );
  console.log(
    monthName,
    " - Highest revenue",
    Object.values(monthlySalesBySKU[monthName]).find((SKUDetails) => {
      return SKUDetails.totalRevenue === maxRevenue;
    })
  );
});
// console.log(monthlySalesBySKU);

// ********************************************************** //

// **********************************************************//
