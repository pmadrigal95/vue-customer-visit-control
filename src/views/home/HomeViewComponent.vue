<script setup>
import AppTemplateComponent from '@/layouts/templates/app/AppTemplateComponent.vue';

import useAuthUser from "@/composables/UseAuthUser";
const { user } = useAuthUser();


</script>

<template>
    <AppTemplateComponent>
      <template v-slot:content>
        
        <div v-if="user">
          <div>Hello {{ user.email }}</div>
        </div>
        
      </template>
    </AppTemplateComponent>
  </template>
