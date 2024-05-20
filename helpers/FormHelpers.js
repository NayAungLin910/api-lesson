/**
 * Check all the values in the object is truthy with exception of the except value
 */
const checkValuesNotExist = (obj, res, except = [false]) => {
  let valuesArray = Object.values(obj);

  for (i = 0; i < valuesArray.length; i++) {
    if (!Object.values(obj)[i] && !except.includes(Object.values(obj)[i])) {
      // if a property is falsey and not the allowed value
      res.status(401).send({
        message: "Please fill in all the values",
      });
      return true;
    }
  }

  return false;
};

module.exports = {
  checkValuesNotExist,
};
