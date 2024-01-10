<script setup>
import { ref, onMounted } from 'vue';

import { Input } from 'flowbite-vue';

import useCustomer from '@/composables/UseCustomer';

import BaseTitleViewComponent from '@/views/report/components/add/BaseTitleViewComponent.vue';

import BaseSkeletonLoader from '@/components/core/loaders/BaseSkeletonLoader.vue';

const props = defineProps({
    entity: {
        type: Object,
        required: true,
    },
});

let loading = ref(false);

let search = ref(undefined);

const list = ref({
    data: [],
    count: 0,
});


const getCustomerFilterAll = async () => {
    try {
        const response = await useCustomer().customerFilterAll();

        list.value.data = response.props.data;
        list.value.count = response.props.count;
    } catch (error) {
        alert(error.message);
    }
};


const getCustomerSearch = async (name = search.value) => {
    try {
        loading.value = true;

        const response = await useCustomer().customerSearch({
            query: { name: name },
        });

        list.value.data = response.props.data;
        list.value.count = response.props.count;

        loading.value = false;
    } catch (error) {
        alert(error.message);
        loading.value = false;
    }
};

const Search = () => {
    if (search.value) {
        getCustomerSearch(search.value);
    } else {
        getCustomerFilterAll();
    }
};


const setCustomer = (item) => {
   props.entity.customerId = item.id;
   props.entity.customerName = item.name;
   props.entity.customerEmail = item.email;

   props.entity.step = 1;

};

const cleanCustomer = () => {
   props.entity.customerId = undefined;
   props.entity.customerName = undefined;
   props.entity.customerEmail = undefined;
};

onMounted(() => {
    cleanCustomer();
    Search();
});
</script>

<template>
    <BaseTitleViewComponent title='Clientes' subtitle='Seleccionar un cliente.' />
    <BaseSkeletonLoader v-if='loading' />
    <section v-else class='relative px-8 pb-2'>
        <section class='sticky -top-10 z-40 bg-white pb-5 pt-3'>
            <div class='flex gap-4'>
                <Input size='lg' placeholder='Buscar' class='grow' v-model.trim='search' @keyup.enter="Search">
                <template #prefix>
                    <svg aria-hidden='true' class='w-5 h-5 text-blue900' fill='none' stroke='currentColor'
                        viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                        <path stroke-linecap='round' stroke-linejoin='round' stroke-width='2'
                            d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                    </svg>
                </template>
                </Input>
                <button type='button' @click='Search'
                    class='text-white border border-blue900 bg-blue800 focus:ring-4 focus:outline-none focus:ring-orange900 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>Buscar</button>
            </div>
        </section>



        <section class='p-5 mb-5 border border-gray-100 rounded-lg bg-gray-50' v-if='list.data.length > 0'>
            <ol class='mt-3 divide-y divider-gray-200'>
                <li v-for='item in list.data' :key='item.id'>
                    <section @click="setCustomer(item)" class='items-center block p-3 sm:flex pb-4 rounded-lg hover:bg-silver900 cursor-pointer'>
                        <img class='w-15 h-12 mb-3 mr-3 sm:mb-0'
                            src='https://ztdqsurxcyrlabzyhrud.supabase.co/storage/v1/object/public/src/images/oficina.png'
                            alt='cliente' />

                        <div class='text-blue900 w-full'>
                            <div class='text-4xl font-bold pb-2'>{{ item.name }}</div>
                            <div v-if='item.description'
                                class='p-3 text-xl italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 hover:bg-silver900'>
                                {{ item.description }}</div>

                            <section class='flex flex-wrap gap-4 pt-4' v-if='item.address || item.phone'>
                                <span v-if='item.address'
                                    class='gap-1 inline-flex items-center text-xs font-normal text-gray-500 '>
                                    <svg xmlns='http://www.w3.org/2000/svg'
                                        class='w-5 h-5 text-orange900 icon icon-tabler icon-tabler-map-pin' width='24'
                                        height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none'
                                        stroke-linecap='round' stroke-linejoin='round'>
                                        <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                                        <path d='M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0'></path>
                                        <path
                                            d='M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z'>
                                        </path>
                                    </svg>
                                    <p class='text-xl'>{{ item.address }}</p>
                                </span>

                                <span v-if='item.phone'
                                    class='gap-1 inline-flex items-center text-xs font-normal text-gray-500'>
                                    <svg xmlns='http://www.w3.org/2000/svg'
                                        class='w-5 h-5 text-orange900 icon icon-tabler icon-tabler-phone-call' width='24'
                                        height='24' viewBox='0 0 24 24' stroke-width='2' stroke='currentColor' fill='none'
                                        stroke-linecap='round' stroke-linejoin='round'>
                                        <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                                        <path
                                            d='M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2'>
                                        </path>
                                        <path d='M15 7a2 2 0 0 1 2 2'></path>
                                        <path d='M15 3a6 6 0 0 1 6 6'></path>
                                    </svg>
                                    <p class='text-xl'>{{ item.phone }}</p>
                                </span>
                            </section>

                        </div>
                    </section>
                </li>
            </ol>
        </section>

        <section v-else>
            <section class='flex flex-col py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12'>
                <img class='w-350 h-350 self-center pb-5'
                    src='https://ztdqsurxcyrlabzyhrud.supabase.co/storage/v1/object/public/src/images/buscar.png?t=2023-10-05T00%3A44%3A00.658Z'
                    alt='' />
                <p class='mb-8 md:mb-0 text-lg font-normal text-gray-600 lg:text-xl sm:px-16 xl:px-48'
                    v-if='search && list.count == 0'>
                    Lamentablemente, no hemos encontrado resultados que coincidan con tu búsqueda en este momento.</p>
                <p class='text-lg font-normal text-gray-600 lg:text-xl sm:px-16 xl:px-48 block' v-else>
                    ¿Qué estás buscando hoy?</p>
            </section>
        </section>

    </section>
</template>