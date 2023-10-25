/**
 * Descripción: Mapper
 *
 * @displayName productsByCustomerMapper
 */

const objectToMapper = ({ object }) => {
    return {
        id : object?.id,
        customerId: object?.Customer?.id,
        customerName: object?.Customer?.name,
        productId: object?.Products?.id,
        productName: object?.Products?.name,
        productDynamicPercentage: object?.Products?.dynamicPercentage,
        brandId: object?.Products?.Brand?.id,
        brandName: object?.Products?.Brand?.name,
        serialKey: object?.serialKey,
        description: object?.description,
        isBorrowed: object?.isBorrowed,
        nextMaintenance: object?.nextMaintenance,
    };
};

const arrayToMapper = ({ array }) => {
    if (Array.isArray(array)) {
        return array.map(object => 
            objectToMapper({object})
        );
    }
};

export const productsByCustomerMapper = {
  $_productsByCustomerMapper({ array }) {
    return arrayToMapper({ array });
  },
};
