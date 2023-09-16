<script setup>
import { ref, onMounted } from 'vue'
import useAuthUser from "@/composables/UseAuthUser";
const { user } = useAuthUser();

const products = ref([])

onMounted(async () => {
  products.value = await useAuthUser().getProducts();
  });
</script>

<template>
  <div v-if="user">
    <div>Hello {{ user.email }}</div>
  </div>
  <div>
    <ul v-if="products">
      <li v-for="product in products" :key="product.id">{{ product.name }}</li>
    </ul>
  </div>
</template>