/* --- SORT BY NAME ASCENDING --- */
 export const sortAscendingByName = allProducts => {
  return allProducts.sort((a, b) => {
    if(a.name < b.name) return -1;
    return a.name > b.name ? 1 : 0
  })
 }
 
/* --- EXTRACT DUPLICATES --- */
 export const extractDuplicates = (collection, keyName) => {
    const duplicate = collection
      .map(product => product[keyName])
      .map((product, index, final) => final.indexOf(product) !== index && index)
      .filter(product => collection[product])
      .map(product => collection[product]) 
    return duplicate;
  };


/* --- GET UNIQUE PRODUCTS --- */
export const getUniqueProducts = (collection, keyName) => {
  const unique = collection
    .map(product => product[keyName])
    .map((product, index, final) => final.indexOf(product) === index && index)
    .filter(product => collection[product])
    .map(product => collection[product]);
  return unique;
}

/* --- CALCULATE PRODUCT REVENUE --- */
export const calculateProductRevenue = (uniqueCollection, duplicateCollection) => {

  const productsWithRevenue = uniqueCollection.map(el => {
    const sum = duplicateCollection
      .filter(sum => sum.name === el.name)
      .reduce((acc, val) => acc += val.sold, 0)
    el.sold += sum;
    return el;
  })
  return productsWithRevenue;

};

/* --- CALCULATE TOTAL REVENUE --- */
export const calculateTotalRevenue = collection => {
  return collection.reduce((acc, val) => {
    acc += val.sold * val.unitPrice;
    return acc;
  }, 0)
};
