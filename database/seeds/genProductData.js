const fs = require('fs');
const faker = require('faker');

const stream = fs.createWriteStream('product.csv', { flags: 'a' });

const productRecord = (id) => {
  const name = faker.commerce.productName();
  const condition = faker.commerce.productAdjective();
  const minimum = faker.commerce.price();
  const bid = faker.random.number({ 'min': minimum, 'max': minimum * 3 }).toFixed(2);
  const watchers = faker.random.number();
  const createdAt = faker.date.between('2018-03-01', '2018-06-01');
  const updatedAt = new Date();
  return `${id}, ${name}, ${condition}, ${minimum}, ${bid}, ${watchers}, ${createdAt}, ${updatedAt}`;
};

const genRecords = (number, callback) => {
  console.log('Data generator started:', new Date());
  let amount = number;
  
  const write = () => {
    let drained = true;
    do {
      amount--;
      const record = productRecord(amount);
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

genRecords(1e7, (err) => {
  if (err) console.log('Error generating data', err);
  stream.end();
  console.log('Data generator ended:', new Date());
});