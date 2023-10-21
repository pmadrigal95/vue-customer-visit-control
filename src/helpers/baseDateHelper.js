export const baseDateHelper = {
    $_getInitialDay() {
        const initDate = new Date();
        // Iniciar en este año, este mes, en el día 1
        return new Date(
            initDate.getFullYear(),
            initDate.getMonth(),
            1
        ).toUTCString();
    },

    $_getFinalDay() {
        const endDate = new Date();
        // Iniciar en este año, el siguiente mes, en el día 0 (así que así nos regresamos un día)
        return new Date(
            endDate.getFullYear(),
            endDate.getMonth() + 1,
            0
        ).toUTCString();
    },

    $_getInitialDayFormat() {
        const initDate = new Date();
        // Iniciar en este año, este mes, en el día 1
        const date = new Date(
            initDate.getFullYear(),
            initDate.getMonth(),
            1
        );

        return date.getFullYear() + '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()));
    },

    $_getFinalDayFormat() {
        const endDate = new Date();
        // Iniciar en este año, el siguiente mes, en el día 0 (así que así nos regresamos un día)
        const date = new Date(
            endDate.getFullYear(),
            endDate.getMonth() + 1,
            0
        );

        return date.getFullYear() + '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()));
    },

    $_getRangeDay() {
        const date = new Date();
        // Iniciar en este año, el siguiente mes, en el día 0 (así que así nos regresamos un día)
        return `${date.getMonth() + 1}`;
    },

    $_setCurrentWeek() {
        const curr = new Date; // get current date
        const first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
        const last = first + 6; // last day is the first day + 6

        const firstday = new Date(curr.setDate(first));
        const lastday = new Date(curr.setDate(last));

        return {
            firstday: firstday.getFullYear() + '-' + ((firstday.getMonth() > 8) ? (firstday.getMonth() + 1) : ('0' + (firstday.getMonth() + 1))) + '-' + ((firstday.getDate() > 9) ? firstday.getDate() : ('0' + firstday.getDate())),
            lastday: lastday.getFullYear() + '-' + ((lastday.getMonth() > 8) ? (lastday.getMonth() + 1) : ('0' + (lastday.getMonth() + 1))) + '-' + ((lastday.getDate() > 9) ? lastday.getDate() : ('0' + lastday.getDate())),
        }
        
        
    },
};
