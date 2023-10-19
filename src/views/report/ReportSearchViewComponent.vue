<script setup>

import BaseBackButton from '@/components/core/buttons/BaseBackButton.vue';

import AppTemplateComponent from '@/layouts/templates/app/AppTemplateComponent.vue';

import BaseHeaderViewComponent from '@/components/core/display/BaseHeaderViewComponent.vue';

import BaseContainerViewComponent from '@/views/report/components/search/BaseContainerViewComponent.vue';


</script>

<template>
    <AppTemplateComponent>
        <template v-slot:content>
            <BaseBackButton redirect="ReportFilterViewComponent" />
            <BaseHeaderViewComponent title="Reportes de visitas" :showSubtitle="false" />
            <BaseContainerViewComponent />
        </template>
    </AppTemplateComponent>
</template>
