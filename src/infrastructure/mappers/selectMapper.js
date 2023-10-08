/**
 * Descripción: Mapper
 *
 * @displayName selectMapper
 */

const objectToMapper = ({ object, value, name }) => {
  return {
    value: object[value],
    name: object[name],
  };
};

const arrayToMapper = ({ array, value, name }) => {
  if (Array.isArray(array)) {
    return array.map((object) => objectToMapper({ object, value, name }));
  }
};

export const selectMapper = {
  $_selectMapper({ array, value, name }) {
    return arrayToMapper({ array, value, name });
  },
};
