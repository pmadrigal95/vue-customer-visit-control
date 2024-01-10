<script setup>
import { ref, onMounted, watch } from 'vue';

import { Modal, Input, Select, Toggle } from 'flowbite-vue';

import { baseDateHelper } from "@/helpers/baseDateHelper";

import useCustomer from "@/composables/UseCustomer";

import useProductsByCustomer from "@/composables/UseProductsByCustomer";

import useVisitControl from "@/composables/UseVisitControl";

import { baseJsonToXlsxHelper } from "@/helpers/baseJsonToXlsxHelper.js";

import BaseSkeletonLoader from '@/components/core/loaders/BaseSkeletonLoader.vue';

let loading = ref(false);

const isShowModal = ref(false);

let list = ref({
    customerList: [],
    productList: []
});

// keep up with form data
const entity = ref({
    customerId: undefined,
    productId: undefined,
    initialDate: baseDateHelper.$_setCurrentWeek().firstday,
    endDate: baseDateHelper.$_setCurrentWeek().lastday,
    isCustomerReport: false,
    requiredDates: true,
});

const closeModal = () => {
    cleanEntity();
    isShowModal.value = false;
};

const showModal = () => {
    isShowModal.value = true;
};

const cleanEntity = () => {
    entity.value.customerId = undefined;
    entity.value.productId = undefined;
    entity.value.initialDate = baseDateHelper.$_setCurrentWeek().firstday;
    entity.value.endDate = baseDateHelper.$_setCurrentWeek().lastday;
    entity.value.isCustomerReport = false;
    entity.value.requiredDates = true;
};

const openCurrentWeekReport = () => {
    entity.value.isCustomerReport = false;
    entity.value.requiredDates = true;
    showModal();
};

const openCustomerReport = () => {
    entity.value.isCustomerReport = true;
    entity.value.requiredDates = false;
    showModal();
};

const getVisitControlReport = async () => {
    try {
        const response = entity.value.isCustomerReport ? await useVisitControl().visitControlReportByCustomer({
            query: {
                customerId: entity.value.customerId,
                productId: entity.value.productId,
                initDate: entity.value.requiredDates ? entity.value.initialDate : undefined,
                endDate: entity.value.requiredDates ? entity.value.endDate : undefined,
            },
        }) : await useVisitControl().visitControlReport({
            query: {
                initDate: entity.value.initialDate,
                endDate: entity.value.endDate,
            },
        });
        if (response?.content.length > 0) {
            generateReport({
                fileName: `Reporte de visitas-${entity.value.requiredDates ? entity.value.initialDate : ''}-${entity.value.requiredDates ? entity.value.endDate : ''}~${entity.value.customerId ? entity.value.customerId : ''}${entity.value.productId ? entity.value.productId : ''}`,
                data: [response],
            });

            closeModal();
        } else {
            throw new Error('No hay reportes de visitas!');
        }
    } catch (error) {
        alert(error.message);
    }
};

const generateReport = async ({ fileName, data }) => {
    try {
        baseJsonToXlsxHelper.$_generateXlsx({ fileName, data });
    } catch (error) {
        alert(error.message);
    }
};

const getCustomerList = async () => {
    try {
        list.value.customerList = await useCustomer().customerSelect();
    } catch (error) {
        alert(error.message);
    }
};

const getProductList = async ({ customerId }) => {
    try {
        if (customerId) {
            list.value.productList = await useProductsByCustomer().productsByCustomerSelect({ customerId });
        } else {
            list.value.productList = [];
        }
    } catch (error) {
        alert(error.message);
    }
};

onMounted(() => {
    getCustomerList();
});

watch(
    () => entity.value.customerId,
    (customerId) => {
        getProductList({ customerId });
    }
);
</script>


<template>
    <div class="flex flex-wrap md:flex-row md:justify-end gap-4 mb-4 justify-center">
        <button @click="openCurrentWeekReport"
            class=" text-white bg-blue800 hover:bg-blue900 focus:ring-4 focus:outline-none focus:ring-orange900 first-letter:font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
            Reporte de visitas semanal</button>

        <button @click="openCustomerReport"
            class=" text-white bg-blue800 hover:bg-blue900 focus:ring-4 focus:outline-none focus:ring-orange900 first-letter:font-medium rounded-lg text-sm px-5 py-2.5 text-center">Reporte
            por
            Cliente</button>
    </div>
    <Modal v-if="isShowModal" @close="closeModal">
        <template #header>
            <div class="flex items-center text-lg">
                Generar Excel
            </div>
        </template>
        <template #body>
            <BaseSkeletonLoader v-if="loading" />
            <section v-else>
                <form class="space-y-6" @submit.prevent="getVisitControlReport()" v-if="!loading">
                    <section v-if="entity.isCustomerReport">
                        <div class="mb-2">
                            <Select v-model.number="entity.customerId" :options="list.customerList"
                                placeholder="Ingresa el cliente" label="Cliente" required />
                        </div>
                        <div class="mb-4">
                            <Select v-model.number="entity.productId" :options="list.productList"
                                placeholder="Ingresa el compresor" label="Compresor" required />
                        </div>
                        <div class="mb-2">
                            <Toggle v-model.trim="entity.requiredDates" label="Seleccionar rango de fechas" />
                        </div>
                    </section>

                    <section v-if="entity.requiredDates">
                        <div class="mb-2">
                            <Input v-model.trim='entity.initialDate' label='Fecha Inicio' required type='date' />
                        </div>

                        <div class="mb-2">
                            <Input v-model.trim='entity.endDate' label='Fecha Final' required type='date' />
                        </div>
                    </section>
                    <div class="flex justify-between">
                        <button @click="closeModal" type="button"
                            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">
                            Cancelar
                        </button>
                        <button type="submit"
                            class="text-white bg-blue900 hover:bg-blue800 focus:ring-4 focus:outline-none focus:ring-orange900 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Generar
                        </button>
                    </div>
                </form>
            </section>
        </template>
    </Modal>
</template>