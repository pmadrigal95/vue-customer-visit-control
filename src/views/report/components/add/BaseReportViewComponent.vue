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
    props.entity.prp  = undefined;
    props.entity.engineStarts = undefined;
    props.entity.observations = undefined;
    props.entity.notes = undefined;
    props.entity.loadRelay = undefined;
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

onMounted(() => {
    cleanReport();
});
</script>

<template>
    <BaseTitleViewComponent :title='`Reporte de visita ${entity.customerName}`' subtitle='Complete la información correspondiente.' :fnAction="returnProduct" />
    <BaseSkeletonLoader v-if='loading' />
    <section class="px-8 pb-2" v-else>
        <BaseCardInfoViewComponent :entity="entity" class="mb-3"/>
        <form class='space-y-6' @submit.prevent='insert()'>
                    <div>
                        <Input v-model='entity.visitDate' placeholder='Ingresa Fecha visita' label='Fecha Visita' required
                            type='date' />
                    </div>
                    <div>
                        <Input v-model='entity.totalHours' placeholder='Ingresa total de horas' label='Total de horas'
                            type='text' />
                    </div>
                    <div>
                        <Input v-model='entity.chargingHours' placeholder='Ingresa horas carga' label='Horas carga'
                            type='text' />
                    </div>
                    <div>
                        <Input v-model='entity.pPsi' placeholder='Ingresa P Psi' label='Horas carga' type='text' />
                    </div>
                    <div>
                        <Input v-model='entity.temperature' placeholder='Ingresa temperatura' label='Temperatura'
                            type='text' />
                    </div>
                    <div>
                        <Input v-model='entity.prp' placeholder='Ingresa PRP' label='PRP' type='text' />
                    </div>
                    <div>
                        <Input v-model='entity.engineStarts' placeholder='Ingresa Arranques Motor' label='Arranques Motor'
                            type='text' />
                    </div>
                    <div>
                        <Input v-model='entity.loadRelay' placeholder='Ingresa Relecarga' label='Relecarga' type='text' />
                    </div>
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