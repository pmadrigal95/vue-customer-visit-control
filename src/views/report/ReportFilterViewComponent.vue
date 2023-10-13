<script setup>
import AppTemplateComponent from '@/layouts/templates/app/AppTemplateComponent.vue';

import BaseHeaderViewComponent from '@/components/core/display/BaseHeaderViewComponent.vue';

import BaseFilterViewComponent from '@/views/report/components/filter/BaseFilterViewComponent.vue';

</script>

<template>
    <AppTemplateComponent>
        <template v-slot:content>
            <BaseHeaderViewComponent title="Reportes de visitas" />
            <BaseFilterViewComponent />
        </template>
    </AppTemplateComponent>
</template>
