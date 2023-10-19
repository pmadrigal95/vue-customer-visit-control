<script setup>

import { ref } from 'vue';

import { Input } from 'flowbite-vue';

import { baseDateHelper } from "@/helpers/baseDateHelper";

import BaseReportListViewComponent from '@/views/report/components/search/BaseReportListViewComponent.vue';

import BaseReportDetailsViewComponent from '@/views/report/components/search/BaseReportDetailsViewComponent.vue';

let componentKey = ref(0);

// keep up with form data
const entity = ref({
    step: 0,
    reportId: undefined,
    companyName: undefined,
    inititalDate: baseDateHelper.$_getInitialDayFormat(),
    endDate: baseDateHelper.$_getFinalDayFormat(),
});

const search = () => { 
    entity.value.reportId = undefined;
    entity.value.step = 0;
    componentKey.value++;
};

</script>

<template>
    <section class="w-full h-full bg-white rounded-xl mx-auto md:mb-4 -mt-8 md:-mt-14">
        <form class='px-4 py-2 space-y-6' @submit.prevent='search()'>
            <div>
                <Input v-model='entity.companyName' placeholder='Ingresa nombre de cliente' label='Cliente' type='text' />
            </div>

            <div>
                <Input v-model='entity.inititalDate' label='Fecha Inicio' required type='date' />
            </div>

            <div>
                <Input v-model='entity.endDate' label='Fecha Final' required type='date' />
            </div>

            <div>
                <button type='submit'
                    class='w-full text-white bg-blue800 hover:bg-blue900 focus:ring-4 focus:outline-none focus:ring-orange900 first-letter:font-medium rounded-lg text-sm px-5 py-2.5 text-center'>Buscar</button>
            </div>
        </form>
    </section>
    <section class="w-full h-full bg-white rounded-xl mx-auto md:mb-4" :key="componentKey">
        <BaseReportListViewComponent :entity="entity" v-if="entity.step == 0" />

        <BaseReportDetailsViewComponent :entity="entity" v-if="entity.step == 1" />
    </section>
</template>