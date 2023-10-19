<script setup>

import BaseBackButton from '@/components/core/buttons/BaseBackButton.vue';

import AppTemplateComponent from '@/layouts/templates/app/AppTemplateComponent.vue';

import BaseHeaderViewComponent from '@/components/core/display/BaseHeaderViewComponent.vue';

import { ref } from 'vue'
import { Tabs, Tab } from 'flowbite-vue'
const activeTab = ref('first')

</script>

<template>
  <AppTemplateComponent>
    <template v-slot:content>
      <section class="container items-center px-4 py-8 m-auto mt-5">
        <BaseBackButton redirect="Home" />
        <BaseHeaderViewComponent title="Analytics" :showSubtitle="false" />

        <p>Pronto!</p>

        <!-- <tabs v-model="activeTab" class="p-5"> 
          <tab name="first" title="First">
            Lorem...
          </tab>
          <tab name="second" title="Second">
            Lorem...
          </tab>
          <tab name="third" title="Third">
            Lorem...
          </tab>
        </tabs> -->
      </section>
    </template>
  </AppTemplateComponent>
</template>
