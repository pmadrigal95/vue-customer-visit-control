<script setup>
import { ref, onMounted } from 'vue';

import AppTemplateComponent from '@/layouts/templates/app/AppTemplateComponent.vue';

import BaseStatisticCard from '@/components/core/cards/BaseStatisticCard.vue';

import useCustomer from "@/composables/UseCustomer";

const counts = ref({
    customers: 0,
    products: 0,
    reports: 0,
});

onMounted(async () => {
  counts.value.customers = await useCustomer().customerCount();
  });
</script>

<template>
  <AppTemplateComponent>
    <template v-slot:content>
      <div class="container items-center px-4 py-8 m-auto mt-5">
        <div class="flex flex-wrap justify-center pb-3 mx-4 md:mx-24 lg:mx-0">
          <div class="w-full p-2 lg:w-1/3 md:w-1/2">
            <BaseStatisticCard title="Clientes" :count="counts.customers">
              <template v-slot:content>
                <svg xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 group-hover:text-gray-50 icon icon-tabler icon-tabler-users-group" width="24" height="24"
                  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                  stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                  <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1"></path>
                  <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                  <path d="M17 10h2a2 2 0 0 1 2 2v1"></path>
                  <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                  <path d="M3 13v-1a2 2 0 0 1 2 -2h2"></path>
                </svg>
              </template>
            </BaseStatisticCard>
          </div>
          <div class="w-full p-2 lg:w-1/3 md:w-1/2">
            <BaseStatisticCard title="Productos" count="10">
              <template v-slot:content>
                <svg xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 group-hover:text-gray-50 icon icon-tabler icon-tabler-brand-netbeans" width="24"
                  height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z">
                  </path>
                  <path
                    d="M15.5 9.43a1 1 0 0 1 .5 .874v3.268a1 1 0 0 1 -.515 .874l-3 1.917a1 1 0 0 1 -.97 0l-3 -1.917a1 1 0 0 1 -.515 -.873v-3.269a1 1 0 0 1 .514 -.874l3 -1.786c.311 -.173 .69 -.173 1 0l3 1.787h-.014z">
                  </path>
                  <path d="M12 21v-9l-7.5 -4.5"></path>
                  <path d="M12 12l7.5 -4.5"></path>
                  <path d="M12 3v4.5"></path>
                  <path d="M19.5 16l-3.5 -2"></path>
                  <path d="M8 14l-3.5 2"></path>
                </svg>
              </template>
            </BaseStatisticCard>
          </div>
          <div class="w-full p-2 lg:w-1/3 md:w-1/2">
            <BaseStatisticCard title="Reportes" count="10">
              <template v-slot:content>
                <svg xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 group-hover:text-gray-50 icon icon-tabler icon-tabler-file-report" width="24" height="24"
                  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                  stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M17 17m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                  <path d="M17 13v4h4"></path>
                  <path d="M12 3v4a1 1 0 0 0 1 1h4"></path>
                  <path d="M11.5 21h-6.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v2m0 3v4"></path>
                </svg>
              </template>
            </BaseStatisticCard>
          </div>
        </div>
      </div>
    </template>
</AppTemplateComponent></template>
