<script setup>

import { ref } from 'vue';

import BaseCustomerListViewComponent from '@/views/report/components/add/BaseCustomerListViewComponent.vue';

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
    <section class="w-full h-full bg-white rounded-xl mx-auto">
        <BaseCustomerListViewComponent :entity="entity" v-if="entity.step == 0" />
    </section>
</template>