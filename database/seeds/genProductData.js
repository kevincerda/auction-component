const fs = require('fs');
const faker = require('faker');
let stream;

const genProductRecord = (id) => {
  const name = faker.commerce.productName();
  const condition = faker.commerce.productAdjective();
  const minimum = faker.commerce.price();
  const bid = faker.random.number({ 'min': minimum, 'max': minimum * 3 }).toFixed(2);
  const watchers = faker.random.number();
  const created = faker.date.between('2018-03-01', '2018-06-01');
  const updated = new Date();
  return `${id}, ${name}, ${condition}, ${minimum}, ${bid}, ${watchers}, ${created}, ${updated}`;
};

const genBidRecord = (id) => {
  const user = genRandomInt(0, 1e7);
  const product_id = faker.random.number({ 'min': 0, 'max': 1e7 });
  const minimum = faker.commerce.price();
  const bid = faker.random.number({ 'min': minimum, 'max': minimum * 3 }).toFixed(2);
  return `${id}, ${product_id}, ${user}, ${bid}`;
};

const genRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const genRecords = (number, type, callback) => {
  let amount = number;
  stream = fs.createWriteStream(`${type}.csv`, { flags: 'a' });
  console.log(`Data generator started for ${type}:`, new Date());

  const write = () => {
    let drained = true;
    do {
      amount--;
      const record = type === 'products' ? genProductRecord(amount) : genBidRecord(amount);
      if (amount === 0) {
        stream.write(record + '\n', callback);
      } else {
        drained = stream.write(record + '\n');
      }
    } while (amount > 0 && drained);
    if (amount > 0) {
      stream.once('drain', write);
    };
  };
  
  write();
};

genRecords(1e7, 'products', (err) => {
  if (err) console.log('Error generating product data', err);
  stream.end();
  console.log('Product data generating ended:', new Date());
});

genRecords(1e7, 'bids', (err) => {
  if (err) console.log('Error generating bid data', err);
  stream.end();
  console.log('Bid data generating ended:', new Date());
});