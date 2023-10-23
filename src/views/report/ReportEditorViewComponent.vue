<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Use necessary composables
const router = useRouter();
import useVisitControl from '@/composables/UseVisitControl';

import { Input, Textarea } from 'flowbite-vue';

import BaseSkeletonLoader from '@/components/core/loaders/BaseSkeletonLoader.vue';

import BaseBackButton from '@/components/core/buttons/BaseBackButton.vue';

import AppTemplateComponent from '@/layouts/templates/app/AppTemplateComponent.vue';

import BaseCardInfoViewComponent from '@/views/report/components/editor/BaseCardInfoViewComponent.vue';

// keep up with form data
const form = ref({});

let loading = ref(false);

const routerParams = ref(router.currentRoute.value.params.Id);

const getById = async () => {
    try {
        loading.value = true;
        const response = await useVisitControl().visitControlById({ id: routerParams.value });
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
        await useVisitControl().visitControlUpdate(form.value);
        router.push({ name: 'ReportDisplayViewComponent', params: { Id: form.value.id }, });
    } catch (error) {
        loading.value = false;
        alert(error.message);
    }
};

const setLoadPercentage = () => {
    try {
        if (!form.value.totalHours || !form.value.chargingHours) {
            throw new Error('No se puede realizar el cálculo');
        }

        form.value.loadPercentage = ((form.value.chargingHours / form.value.totalHours) * 100).toFixed(2);
    } catch (error) {
        alert(error.message);
    }
};

onMounted(() => {
    if (routerParams.value) {
        getById();
    } else {
        router.push({ name: 'ReportFilterViewComponent' });
    }
});
</script>

<template>
    <AppTemplateComponent>
        <template v-slot:content>
            <BaseBackButton redirect='ReportFilterViewComponent' />
            <section class='py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12' v-if='!loading'>
                <h2 class='mb-10 text-left text-4xl font-bold leading-9 tracking-tight text-blue900'>
                    Reporte</h2>
                <BaseCardInfoViewComponent :entity="form" class="mb-3" />

                <section class="bg-white rounded-lg px-10 py-5">
                    <form class='space-y-6' @submit.prevent='update()'>
                        <div>
                            <Input v-model='form.visitDate' placeholder='Ingresa Fecha visita' label='Fecha Visita' required
                                type='date' />
                        </div>
                        <div>
                            <Input v-model='form.totalHours' placeholder='Ingresa total de horas' label='Total de horas'
                                type='number' step=".01" />
                        </div>
                        <div>
                            <Input v-model='form.chargingHours' placeholder='Ingresa horas carga' label='Horas carga'
                                type='number' step=".01" />
                        </div>
                        <div>
                            <Input v-model='form.pPsi' placeholder='Ingresa Presión Psi' label='Presión psi' type='number'
                                step=".01" />
                        </div>
                        <div>
                            <Input v-model='form.temperature' placeholder='Ingresa temperatura' label='Temperatura'
                                type='text' />
                        </div>
                        <div>
                            <Input v-model='form.prp' placeholder='Ingresa Punto de rocío PRP' label='Punto de rocío PRP'
                                type='number' step=".01" />
                        </div>
                        <div>
                            <Input v-model='form.engineStarts' placeholder='Ingresa Arranques Motor' label='Arranques Motor'
                                type='number' step=".01" />
                        </div>
                        <div>
                            <Input v-model='form.loadRelay' placeholder='Ingresa Relecarga' label='Relecarga' type='number'
                                step=".01" />
                        </div>
                        <section class="flex gap-4">
                            <Input v-model='form.loadPercentage' placeholder='Ingresa Porcentaje carga'
                                label='Porcentaje Carga (%)' type='number' step=".01" class="grow" />
                            <button type="button" @click="setLoadPercentage"
                                class="border border-white bg-white focus:ring-4 focus:outline-none focus:ring-orange900 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="text-blue900 icon icon-tabler icon-tabler-calculator" width="24" height="24"
                                    viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path
                                        d="M4 3m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z">
                                    </path>
                                    <path d="M8 7m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z">
                                    </path>
                                    <path d="M8 14l0 .01"></path>
                                    <path d="M12 14l0 .01"></path>
                                    <path d="M16 14l0 .01"></path>
                                    <path d="M8 17l0 .01"></path>
                                    <path d="M12 17l0 .01"></path>
                                    <path d="M16 17l0 .01"></path>
                                </svg></button>
                        </section>
                        <div>
                            <Textarea v-model='form.observations' rows='4' placeholder='Ingresa Observaciones'
                                label='Observaciones' />
                        </div>
                        <div>
                            <Textarea v-model='form.notes' rows='4' placeholder='Ingresa notas' label='Notas' />
                        </div>
                        <div>
                            <button type='submit'
                                class='w-full text-white bg-blue800 hover:bg-blue900 focus:ring-4 focus:outline-none focus:ring-orange900 first-letter:font-medium rounded-lg text-sm px-5 py-2.5 text-center'>Guardar</button>
                        </div>
                    </form>
                </section>
            </section>
            <BaseSkeletonLoader v-else />
    </template>
</AppTemplateComponent></template>
