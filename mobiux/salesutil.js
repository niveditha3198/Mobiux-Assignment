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

//creating an empty array for all the months
const getMonthlySales = (salesArray) => {
  const monthlySales = {};
  monthNames.forEach((month) => {
    monthlySales[month] = [];
  });

  //pushing the sale data into the respective month array
  salesArray.forEach((saleData) => {
    const date = new Date(saleData.Date); // create date object
    const monthIndex = date.getMonth(); // gets month index 0,1,2...
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

//returns all the distinct SKU's
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
