<template>
  <!-- <dropdown text="Click me" placement="top">
    <list-group>
      <list-group-item>Item #1</list-group-item>
      <list-group-item>Item #2</list-group-item>
      <list-group-item>Item #3</list-group-item>
    </list-group>
  </dropdown> -->
  <AppTemplateComponent>
    <template v-slot:content>
      <p>hola</p>
    </template>
  </AppTemplateComponent>
</template>
<script setup>
import AppTemplateComponent from '@/layouts/templates/app/AppTemplateComponent.vue';

// import { Dropdown, ListGroup, ListGroupItem } from 'flowbite-vue'

</script>

