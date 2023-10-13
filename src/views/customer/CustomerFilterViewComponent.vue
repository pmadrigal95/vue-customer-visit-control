<script setup>
import BaseBackButton from '@/components/core/buttons/BaseBackButton.vue';

import AppTemplateComponent from '@/layouts/templates/app/AppTemplateComponent.vue';

import BaseHeaderViewComponent from '@/components/core/display/BaseHeaderViewComponent.vue';

import BaseFilterViewComponent from '@/views/customer/components/filter/BaseFilterViewComponent.vue';

</script>

<template>
    <AppTemplateComponent>
        <template v-slot:content>
            <BaseBackButton redirect="Home" />
            <BaseHeaderViewComponent title="Clientes" />
            <BaseFilterViewComponent />
        </template>
    </AppTemplateComponent>
</template>
