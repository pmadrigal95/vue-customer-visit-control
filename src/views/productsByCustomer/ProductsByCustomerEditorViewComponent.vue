<script setup>
import { useRouter } from "vue-router";
import { ref, watch, onMounted } from "vue";

// Use necessary composables
const router = useRouter();
import useBrand from "@/composables/UseBrand";
import useProduct from "@/composables/UseProduct";
import useProductsByCustomer from "@/composables/UseProductsByCustomer";

import { Input, Textarea, Select, Toggle  } from 'flowbite-vue';

import BaseSkeletonLoader from '@/components/core/loaders/BaseSkeletonLoader.vue';
import AppTemplateComponent from '@/layouts/templates/app/AppTemplateComponent.vue';


let list = ref({
    brandList : [],
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
            <section class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12" v-if="!loading">
                <h2 class="mb-10 text-left text-4xl font-bold leading-9 tracking-tight text-blue900">
                    Producto</h2>
                <form class="space-y-6" @submit.prevent="callToAction()">
                    <div>
                        <Select v-model="form.brandId" :options="list.brandList" placeholder="Ingresa su marca / provedor"
                            label="Marca / Provedor" required />
                    </div>
                    <div>
                        <Select v-model="form.productId" :options="list.productList" placeholder="Ingresa su producto"
                            label="Producto" required />
                    </div>
                    <div>
                        <Input v-model="form.serialKey" placeholder="Ingresa su serie" label="Serie" required type="text" />
                    </div>
                    <div>
                        <Toggle v-model="form.isBorrowed" label="Es alquilado" />
                    </div>
                    <div>
                        <Textarea v-model="form.description" rows="4" placeholder="Ingresa su descripción"
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