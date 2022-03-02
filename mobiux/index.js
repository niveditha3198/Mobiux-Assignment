const converttojson = require("./csvtojson");
const {
  getTotalSales,
  getMonthlySales,
  monthNames,
  getSKUList,
} = require("./salesutil");

//Total Sales
const annualSales = converttojson();
const totalsales = getTotalSales(annualSales);
console.log(totalsales);

//Monthy sales
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
  const initSKQ = {
    totalQuantity: 0,
    totalRevenue: 0,
    SKU: "",
  };
  SKUList.forEach((SKU) => {
    monthlySalesBySKU[monthName][SKU] = { ...initSKQ, SKU };
  });

  monthlySales[monthName].forEach((saleData) => {
    monthlySalesBySKU[monthName][saleData.SKU]["totalQuantity"] += parseInt(
      saleData.Quantity
    );
    monthlySalesBySKU[monthName][saleData.SKU]["totalRevenue"] += parseInt(
      saleData["Total Price"]
    );
  });

  // Compute the highest selling SKU
  const mostPopular = Object.values(monthlySalesBySKU[monthName]).reduce(
    (accumulator, currentSKU) => {
      if (currentSKU.totalQuantity > accumulator.totalQuantity) {
        return currentSKU;
      }
      return accumulator;
    },
    initSKQ
  );

  console.log(`${monthName} - Most Popular`, mostPopular);

  // Compute the most revenue generating SKU
  const maxRevenue = Object.values(monthlySalesBySKU[monthName]).reduce(
    (accumulator, currentSKU) => {
      if (currentSKU.totalRevenue > accumulator.totalRevenue) {
        return currentSKU;
      }
      return accumulator;
    },
    initSKQ
  );

  console.log(`${monthName} - Maximum Revenues`, maxRevenue);

  const popularSKUSales = monthlySales[monthName].filter((saleData) => {
    return saleData.SKU === mostPopular.SKU;
  });

  //For the most popular SKU, compute the min, max and the average orders

  // minimum order

  const minOrders = popularSKUSales.reduce((accumulator, currentOrder) => {
    if (accumulator) {
      return Math.min(accumulator, parseInt(currentOrder.Quantity));
    }
    return currentOrder.Quantity;
  }, null);

  //maximum order
  const maxOrders = popularSKUSales.reduce((accumulator, currentOrder) => {
    return Math.max(accumulator, parseInt(currentOrder.Quantity));
  }, null);

  //average order
  const averageOrders = (
    mostPopular.totalQuantity / popularSKUSales.length
  ).toFixed(2);
  console.log(
    `5. Min Orders - ${minOrders} Max Orders - ${maxOrders} Average Orders = ${averageOrders}`
  );
});
