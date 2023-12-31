<script setup>
import { ref, onMounted } from "vue";

import useProductsByCustomer from "@/composables/UseProductsByCustomer";

import BaseListViewComponent from "@/views/productsByCustomer/components/shared/BaseListViewComponent.vue";

import BaseSkeletonLoader from "@/components/core/loaders/BaseSkeletonLoader.vue";

const props = defineProps({
  customerId: {
    type: [String, Number],
    required: true,
  },
});

let loading = ref(false);

const list = ref({
  data: [],
  count: 0,
  page: 0,
});

const getProductByCustomerFilter = async (page = list.value.page) => {
  try {
    const response = await useProductsByCustomer().productsByCustomerSearch({
      query: { page: page, customerId: props.customerId },
    });

    list.value.data = [...list.value.data, ...response.props.data];
    list.value.count = response.props.count;
    list.value.page = response.props.page;

    loading.value = false;
  } catch (error) {
    alert(error.message);
  }
};

const nextPage = () => {
  list.value.page++;
  getProductByCustomerFilter();
};

const deleteItem = async (id) => {
    try {
        await useProductsByCustomer().productsByCustomerDelete({id});

        const response = await useProductsByCustomer().productsByCustomerSearch({
            query: { page: list.value.page, customerId: props.customerId },
        });

        list.value.data = [...response.props.data];
        list.value.count = response.props.count;
        list.value.page = response.props.page;
    } catch (error) {
        alert(error.message);
    }
};

onMounted(() => {
  loading.value = true;
  getProductByCustomerFilter();
  loading.value = false;
});
</script>

<template>
  <section
    class="container mx-auto w-fulll h-full bg-white p-10 rounded-lg min-h-[308px] max-h-[608px] md:max-h-[768px] overflow-y-scroll custom-scrollBar"
    
  >
    <BaseSkeletonLoader v-if="loading" />
    <section v-else class="relative">
      <section class="sticky -top-10 z-40 bg-white pb-1 pt-3">
        <div class="flex flex-row justify-end gap-4 mb-4">
          <router-link :to="{ name: 'ProductsByCustomerEditorViewComponent',  params: { customerId: `${customerId}` } }">
            <button
              class="text-white bg-blue800 hover:bg-blue900 focus:ring-4 focus:outline-none focus:ring-orange900 first-letter:font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Agregar
            </button>
          </router-link>
        </div>
      </section>

      <BaseListViewComponent :list="list.data" :fnDelete="deleteItem" :customerId="customerId" />

      <div
        class="flex flex-row justify-end pt-11"
        v-if="list.count > list.data.length"
      >
        <button
          type="button"
          @click="nextPage"
          class="animate-bounce text-white bg-blue800 hover:bg-blue900 focus:ring-4 focus:outline-none focus:ring-orange900 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-arrow-badge-down-filled"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M16.375 6.22l-4.375 3.498l-4.375 -3.5a1 1 0 0 0 -1.625 .782v6a1 1 0 0 0 .375 .78l5 4a1 1 0 0 0 1.25 0l5 -4a1 1 0 0 0 .375 -.78v-6a1 1 0 0 0 -1.625 -.78z"
              stroke-width="0"
              fill="currentColor"
            ></path>
          </svg>
        </button>
      </div>
    </section>
  </section>
</template>
