<script setup>

import BaseBackButton from '@/components/core/buttons/BaseBackButton.vue';

import AppTemplateComponent from '@/layouts/templates/app/AppTemplateComponent.vue';

import BaseHeaderViewComponent from '@/components/core/display/BaseHeaderViewComponent.vue';

import BaseSearchViewComponent from '@/views/product/components/search/BaseSearchViewComponent.vue';


</script>

<template>
    <AppTemplateComponent>
        <template v-slot:content>
            <BaseBackButton redirect="ProductFilterViewComponent" />
            <BaseHeaderViewComponent title="Productos" />
            <BaseSearchViewComponent />
        </template>
    </AppTemplateComponent>
</template>
