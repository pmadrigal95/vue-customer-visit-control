<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import { Input, Textarea  } from 'flowbite-vue';

import BaseSkeletonLoader from '@/components/core/loaders/BaseSkeletonLoader.vue';

// Use necessary composables
const router = useRouter();
import useBrand from "@/composables/UseBrand";

import BaseBackButton from '@/components/core/buttons/BaseBackButton.vue';

import AppTemplateComponent from '@/layouts/templates/app/AppTemplateComponent.vue';

// keep up with form data
const form = ref({
    name: "",
    description: "",
});

let loading = ref(false);

// call the proper insert method from the AuthUser composable
// on the submit of the form
const insert = async () => {
    try {

        loading.value = true;
        await useBrand().brandInsert(form.value);
        router.push({ name: "BrandFilterViewComponent" });
    } catch (error) {
        loading.value = false;
        alert(error.message);
    }
};
</script>

<template>
    <AppTemplateComponent>
        <template v-slot:content>
            <BaseBackButton redirect="BrandFilterViewComponent" />
            <section class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12" v-if="!loading">
                <h2 class="mb-10 text-left text-4xl font-bold leading-9 tracking-tight text-blue900">
                    Provedor</h2>
                <form class="space-y-6" @submit.prevent="insert()">
                    <div>
                        <Input v-model="form.name" placeholder="Ingresa su nombre" label="Nombre" required
                            type="text" />
                    </div>
                    <div>
                        <Textarea v-model="form.description" rows="4" placeholder="Ingresa su descripción" label="Descripción" />
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
