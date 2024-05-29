const generateStringFromArray = (data, type) => {
  switch (type) {
    case 'eggGroup':
      return data.map(group => group.name).join(', ');
    case 'varieties':
      return data.map(group => group.pokemon.name).join(', ');
    case 'evolvesTo':
      return data?.map(group => group?.species?.name).join(', ');
    default:
      return 'Specify type name'
  }
}

const flattenObject = (obj, parent = '', res = []) => {
  for (let key in obj) {
    let propName = parent ? `${parent}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      flattenObject(obj[key], propName, res);
    } else if (obj[key] !== null) {
      res.push({ name: propName, url: obj[key] });
    }
  }
  return res;
};

const Helper = {
  generateStringFromArray,
  flattenObject,
};


export default Helper