<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// Use necessary composables
const router = useRouter();
import useCustomer from "@/composables/UseCustomer";

import BaseSkeletonLoader from '@/components/core/loaders/BaseSkeletonLoader.vue';

import BaseBackButton from '@/components/core/buttons/BaseBackButton.vue';

import AppTemplateComponent from '@/layouts/templates/app/AppTemplateComponent.vue';

import ProductsByCustomerFilterViewComponent from '@/views/productsByCustomer/ProductsByCustomerFilterViewComponent.vue';

// keep up with form data
const form = ref({
    name: "",
    address: "",
    phone: "",
    description: "",
});

let loading = ref(false);

const routerParams = ref(router.currentRoute.value.params.Id);

const getById = async () => {
    try {
        loading.value = true;
        const response = await useCustomer().getCustomerById({ id: routerParams.value });
        form.value = response;
        loading.value = false;
    } catch (error) {
        loading.value = false;
        alert(error.message);
    }
};

const update = () => {
    router.push({ name: "CustomerEditorViewComponent", params: { Id: routerParams.value }, });
};

const deleteItem = async () => {
    try {
        await useCustomer().customerDelete({ id: routerParams.value });

        router.push({ name: "CustomerFilterViewComponent" });

    } catch (error) {
        loading.value = false;
        alert(error.message);
    }
};

onMounted(() => {
    if (routerParams.value) {
        getById();
    } else {
        router.push({ name: "CustomerFilterViewComponent" });
    }
});
</script>

<template>
    <AppTemplateComponent>
        <template v-slot:content>
            <BaseBackButton redirect="CustomerFilterViewComponent" />
            <section>
                <section class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12" v-if="!loading">
                    <h2 class="mb-10 text-left text-4xl font-bold leading-9 tracking-tight text-blue900">
                        Cliente</h2>

                    <section class="flex w-full justify-end pr-1 mt-4">
                        <button @click="deleteItem">
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
                            src="https://ztdqsurxcyrlabzyhrud.supabase.co/storage/v1/object/public/src/images/oficina.png"
                            alt="cliente" />

                        <div class="text-blue900 w-full">
                            <div class="text-3xl font-bold pb-2">{{ form.name }}</div>
                            <section class="flex flex-wrap gap-4 pb-2" v-if="form.email">
                                <span v-if="form.email"
                                    class="gap-1 inline-flex items-center text-xs font-normal text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="w-5 h-5 text-orange900 icon icon-tabler icon-tabler-mail-filled" width="24"
                                        height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path
                                            d="M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z"
                                            stroke-width="0" fill="currentColor"></path>
                                        <path
                                            d="M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z"
                                            stroke-width="0" fill="currentColor"></path>
                                    </svg>
                                    <p class="text-base">{{ form.email }}</p>
                                </span>
                            </section>
                            <div v-if="form.description"
                                class="p-3 text-2xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-clouds">
                                {{ form.description }}</div>

                            <section class="flex flex-wrap gap-4 pt-4" v-if="form.address || form.phone">
                                <span v-if="form.address"
                                    class="gap-1 inline-flex items-center text-xs font-normal text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="w-5 h-5 text-orange900 icon icon-tabler icon-tabler-map-pin" width="24"
                                        height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                        <path
                                            d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z">
                                        </path>
                                    </svg>
                                    <p class="text-base">{{ form.address }}</p>
                                </span>

                                <span v-if="form.phone"
                                    class="gap-1 inline-flex items-center text-xs font-normal text-gray-500">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="w-5 h-5 text-orange900 icon icon-tabler icon-tabler-phone-call" width="24"
                                        height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path
                                            d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2">
                                        </path>
                                        <path d="M15 7a2 2 0 0 1 2 2"></path>
                                        <path d="M15 3a6 6 0 0 1 6 6"></path>
                                    </svg>
                                    <p class="text-base">{{ form.phone }}</p>
                                </span>
                            </section>

                        </div>
                    </section>

                    <div class="flex w-full justify-end pb-3">
                        <button @click="update()" type="button"
                            class="px-8 py-2 mr-2 text-sm font-semibold text-center text-gray-100 bg-black rounded-lg hover:bg-blue900 focus:outline-none">
                            Editar
                        </button>
                    </div>
                </section>
                <BaseSkeletonLoader v-else />
            </section>

            <section class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12" v-if="!loading">
                <h2 class="mb-10 text-left text-4xl font-bold leading-9 tracking-tight text-blue900">
                    Compresores de {{ form.name }} </h2>
            <ProductsByCustomerFilterViewComponent :customerId="routerParams" />
        </section>
    </template>
</AppTemplateComponent></template>
