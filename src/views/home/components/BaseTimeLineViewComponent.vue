<script setup>
import { ref, onMounted } from "vue";

import useVisitControl from "@/composables/UseVisitControl";

import BaseTimeLine from '@/components/core/timeline/BaseTimeLine.vue';
import BaseSkeletonLoader from '@/components/core/loaders/BaseSkeletonLoader.vue';


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
        await useVisitControl().visitControlDelete({id});

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
    <BaseSkeletonLoader v-if="loading" />
    <BaseTimeLine :list="list" :fnDelete="deleteItem" v-else />
</template>
