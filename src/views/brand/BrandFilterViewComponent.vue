<script setup>
import BaseBackButton from '@/components/core/buttons/BaseBackButton.vue';

import AppTemplateComponent from '@/layouts/templates/app/AppTemplateComponent.vue';

import BaseHeaderViewComponent from '@/components/core/display/BaseHeaderViewComponent.vue';

import BaseFilterViewComponent from '@/views/brand/components/filter/BaseFilterViewComponent.vue';

</script>

<template>
    <AppTemplateComponent>
        <template v-slot:content>
            <BaseBackButton redirect="Home" />
            <BaseHeaderViewComponent title="Provedores" />
            <BaseFilterViewComponent />
        </template>
    </AppTemplateComponent>
</template>
