export const tryParseInt = (value, defaultValue) => {
  const retValue = parseInt(value);
  return isNaN(retValue) ? defaultValue : retValue;
};

export const tryParseFloat = (value, defaultValue) => {
  const retValue = parseFloat(value);
  return isNaN(retValue) ? defaultValue : retValue;
};
