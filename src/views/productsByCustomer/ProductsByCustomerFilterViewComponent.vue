<script setup>
import BaseFilterViewComponent from '@/views/productsByCustomer/components/filter/BaseFilterViewComponent.vue';

defineProps({
customerId: {
  type: [String, Number],
  required: true,
 },
});
</script>

<template>
    <BaseFilterViewComponent :customerId="customerId" />
</template>
