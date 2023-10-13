<script setup>
import { baseDateHelper } from "@/helpers/baseDateHelper";

import useVisitControl from "@/composables/UseVisitControl";

import { baseJsonToXlsxHelper } from "@/helpers/baseJsonToXlsxHelper.js";

const getVisitControlReport = async () => {
    try {
        const response = await useVisitControl().visitControlReport({ query: {}, });
        if (response?.content.length > 0) {
            generateReport({
                fileName: `Reporte de visitas-${baseDateHelper.$_getRangeDay()}`,
                data: [response],
            });
        } else {
            throw new Error('No hay reportes de visitas!');
        }
    } catch (error) {
        alert(error.message);
    }
};

const generateReport = async ({ fileName, data }) => {
    try {
        baseJsonToXlsxHelper.$_generateXlsx({ fileName, data });
    } catch (error) {
        alert(error.message);
    }
};

</script>


<template>
    <div class="flex flex-wrap md:flex-row md:justify-end gap-4 mb-4 justify-center">
        <button @click="getVisitControlReport"
            class=" text-white bg-blue800 hover:bg-blue900 focus:ring-4 focus:outline-none focus:ring-orange900 first-letter:font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Crear
            Reporte Mensual</button>
        <router-link :to="{ name: 'ReportFilterViewComponent' }">
            <button
                class=" text-white bg-blue800 hover:bg-blue900 focus:ring-4 focus:outline-none focus:ring-orange900 first-letter:font-medium rounded-lg text-sm px-5 py-2.5 text-center">Ver
                Reportes</button>
        </router-link>
    </div>
</template>