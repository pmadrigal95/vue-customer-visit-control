<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Use necessary composables
const router = useRouter();
import useCustomer from '@/composables/UseCustomer';

import { Input, Textarea } from 'flowbite-vue';

import BaseSkeletonLoader from '@/components/core/loaders/BaseSkeletonLoader.vue';

import BaseBackButton from '@/components/core/buttons/BaseBackButton.vue';

import AppTemplateComponent from '@/layouts/templates/app/AppTemplateComponent.vue';

// keep up with form data
const form = ref({
    name: '',
    address: '',
    phone: '',
    description: '',
    email: '',
});

let loading = ref(false);

const routerParams = ref(router.currentRoute.value.params.Id);

// call the proper insert method from the composable
// on the submit of the form
const insert = async () => {
    try {

        loading.value = true;
       const id = await useCustomer().customerInsert(form.value);
        router.push({ name: 'CustomerDisplayViewComponent' , params: { Id: id },});
    } catch (error) {
        loading.value = false;
        alert(error.message);
    }
};

const getById = async () => {
    try {
        loading.value = true;
        const response = await useCustomer().getCustomerById({id: routerParams.value});
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
        await useCustomer().customerUpdate(form.value);
        router.push({ name: 'CustomerDisplayViewComponent', params: { Id: form.value.id }, });
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
}

onMounted(() => {
    if (routerParams.value) {
        getById();
    }
});
</script>

<template>
    <AppTemplateComponent>
        <template v-slot:content>
            <BaseBackButton redirect='CustomerFilterViewComponent' />
            <section class='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12' v-if='!loading'>
                <h2 class='mb-10 text-left text-4xl font-bold leading-9 tracking-tight text-blue900'>
                    Cliente</h2>
                <form class='space-y-6' @submit.prevent='callToAction()'>
                    <div>
                        <Input v-model.trim='form.name' placeholder='Ingresa su nombre' label='Nombre' required type='text' />
                    </div>
                    <div>
                        <Input v-model.trim='form.email' placeholder='Ingresa su email ' label='Email ' type='email' />
                    </div>
                    <div>
                        <Input v-model.trim='form.address' placeholder='Ingresa su dirección' label='Dirección' type='text' />
                    </div>
                    <div>
                        <Input v-model.trim='form.phone' placeholder='Ingresa su teléfono ' label='Teléfono ' type='text' />
                    </div>
                    <div>
                        <Textarea v-model.trim='form.description' rows='4' placeholder='Ingresa su descripción'
                            label='Descripción' />
                    </div>
                    <div>
                        <button type='submit'
                            class='w-full text-white bg-blue800 hover:bg-blue900 focus:ring-4 focus:outline-none focus:ring-orange900 first-letter:font-medium rounded-lg text-sm px-5 py-2.5 text-center'>Guardar</button>
                    </div>
                </form>
            </section>
            <BaseSkeletonLoader v-else />
        </template>
    </AppTemplateComponent>
</template>
