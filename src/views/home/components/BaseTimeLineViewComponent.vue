<script setup>
import { ref, onMounted } from "vue";

import useVisitControl from "@/composables/UseVisitControl";

import BaseTimeLine from '@/components/core/timeline/BaseTimeLine.vue';
import BaseSkeletonLoader from '@/components/core/loaders/BaseSkeletonLoader.vue';

import BaseExportToExcelViewComponent from '@/views/report/components/exportToExcel/BaseExportToExcelViewComponent.vue';


let loading = ref(false);

const list = ref([]);

const getVisitControlDashboard = async () => {
    try {
        loading.value = true;

        const response = await useVisitControl().visitControlDashboard();

        list.value = response;

        loading.value = false;
    } catch (error) {
        alert(error.message);
    }
};


const deleteItem = async (id) => {
    try {
        await useVisitControl().visitControlDelete({ id });

        const response = await useVisitControl().visitControlDashboard();

        list.value = response;
    } catch (error) {
        alert(error.message);
    }
};

onMounted(() => {
    getVisitControlDashboard();
});
</script>

<template>
    <section>
        <h2 class="mt-10 mb-5 text-center md:text-left text-4xl font-bold leading-9 tracking-tight text-blue900">
                    Mis visitas más recientes</h2>
        <BaseExportToExcelViewComponent />
        <BaseSkeletonLoader v-if="loading" />
        <BaseTimeLine :list="list" :fnDelete="deleteItem" v-else />
    </section>
</template>
