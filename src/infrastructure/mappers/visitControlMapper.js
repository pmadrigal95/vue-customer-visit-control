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
        productByCustomerNextMaintenance: object?.ProductsByCustomer?.nextMaintenance,
        customerName: object?.ProductsByCustomer?.Customer?.name,
        customerEmail: object?.ProductsByCustomer?.Customer?.email,
        productId: object?.ProductsByCustomer?.Products?.id,
        productName: object?.ProductsByCustomer?.Products?.name,
        productDynamicPercentage: object?.ProductsByCustomer?.Products?.dynamicPercentage,
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
        vsd020: object?.vsd020,
        vsd2040: object?.vsd2040,
        vsd4060: object?.vsd4060,
        vsd6080: object?.vsd6080,
        vsd80100: object?.vsd80100,
        moduleHours: object?.moduleHours,
        oilPressure: object?.oilPressure,
        intercooler: object?.intercooler,
        outputElementOne: object?.outputElementOne,
        entryElementTwo: object?.entryElementTwo,
        outputElementTwo: object?.outputElementTwo,
        compressorOutlet: object?.compressorOutlet,
        entryDryer: object?.entryDryer,
        regeneration: object?.regeneration,
        deltaT: object?.deltaT,
        dpOilFilter: object?.dpOilFilter,
        oilInjection: object?.oilInjection,
        variatorCabinetTemperature: object?.variatorCabinetTemperature,
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
            { label: "Presión psi", value: "pPsi" },
            { label: "Temperatura", value: "temperature" },
            { label: "Punto de rocío PRP", value: "prp" },
            { label: "Arranque Motor", value: "engineStarts" },
            { label: "Relecarga", value: "loadRelay" },
            { label: "Porcentaje Carga (%)", value: "loadPercentage"},
            { label: "Porcentaje Carga (0% - 20%)", value: "vsd020" },
            { label: "Porcentaje Carga (20% - 40%)", value: "vsd2040" },
            { label: "Porcentaje Carga (40% - 60%)", value: "vsd4060" },
            { label: "Porcentaje Carga (60% - 80%)", value: "vsd6080" },
            { label: "Porcentaje Carga (80% - 100%)", value: "vsd80100" },
            { label: "Horas módulo", value: "moduleHours" },
            { label: "Presión de aceite", value: "oilPressure" },
            { label: "Refrigerador intermedio", value: "intercooler" },
            { label: "Salida elemento 1", value: "outputElementOne" },
            { label: "Entrada elemento 2", value: "entryElementTwo" },
            { label: "Salida elemento 2", value: "outputElementTwo" },
            { label: "Salida del compresor", value: "compressorOutlet" },
            { label: "Entrada al secador", value: "entryDryer" },
            { label: "Regeneración", value: "regeneration" },
            { label: "Delta T del elemento", value: "deltaT" },
            { label: "DP Filtro de aceite", value: "dpOilFilter" },
            { label: "Inyección de aceite", value: "oilInjection" },
            { label: "Temperatura armario variador", value: "variatorCabinetTemperature" },
            { label: "Observaciones Generales", value: "observations" },
            { label: "Notas", value: "notes" },
          ],
        content: arrayToMapper({ array }),
    };
  },
};
