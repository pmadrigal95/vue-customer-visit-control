<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const props = defineProps({
  list: {
    type: Array,
    default: [],
  },

  fnDelete: {
    type: Function,
    requiered: true,
  },

  customerId: {
    type: [String, Number],
    required: true,
  },
});

const update = (id) => {
  router.push({ name: "ProductsByCustomerEditorViewComponent", params: { Id: id , customerId: `${props.customerId}`} });
};

const deleteItem = async (id) => {
  props.fnDelete(id);
};
</script>

<template>
  <section class="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50" v-if="list.length > 0">
    <ol class="mt-3 divide-y divider-gray-200">
      <li v-for="item in list" :key="item.id">
        <section class="flex w-full justify-end pr-1 mt-4">
          <button @click="deleteItem(item.id)">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
              class="w-6 h-6 text-black fill-current hover:text-blue900">
              <path fill-rule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clip-rule="evenodd" />
            </svg>
          </button>
        </section>
        <section class="items-center block p-3 sm:flex pb-4 rounded-lg">
          <img class="w-15 h-12 mb-3 mr-3 sm:mb-0"
            src="https://ztdqsurxcyrlabzyhrud.supabase.co/storage/v1/object/public/src/images/compresor.png"
            alt="compresor" />

          <div class="text-blue900 w-full">
            <div class="text-4xl font-bold pb-2">{{ item.productName }}</div>
            <span v-if="item.brandName" class="gap-1 inline-flex items-center text-xs font-normal text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 text-orange900 transition duration-75 group-hover:text-blue900 icon icon-tabler icon-tabler-key"
                width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0z">
                </path>
                <path d="M15 9h.01"></path>
              </svg>
              <p class="text-2xl">{{ item.serialKey }}</p>
            </span>
            <div v-if="item.description"
              class="p-3 text-2xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50">
              {{ item.description }}
            </div>

            <div v-if="item.nextMaintenance"
              class="p-3 text-2xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 my-2">
              {{ item.nextMaintenance }}
            </div>

            <section class="flex flex-wrap gap-4 pt-4" v-if="item.brandName">
              <span v-if="item.brandName" class="gap-1 inline-flex items-center text-xs font-normal text-gray-500 ">
                <svg xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-orange900 transition duration-75 group-hover:text-blue900 icon icon-tabler icon-tabler-truck-loading"
                  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                  stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M2 3h1a2 2 0 0 1 2 2v10a2 2 0 0 0 2 2h15"></path>
                  <path d="M9 6m0 3a3 3 0 0 1 3 -3h4a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-4a3 3 0 0 1 -3 -3z"></path>
                  <path d="M9 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                  <path d="M18 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                </svg>
                <p class="text-2xl">{{ item.brandName }}</p>
              </span>

              <span v-if="item.isBorrowed" class="gap-1 inline-flex items-center text-xs font-normal text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-orange900 icon icon-tabler icon-tabler-article" width="24" height="24"
                  viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                  stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"></path>
                  <path d="M7 8h10"></path>
                  <path d="M7 12h10"></path>
                  <path d="M7 16h10"></path>
                </svg>
                <p class="text-2xl">Es alquilado</p>
              </span>
            </section>
          </div>

        </section>

        <div class="flex w-full justify-end pb-3">
          <button @click="update(item.id)" type="button"
            class="px-8 py-2 mr-2 text-sm font-semibold text-center text-gray-100 bg-black rounded-lg hover:bg-blue900 focus:outline-none">
            Editar
          </button>
        </div>
      </li>
    </ol>
  </section>

  <section v-else>
    <section class="flex flex-col py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
      <img class="w-350 h-350 self-center pb-5"
        src="https://ztdqsurxcyrlabzyhrud.supabase.co/storage/v1/object/public/src/images/buscar.png?t=2023-10-05T00%3A44%3A00.658Z"
        alt="" />
      <p class="text-lg font-normal text-gray-600 lg:text-xl sm:px-16 xl:px-48 block">
        Haz clic en el botón "Agregar" para comenzar a agregar compresores al cliente.</p>
    </section>
  </section>
</template>
