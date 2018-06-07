const fakeData = {
  data: [5, 100]
};

export default async () => {
  return await new Promise(resolve => {
    resolve(fakeData);
  });
};