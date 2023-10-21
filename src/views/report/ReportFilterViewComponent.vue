<script setup>
import BaseBackButton from '@/components/core/buttons/BaseBackButton.vue';

import AppTemplateComponent from '@/layouts/templates/app/AppTemplateComponent.vue';

import BaseHeaderViewComponent from '@/components/core/display/BaseHeaderViewComponent.vue';

import BaseFilterViewComponent from '@/views/report/components/filter/BaseFilterViewComponent.vue';

import BaseExportToExcelViewComponent from '@/views/report/components/exportToExcel/BaseExportToExcelViewComponent.vue';

</script>

<template>
    <AppTemplateComponent>
        <template v-slot:content>
            <BaseBackButton redirect="Home" />
            <BaseHeaderViewComponent title="Reportes de visitas" />
            <BaseExportToExcelViewComponent />
            <BaseFilterViewComponent />
        </template>
    </AppTemplateComponent>
</template>
