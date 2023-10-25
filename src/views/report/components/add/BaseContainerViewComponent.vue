<script setup>

import { ref } from 'vue';

import BaseCustomerListViewComponent from '@/views/report/components/add/BaseCustomerListViewComponent.vue';

import BaseProductsByCustomerListViewComponent from '@/views/report/components/add/BaseProductsByCustomerListViewComponent.vue';

import BaseReportViewComponent from '@/views/report/components/add/BaseReportViewComponent.vue';

// keep up with form data
const entity = ref({
    step: 0,
    visitDate: undefined,
    totalHours: undefined,
    chargingHours: undefined,
    pPsi: undefined,
    temperature: undefined,
    prp: undefined,
    engineStarts: undefined,
    observations: undefined,
    notes: undefined,
    loadRelay: undefined,
    loadPercentage: undefined,
    vsd020: undefined,
    vsd2040: undefined,
    vsd4060: undefined,
    vsd6080: undefined,
    vsd80100: undefined,
    productByCustomerId: undefined,
    productByCustomerSerialKey: undefined,
    productByCustomerNextMaintenance: undefined,
    productName: undefined,
    productDynamicPercentage: undefined,
    customerId: undefined,
    customerName: undefined,
    customerEmail: undefined,
    brandName: undefined,
});
</script>

<template>
    <section class="w-full h-full bg-white rounded-xl mx-auto md:mb-4">
        <BaseCustomerListViewComponent :entity="entity" v-if="entity.step == 0" />

        <BaseProductsByCustomerListViewComponent :entity="entity" v-if="entity.step == 1" />

        <BaseReportViewComponent :entity="entity" v-if="entity.step == 2" />
    </section>
</template>