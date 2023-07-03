const compose =
  (...fns) =>
  (arg) =>
    fns.reduce((acc, fn) => fn(acc), arg);

const partialRight =
  (fn, ...args) =>
  (...leftArgs) =>
    fn(...leftArgs, ...args);

const addInArrayAtPosition = (array, element, position) => {
  const arrayCopy = [...array];
  arrayCopy.splice(position, 0, element);
  return arrayCopy;
};

const removeFromArrayAtPosition = (array, position) =>
  array.reduce(
    (acc, value, idx) => (idx === position ? acc : [...acc, value]),
    []
  );

const changeElementOfPositionInArray = (array, from, to) => {
  const removeFromArrayAtPositionFrom = partialRight(
    removeFromArrayAtPosition,
    from
  );
  const addInArrayAtPositionTo = partialRight(
    addInArrayAtPosition,
    array[from],
    to
  );

  return compose(removeFromArrayAtPositionFrom, addInArrayAtPositionTo)(array);
};

const identity = (value) => value;

const when =
  (value, predicate = identity) =>
  (callback) => {
    if (predicate(value)) return callback(value);
  };

const replaceElementOfArray = (array) => (options) =>
  array.map((element) =>
    options.when(element) ? options.for(element) : element
  );

const pickPropOut = (object, prop) =>
  Object.keys(object).reduce((obj, key) => {
    return key === prop ? obj : { ...obj, [key]: object[key] };
  }, {});

export {
  addInArrayAtPosition,
  removeFromArrayAtPosition,
  changeElementOfPositionInArray,
  when,
  replaceElementOfArray,
  partialRight,
  pickPropOut
};
