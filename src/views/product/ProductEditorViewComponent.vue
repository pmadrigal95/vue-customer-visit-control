<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

// Use necessary composables
const router = useRouter();

import useBrand from "@/composables/UseBrand";

import useProduct from "@/composables/UseProduct";

import { Input, Textarea, Select, Toggle } from 'flowbite-vue';

import BaseSkeletonLoader from '@/components/core/loaders/BaseSkeletonLoader.vue';

import BaseBackButton from '@/components/core/buttons/BaseBackButton.vue';

import AppTemplateComponent from '@/layouts/templates/app/AppTemplateComponent.vue';

// keep up with form data
const form = ref({
    name: "",
    description: "",
    brandId: undefined,
});

let loading = ref(false);

let list = ref([]);

const routerParams = ref(router.currentRoute.value.params.Id);

// call the proper insert method from the composable
// on the submit of the form
const insert = async () => {
    try {

        loading.value = true;
        await useProduct().productInsert(form.value);
        router.push({ name: "ProductFilterViewComponent" });
    } catch (error) {
        loading.value = false;
        alert(error.message);
    }
};

const getById = async () => {
    try {
        loading.value = true;
        const response = await useProduct().getProductById({ id: routerParams.value });
        form.value = response;
        loading.value = false;
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
        await useProduct().productUpdate(form.value);
        router.push({ name: "ProductFilterViewComponent" });
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

const getBrandList = async () => {
    try {
        list.value = await useBrand().brandSelect();
    } catch (error) {
        alert(error.message);
    }
};

onMounted(() => {
    getBrandList();

    if (routerParams.value) {
        getById();
    }
});
</script>

<template>
    <AppTemplateComponent>
        <template v-slot:content>
            <BaseBackButton redirect="ProductFilterViewComponent" />
            <section class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12" v-if="!loading">
                <h2 class="mb-10 text-left text-4xl font-bold leading-9 tracking-tight text-blue900">
                    Compresor</h2>
                <form class="space-y-6" @submit.prevent="callToAction()">
                    <div>
                        <Input v-model.trim="form.name" placeholder="Ingresa su nombre del modelo del compresor" label="Nombre del modelo del compresor" required type="text" />
                    </div>
                    <div>
                        <Select v-model.number="form.brandId" :options="list" placeholder="Ingresa su marca del compresor"
                            label="Marca del compresor" required />
                    </div>
                    <div>
                        <Toggle v-model.trim="form.dynamicPercentage" label="Es velocidad variable" />
                    </div>
                    <div>
                        <Textarea v-model.trim="form.description" rows="4" placeholder="Ingresa su descripción"
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
