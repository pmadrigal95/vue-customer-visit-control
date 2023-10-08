/**
 * Descripción: Mapper
 *
 * @displayName productMapper
 */

const objectToMapper = ({ object }) => {
    return {
        id : object?.id,
        name: object?.name,
        description: object?.description,
        brandId: object?.Brand?.id,
        brandName: object?.Brand?.name,
    };
};

const arrayToMapper = ({ array }) => {
    if (Array.isArray(array)) {
        return array.map(object => 
            objectToMapper({object})
        );
    }
};

export const productMapper = {
  $_productMapper({ array }) {
    return arrayToMapper({ array });
  },
};
