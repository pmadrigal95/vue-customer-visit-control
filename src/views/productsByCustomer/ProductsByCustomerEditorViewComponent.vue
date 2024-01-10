<script setup>
import { useRouter } from "vue-router";
import { ref, watch, onMounted } from "vue";

// Use necessary composables
const router = useRouter();
import useBrand from "@/composables/UseBrand";
import useProduct from "@/composables/UseProduct";
import useProductsByCustomer from "@/composables/UseProductsByCustomer";

import { Input, Textarea, Select, Toggle } from 'flowbite-vue';

import BaseSkeletonLoader from '@/components/core/loaders/BaseSkeletonLoader.vue';
import AppTemplateComponent from '@/layouts/templates/app/AppTemplateComponent.vue';


let list = ref({
    brandList: [],
    productList: []
});

// keep up with form data
const form = ref({
    customerId: router.currentRoute.value.params.customerId,
    brandId: undefined,
    productId: undefined,
    serialKey: undefined,
    description: undefined,
    isBorrowed: false,
});

let loading = ref(false);

const routerParams = ref(router.currentRoute.value.params.Id);

const getBrandList = async () => {
    try {
        list.value.brandList = await useBrand().brandSelect();
    } catch (error) {
        alert(error.message);
    }
};

const getProductList = async ({ brandId }) => {
    try {
        list.value.productList = await useProduct().productSelect({ brandId });
    } catch (error) {
        alert(error.message);
    }
};

const getById = async () => {
    try {
        loading.value = true;
        const response = await useProductsByCustomer().getProductsByCustomerById({ id: routerParams.value });
        form.value = response;
        loading.value = false;
    } catch (error) {
        loading.value = false;
        alert(error.message);
    }
};

// call the proper insert method from the composable
// on the submit of the form
const insert = async () => {
    try {

        loading.value = true;
        await useProductsByCustomer().productsByCustomerInsert(form.value);
        router.push({ name: "CustomerDisplayViewComponent", params: { Id: router.currentRoute.value.params.customerId }, });
    } catch (error) {
        loading.value = false;
        alert(error.message);
    }
};

// call the proper insert method from the composable
// on the submit of the form
const update = async () => {
    try {
        loading.value = true;
        await useProductsByCustomer().productsByCustomerUpdate(form.value);
        router.push({ name: "CustomerDisplayViewComponent", params: { Id: router.currentRoute.value.params.customerId }, });
    } catch (error) {
        loading.value = false;
        alert(error.message);
    }
};

const callToAction = () => {
    if (routerParams.value) {
        update();
    } else {
        insert();
    }
};

onMounted(() => {
    getBrandList();

    if (routerParams.value) {
        getById();
    }
});

watch(
    () => form.value.brandId,
    (brandId) => {
        getProductList({ brandId });
    }
);

</script>


<template>
    <AppTemplateComponent>
        <template v-slot:content>
            <router-link :to="{ name: 'CustomerDisplayViewComponent', params: { Id:
                router.currentRoute.value.params.customerId} }">
                <section class="flex flex-row justify-start ml-2">
                    <button type="button"
                        class="text-white bg-blue800 hover:bg-blue900 focus:ring-4 focus:outline-none focus:ring-orange900 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-badge-left-filled"
                            width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path
                                d="M17 6h-6a1 1 0 0 0 -.78 .375l-4 5a1 1 0 0 0 0 1.25l4 5a1 1 0 0 0 .78 .375h6l.112 -.006a1 1 0 0 0 .669 -1.619l-3.501 -4.375l3.5 -4.375a1 1 0 0 0 -.78 -1.625z"
                                stroke-width="0" fill="currentColor"></path>
                        </svg>
                    </button>
                </section>
            </router-link>
            <section class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12" v-if=" !loading ">
                <h2 class="mb-10 text-left text-4xl font-bold leading-9 tracking-tight text-blue900">
                    Compresor</h2>
                <form class="space-y-6" @submit.prevent="callToAction()">
                    <div>
                        <Select v-model.number=" form.brandId " :options=" list.brandList " placeholder="Ingresa su marca"
                            label="Marca" required />
                    </div>
                    <div>
                        <Select v-model.number=" form.productId " :options=" list.productList " placeholder="Ingresa su modelo del compresor"
                            label="Compresor" required />
                    </div>
                    <div>
                        <Input v-model.trim=" form.serialKey " placeholder="Ingresa su serie" label="Serie" required type="text" />
                    </div>
                    <div>
                        <Toggle v-model=" form.isBorrowed " label="Es alquilado" />
                    </div>
                    <div>
                        <Textarea v-model.trim=" form.nextMaintenance " rows="4" placeholder="Ingresa su próximo mantenimiento"
                            label="Información relacionada al próximo mantenimiento" />
                    </div>
                    <div>
                        <Textarea v-model.trim=" form.description " rows="4" placeholder="Ingresa su descripción"
                            label="Descripción" />
                    </div>
                    <div>
                        <button type="submit"
                            class="w-full text-white bg-blue800 hover:bg-blue900 focus:ring-4 focus:outline-none focus:ring-orange900 first-letter:font-medium rounded-lg text-sm px-5 py-2.5 text-center">Guardar</button>
                    </div>
                </form>
            </section>
            <BaseSkeletonLoader v-else />
        </template>
    </AppTemplateComponent>
</template>