
export const baseDateHelper = {
    $_getInitialDay() {
        const initDate = new Date();
        // Iniciar en este año, este mes, en el día 1
        return new Date(initDate.getFullYear(), initDate.getMonth(), 1).toUTCString();
    },
    
    $_getFinalDay() {
        const endDate = new Date();
        // Iniciar en este año, el siguiente mes, en el día 0 (así que así nos regresamos un día)
        return new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0).toUTCString();
    },

    $_getRangeDay() {
        const date = new Date();
        // Iniciar en este año, el siguiente mes, en el día 0 (así que así nos regresamos un día)
        return `${date.getMonth()+1}`;
    },
};