<script setup>
import AppTemplateComponent from '@/layouts/templates/app/AppTemplateComponent.vue';

import BaseBtnActionViewComponent from '@/views/home/components/BaseBtnActionViewComponent.vue';

import BaseCounterCardsViewComponent from '@/views/home/components/BaseCounterCardsViewComponent.vue';

</script>

<template>
  <AppTemplateComponent>
    <template v-slot:content>
      <section class="container items-center px-4 py-8 m-auto mt-5">
        <BaseBtnActionViewComponent />

        <BaseCounterCardsViewComponent />
      </section>
    </template>
  </AppTemplateComponent>
</template>
