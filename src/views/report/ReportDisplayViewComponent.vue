<script setup>
import { ref } from "vue";

import { useRouter } from "vue-router";

// Use necessary composables
const router = useRouter();

import BaseBackButton from '@/components/core/buttons/BaseBackButton.vue';
import AppTemplateComponent from '@/layouts/templates/app/AppTemplateComponent.vue';

import BaseDisplayViewComponent from '@/views/report/components/display/BaseDisplayViewComponent.vue';

const routerParams = ref(router.currentRoute.value.params.Id);
</script>

<template>
    <AppTemplateComponent>
        <template v-slot:content>
            <BaseBackButton redirect="ReportFilterViewComponent" />
            <BaseDisplayViewComponent :id="routerParams" />
        </template>
    </AppTemplateComponent>
</template>