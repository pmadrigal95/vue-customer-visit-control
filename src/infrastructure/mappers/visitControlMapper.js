/**
 * Descripción: Mapper
 *
 * @displayName visitControlMapper
 */

const objectToMapper = ({ object }) => {
    return {
        id : object?.id,
        productByCustomerId: object?.ProductsByCustomer?.id,
        productByCustomerSerialKey: object?.ProductsByCustomer?.serialKey,
        customerName: object?.ProductsByCustomer?.Customer?.name,
        customerEmail: object?.ProductsByCustomer?.Customer?.email,
        productName: object?.ProductsByCustomer?.Products?.name,
        brandName: object?.ProductsByCustomer?.Products?.Brand?.name,
        visitDate: object?.visitDate,
        totalHours: object?.totalHours,
        chargingHours: object?.chargingHours,
        pPsi: object?.pPsi,
        temperature: object?.temperature,
        prp: object?.prp,
        engineStarts: object?.engineStarts,
        loadRelay: object?.loadRelay,
        loadPercentage: object?.loadPercentage,
        observations: object?.observations,
        notes: object?.notes,
    };
};

const arrayToMapper = ({ array }) => {
    if (Array.isArray(array)) {
        return array.map(object => 
            objectToMapper({object})
        );
    }
};

export const visitControlMapper = {
  $_visitControlMapper({ array }) {
    return arrayToMapper({ array });
  },

  $_visitControlMapperReport({ array }) {
    return {
        sheet: "Reporte de visita",
        columns: [
            { label: "Fecha", value: "visitDate" },
            { label: "Nombre del cliente", value: "customerName" },
            { label: "Equipo", value: "brandName" },
            { label: "Modelo", value: "productName" },
            { label: "Serie", value: "productByCustomerSerialKey" },
            { label: "Horas totales", value: "totalHours" },
            { label: "Horas Carga", value: "chargingHours" },
            { label: "P psi", value: "pPsi" },
            { label: "Temperatura", value: "temperature" },
            { label: "Prp", value: "prp" },
            { label: "Arranque Motor", value: "engineStarts" },
            { label: "Relecarga", value: "loadRelay" },
            { label: "Porcentaje Carga", value: "loadPercentage" },
            { label: "Observaciones Generales", value: "observations" },
          ],
        content: arrayToMapper({ array }),
    };
  },
};
