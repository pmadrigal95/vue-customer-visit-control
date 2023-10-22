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
                    <BaseCardInfoViewComponent :entity="form" class="mb-3"/>
                <form class='space-y-6' @submit.prevent='update()'>
                    <div>
                        <Input v-model='form.visitDate' placeholder='Ingresa Fecha visita' label='Fecha Visita' required
                            type='date' />
                    </div>
                    <div>
                        <Input v-model='form.totalHours' placeholder='Ingresa total de horas' label='Total de horas'
                            type='number' />
                    </div>
                    <div>
                        <Input v-model='form.chargingHours' placeholder='Ingresa horas carga' label='Horas carga'
                            type='number' />
                    </div>
                    <div>
                        <Input v-model='form.pPsi' placeholder='Ingresa Presión Psi' label='Presión psi' type='number' />
                    </div>
                    <div>
                        <Input v-model='form.temperature' placeholder='Ingresa temperatura' label='Temperatura'
                            type='text' />
                    </div>
                    <div>
                        <Input v-model='form.prp' placeholder='Ingresa Punto de rocío PRP' label='Punto de rocío PRP' type='number' />
                    </div>
                    <div>
                        <Input v-model='form.engineStarts' placeholder='Ingresa Arranques Motor' label='Arranques Motor'
                            type='number' />
                    </div>
                    <div>
                        <Input v-model='form.loadRelay' placeholder='Ingresa Relecarga' label='Relecarga' type='number' />
                    </div>
                    <div>
                        <Input v-model='form.loadPercentage' placeholder='Ingresa porcentaje carga' label='Porcentaje Carga (%)' type='number' />
                    </div>
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
            <BaseSkeletonLoader v-else />
        </template>
    </AppTemplateComponent>
</template>
