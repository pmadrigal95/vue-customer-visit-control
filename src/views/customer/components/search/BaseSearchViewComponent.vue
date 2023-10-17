<script setup>
import { ref } from 'vue';

import { Input } from 'flowbite-vue';

import useCustomer from '@/composables/UseCustomer';

import BaseSkeletonLoader from '@/components/core/loaders/BaseSkeletonLoader.vue';

import BaseListViewComponent from '@/views/customer/components/shared/BaseListViewComponent.vue';

let loading = ref(false);

let search = ref(undefined);

const list = ref({
    data: [],
    count: -1,
});

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
        list.value.data = [];
        list.value.count = -1;
    }
};

const deleteItem = async (id) => {
    try {
        await useCustomer().customerDelete({id});
        Search();
    } catch (error) {
        alert(error.message);
    }
};

</script>

<template>
    <section
        class='container mx-auto w-fulll h-full bg-white p-10 shadow-lg rounded-lg min-h-[308px] max-h-[608px] md:max-h-[768px] overflow-y-scroll custom-scrollBar'>
        <BaseSkeletonLoader v-if='loading' />
        <section v-else class='relative'>
            <section class='sticky -top-10 z-40 bg-white pb-5 pt-3'>
                <div class='flex gap-4'>
                    <Input size='lg' placeholder='Buscar' class='grow' v-model='search'>
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

            <BaseListViewComponent :list='list.data' v-if='list.data.length > 0' :fnDelete='deleteItem'  />

            <section v-else>
                <section class='flex flex-col py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12'>
                    <img class='w-350 h-350 self-center pb-5'
                        src='https://ztdqsurxcyrlabzyhrud.supabase.co/storage/v1/object/public/src/images/buscar.png?t=2023-10-05T00%3A44%3A00.658Z'
                        alt='' />
                    <p class='mb-8 md:mb-0 text-lg font-normal text-gray-600 lg:text-xl sm:px-16 xl:px-48'
                        v-if='search && list.count == 0'>
                        Lamentablemente, no hemos encontrado resultados que coincidan con tu búsqueda en este momento.</p>
                    <p class='text-lg font-normal text-gray-600 lg:text-xl sm:px-16 xl:px-48 hidden md:block' v-else>
                        ¿Qué estás buscando hoy?</p>
                </section>
            </section>

        </section>
    </section>
</template>
