const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getMonthlySales = (salesArray) => {
  const monthlySales = {};
  monthNames.forEach((month) => {
    monthlySales[month] = [];
  });

  salesArray.forEach((saleData) => {
    const date = new Date(saleData.Date);
    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex];
    monthlySales[monthName].push(saleData);
  });

  return monthlySales;
};

const getTotalSales = (salesArray) => {
  const totalSales = salesArray.reduce((accumulator, currSale) => {
    return accumulator + parseInt(currSale["Total Price"]);
  }, 0);
  return totalSales;
};

const getSKUList = (salesArray) => {
  const SKUList = new Set();
  salesArray.forEach((saleData) => {
    SKUList.add(saleData.SKU);
  });
  return [...SKUList];
};

module.exports = {
  getMonthlySales,
  getTotalSales,
  monthNames,
  getSKUList,
};
