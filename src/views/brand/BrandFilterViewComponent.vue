<script setup>
import { ref, onMounted } from 'vue';

import useBrand from "@/composables/UseBrand";

import AppTemplateComponent from '@/layouts/templates/app/AppTemplateComponent.vue';

const list = ref({
    data: [],
    count: 0,
    page: 0
});

const getBrandFilter = async () => {
    try {

        const response = await useBrand().brandFilter({ query: { page: list.value.page } });

        list.value.data = [...list.value.data, ...response.props.data];
        list.value.count = response.props.count;
        list.value.page = response.props.page;

        console.log({ response, list });


    } catch (error) {
        alert(error.message);
    }
};

onMounted(async () => {
    getBrandFilter();
});

</script>

<template>
    <AppTemplateComponent>
        <template v-slot:content>
            <section class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                <h1
                    class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-blue900 md:text-5xl lg:text-6xl">
                    Provedores</h1>
                <p class="mb-8 md:mb-0 text-lg font-normal text-gray-600 lg:text-xl sm:px-16 xl:px-48">
                    Gestiona tus
                    proveedores de manera eficiente y sin complicaciones.</p>
                <p
                    class="text-lg font-normal text-gray-600 lg:text-xl sm:px-16 xl:px-48 hidden md:block">
                    Desde la
                    creación hasta la actualización y eliminación de registros.</p>
            </section>

            <section
                class="container mx-auto w-fulll h-full bg-white p-10 shadow-lg rounded-lg min-h-[308px] max-h-[608px] md:max-h-[768px] overflow-y-scroll custom-scrollBar">

                <section class="flex flex-col gap-4">
                    <section v-for="item in list.data" :key="item.id">
                        <div class=" flex flex-col items-start justify-start w-full gap-4 p-8 bg-silver900 hover:bg-gray-300 rounded-xl">
                            <div class="flex items-start justify-between w-full">
                                <img class="w-14 h-14" src="https://ztdqsurxcyrlabzyhrud.supabase.co/storage/v1/object/public/src/images/paquetes.png?t=2023-10-04T02%3A19%3A13.097Z" alt="" />
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                        class="w-6 h-6 text-black fill-current hover:text-blue900">
                                        <path fill-rule="evenodd"
                                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                            <div>
                                <h4 class="text-xl font-semibold text-blue900" v-if="item.name">{{ item.name }}</h4>
                                <p class="mt-2 text-sm text-blue800 md:mt-1" v-if="item.description">
                                    {{ item.description }}
                                </p>
                            </div>
                            <div class="flex w-full justify-end">
                                <button type="button"
                                    class="px-8 py-2 mr-2 text-sm font-semibold text-center text-gray-100 bg-black rounded-lg hover:bg-blue900 focus:outline-none">
                                    Editar
                                </button>
                            </div>
                        </div>
                    </section>
                </section>
            </section>
        </template>
    </AppTemplateComponent>
</template>
