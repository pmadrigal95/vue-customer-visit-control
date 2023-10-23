<script setup>
import { ref, onMounted } from 'vue';

import { useRouter } from 'vue-router';

// Use necessary composables
const router = useRouter();
import useVisitControl from '@/composables/UseVisitControl';

import { Input, Textarea } from 'flowbite-vue';

import BaseTitleViewComponent from '@/views/report/components/add/BaseTitleViewComponent.vue';

import BaseSkeletonLoader from '@/components/core/loaders/BaseSkeletonLoader.vue';

import BaseCardInfoViewComponent from '@/views/report/components/editor/BaseCardInfoViewComponent.vue';

const props = defineProps({
    entity: {
        type: Object,
        required: true,
    },
});

let loading = ref(false);

const cleanReport = () => {
    props.entity.visitDate = undefined;
    props.entity.totalHours = undefined;
    props.entity.chargingHours = undefined;
    props.entity.pPsi = undefined;
    props.entity.temperature = undefined;
    props.entity.prp = undefined;
    props.entity.engineStarts = undefined;
    props.entity.observations = undefined;
    props.entity.notes = undefined;
    props.entity.loadRelay = undefined;
    props.entity.loadPercentage = undefined;
};

const returnProduct = () => {
    cleanReport();
    props.entity.step = 1;
};

// call the proper insert method from the composable
// on the submit of the form
const insert = async () => {
    try {
        loading.value = true;
        const id = await useVisitControl().visitControlInsert(props.entity);
        router.push({ name: 'ReportDisplayViewComponent', params: { Id: id }, });
    } catch (error) {
        loading.value = false;
        alert(error.message);
    }
};


const setLoadPercentage = () => {
    try {
        if (!props.entity.totalHours || !props.entity.chargingHours) {
            throw new Error('No se puede realizar el cálculo');
        }

        props.entity.loadPercentage = ((props.entity.chargingHours / props.entity.totalHours) * 100).toFixed(2);
    } catch (error) {
        alert(error.message);
    }
};

onMounted(() => {
    cleanReport();
});
</script>

<template>
    <BaseTitleViewComponent :title='`Reporte de visita ${entity.customerName}`'
        subtitle='Complete la información correspondiente.' :fnAction="returnProduct" />
    <BaseSkeletonLoader v-if='loading' />
    <section class="px-8 pb-2" v-else>
        <BaseCardInfoViewComponent :entity="entity" class="mb-3" />
        <form class='space-y-6' @submit.prevent='insert()'>
            <div>
                <Input v-model='entity.visitDate' placeholder='Ingresa Fecha visita' label='Fecha Visita' required
                    type='date' />
            </div>
            <div>
                <Input v-model='entity.totalHours' placeholder='Ingresa total de horas' label='Total de horas'
                    type='number' />
            </div>
            <div>
                <Input v-model='entity.chargingHours' placeholder='Ingresa horas carga' label='Horas carga' type='number' />
            </div>
            <div>
                <Input v-model='entity.pPsi' placeholder='Ingresa Presión Psi' label='Presión psi' type='number' />
            </div>
            <div>
                <Input v-model='entity.temperature' placeholder='Ingresa temperatura' label='Temperatura' type='text' />
            </div>
            <div>
                <Input v-model='entity.prp' placeholder='Ingresa Punto de rocío PRP' label='Punto de rocío PRP'
                    type='number' />
            </div>
            <div>
                <Input v-model='entity.engineStarts' placeholder='Ingresa Arranques Motor' label='Arranques Motor'
                    type='number' />
            </div>
            <div>
                <Input v-model='entity.loadRelay' placeholder='Ingresa Relecarga' label='Relecarga' type='number' />
            </div>
            <section class="flex gap-4">
                <Input v-model='entity.loadPercentage' placeholder='Ingresa Porcentaje carga' label='Porcentaje Carga (%)'
                    type='number' step=".01" class="grow" />
                <button type="button" @click="setLoadPercentage"
                    class="border border-white bg-white focus:ring-4 focus:outline-none focus:ring-orange900 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="text-blue900 icon icon-tabler icon-tabler-calculator"
                        width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 3m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                        <path d="M8 7m0 1a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v1a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1z"></path>
                        <path d="M8 14l0 .01"></path>
                        <path d="M12 14l0 .01"></path>
                        <path d="M16 14l0 .01"></path>
                        <path d="M8 17l0 .01"></path>
                        <path d="M12 17l0 .01"></path>
                        <path d="M16 17l0 .01"></path>
                    </svg></button>
            </section>
            <div>
                <Textarea v-model='entity.observations' rows='4' placeholder='Ingresa Observaciones'
                    label='Observaciones' />
            </div>
            <div>
                <Textarea v-model='entity.notes' rows='4' placeholder='Ingresa notas' label='Notas' />
            </div>
            <div>
                <button type='submit'
                    class='w-full text-white bg-blue800 hover:bg-blue900 focus:ring-4 focus:outline-none focus:ring-orange900 first-letter:font-medium rounded-lg text-sm px-5 py-2.5 text-center'>Guardar</button>
            </div>
        </form>
    </section>
</template>