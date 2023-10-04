<template>
    <div class="flex flex-wrap md:flex-row md:justify-end gap-4 mb-4 justify-center">
        <button
            class=" text-white bg-blue800 hover:bg-blue900 focus:ring-4 focus:outline-none focus:ring-orange900 first-letter:font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Crear
            Reporte Semanal</button>
        <router-link :to="{ name: 'ReportFilterViewComponent' }">
            <button
                class=" text-white bg-blue800 hover:bg-blue900 focus:ring-4 focus:outline-none focus:ring-orange900 first-letter:font-medium rounded-lg text-sm px-5 py-2.5 text-center">Ver
                Reportes</button>
        </router-link>
    </div>
</template>