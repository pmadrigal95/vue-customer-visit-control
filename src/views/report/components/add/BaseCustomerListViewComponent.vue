<script setup>
import BaseTitleViewComponent from '@/views/report/components/add/BaseTitleViewComponent.vue';


const props = defineProps({
    entity: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <BaseTitleViewComponent title="Clientes" subtitle="Seleccionar un cliente." />
</template>