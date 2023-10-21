<script setup>

import BaseBackButton from '@/components/core/buttons/BaseBackButton.vue';

import AppTemplateComponent from '@/layouts/templates/app/AppTemplateComponent.vue';

import BaseHeaderViewComponent from '@/components/core/display/BaseHeaderViewComponent.vue';

import BaseContainerViewComponent from '@/views/report/components/search/BaseContainerViewComponent.vue';

import BaseExportToExcelViewComponent from '@/views/report/components/exportToExcel/BaseExportToExcelViewComponent.vue';

</script>

<template>
    <AppTemplateComponent>
        <template v-slot:content>
            <BaseBackButton redirect="ReportFilterViewComponent" />
            <BaseHeaderViewComponent title="Reportes de visitas" :showSubtitle="false" />
            <BaseExportToExcelViewComponent />
            <BaseContainerViewComponent />
        </template>
    </AppTemplateComponent>
</template>
