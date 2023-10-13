<script setup>
import { ref, onMounted } from 'vue';

import { useRouter } from 'vue-router';

import html2pdf from 'html2pdf.js';

// Use necessary composables
const router = useRouter();

import useVisitControl from '@/composables/UseVisitControl';

import BaseSkeletonLoader from '@/components/core/loaders/BaseSkeletonLoader.vue';

import BaseSendEmailTemplateViewComponent from '@/views/report/components/display/BaseSendEmailTemplateViewComponent.vue';

const props = defineProps({
    id: {
        type: [Number, String],
        required: true,
    },
});


// keep up with form data
const form = ref({});

let loading = ref(false);

const getById = async () => {
    try {
        loading.value = true;
        const response = await useVisitControl().visitControlById({ id: props.id });
        form.value = response;
        loading.value = false;
    } catch (error) {
        loading.value = false;
        alert(error.message);
    }
};

const deleteItem = async () => {
    try {
        await useVisitControl().visitControlDelete({ id: props.id });

        router.push({ name: 'ReportFilterViewComponent' });

    } catch (error) {
        loading.value = false;
        alert(error.message);
    }
};

const exportToPDF = async () => {
    try {
        html2pdf(document.getElementById('report'), {
            margin: 1,
            filename: `report${form.value.customerName}-${form.value.visitDate}.pdf`,
            image: { type: 'jpeg', quality: 0.20 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'p' }
        });

    } catch (error) {
        alert(error.message);
    }
};

onMounted(() => {
    if (props.id) {
        getById();
    } else {
        router.push({ name: 'ReportFilterViewComponent' });
    }
});

</script>

<template>
    <section class='py-4 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-12' v-if='!loading'>
        <h2 class='mb-10 text-left text-4xl font-bold leading-9 tracking-tight text-blue900'>
            Reporte</h2>

        <section>
            <div class='flex flex-wrap md:flex-row md:justify-end gap-4 mb-4 md:-mt-10'>
                <button @click='exportToPDF'
                    class='text-white bg-blue800 hover:bg-blue900 focus:ring-4 focus:outline-none focus:ring-orange900 first-letter:font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                    Descargar
                </button>
                <BaseSendEmailTemplateViewComponent :entity="form" />
                <button
                    class='text-white bg-blue800 hover:bg-blue900 focus:ring-4 focus:outline-none focus:ring-orange900 first-letter:font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                    Editar
                </button>
                <button @click='deleteItem'
                    class='text-white bg-blue800 hover:bg-blue900 focus:ring-4 focus:outline-none focus:ring-orange900 first-letter:font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                    Eliminar
                </button>
            </div>
        </section>
        <div class='w-full mx-auto p-6 bg-white rounded-lg shadow-sm' id='report'>

            <div class='grid grid-cols-2 items-center'>
                <div>
                    <!--  Company logo  -->
                    <img src='https://ztdqsurxcyrlabzyhrud.supabase.co/storage/v1/object/public/src/images/flotec.png'
                        alt='company-logo' height='100' width='100'>
                </div>

                <div class='text-right'>
                    <p>
                        Grupo Flotec.
                    </p>
                    <p class='text-gray-500 text-sm'>
                        ventas16@grupoflotec.com
                    </p>
                    <p class='text-gray-500 text-sm mt-1'>
                        (+506) 7108 7038
                    </p>
                    <p class='text-gray-500 text-sm mt-1'>
                        Julio Madrigal Ruiz
                    </p>
                </div>
            </div>

            <!-- Client info -->
            <div class='grid grid-cols-2 items-center mt-8'>
                <div>
                    <p class='font-bold text-gray-800'>
                        Cliente :
                    </p>
                    <p class='text-gray-500'>
                        {{ form.customerName }}
                        <br />
                        <span v-if="form.customerEmail">{{ form.customerEmail }}</span>
                    </p>
                </div>

                <div class='text-right'>
                    <p>
                        Producto:
                        <span class='text-gray-500'>{{ `${form.brandName} ${form.productName}` }}</span>
                    </p>
                    <p>
                        Número de serie: <span class='text-gray-500'>{{ form.productByCustomerSerialKey }}</span>
                        <br />
                        Fecha de visita: <span class='text-gray-500'>{{ form.visitDate }}</span>
                    </p>
                </div>
            </div>

            <!-- Invoice Items -->
            <div class='-mx-4 mt-8 flow-root sm:mx-0'>
                <table class='min-w-full'>
                    <colgroup>
                        <col class='w-full sm:w-1/2'>
                        <col class='sm:w-1/6'>
                    </colgroup>
                    <thead class='border-b border-gray-300 text-gray-900'>
                        <tr>
                            <th scope='col' class='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'>
                                Categoría
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class='border-b border-gray-200' v-if='form.totalHours'>
                            <td class='max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0'>
                                <div class='font-medium text-gray-900'>Horas Totales</div>
                            </td>
                            <td class='py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0'>{{ form.totalHours }}</td>
                        </tr>

                        <tr class='border-b border-gray-200' v-if='form.chargingHours'>
                            <td class='max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0'>
                                <div class='font-medium text-gray-900'>Horas Carga</div>
                            </td>
                            <td class='py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0'>{{ form.chargingHours }}
                            </td>
                        </tr>
                        <tr class='border-b border-gray-200' v-if='form.pPsi'>
                            <td class='max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0'>
                                <div class='font-medium text-gray-900'>P psi</div>
                            </td>
                            <td class='py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0'>{{ form.pPsi }}</td>
                        </tr>

                        <tr class='border-b border-gray-200' v-if='form.temperature'>
                            <td class='max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0'>
                                <div class='font-medium text-gray-900'>Temperatura</div>
                            </td>
                            <td class='py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0'>{{ form.temperature }}</td>
                        </tr>

                        <tr class='border-b border-gray-200' v-if='form.prp'>
                            <td class='max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0'>
                                <div class='font-medium text-gray-900'>PRP</div>
                            </td>
                            <td class='py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0'>{{ form.prp }}</td>
                        </tr>
                        <tr class='border-b border-gray-200' v-if='form.engineStarts'>
                            <td class='max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0'>
                                <div class='font-medium text-gray-900'>Arranques Motor</div>
                            </td>
                            <td class='py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0'>{{ form.engineStarts }}</td>
                        </tr>
                        <tr class='border-b border-gray-200' v-if='form.loadRelay'>
                            <td class='max-w-0 py-5 pl-4 pr-3 text-sm sm:pl-0'>
                                <div class='font-medium text-gray-900'>Rele Carga</div>
                            </td>
                            <td class='py-5 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-0'>{{ form.loadRelay }}</td>
                        </tr>
                    </tbody>
                </table>

                <div class='text-left mt-10'>
                    <p>
                        Observaciones
                    </p>
                    <p class='text-gray-500 text-sm'>
                        {{ form.observations }}
                    </p>
                </div>
            </div>
        </div>
    </section>

    <BaseSkeletonLoader v-else />
</template>