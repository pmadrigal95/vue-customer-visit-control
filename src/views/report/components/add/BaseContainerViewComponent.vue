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
    productByCustomerId: undefined,
    productByCustomerSerialKey: undefined,
    productName: undefined,
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