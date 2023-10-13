<script setup>
import { ref } from 'vue';

import emailjs from 'emailjs-com';

import { Modal, Input } from 'flowbite-vue';

import BaseSkeletonLoader from '@/components/core/loaders/BaseSkeletonLoader.vue';


const props = defineProps({
    entity: {
        type: Object,
        required: true,
    },
});

let loading = ref(false);

const isShowModal = ref(false);

const closeModal = () => {
    isShowModal.value = false;
};

const showModal = () => {
    isShowModal.value = true;
};

const setInstance = () => {
    return {
        visitDate: props.entity.visitDate,
        customerName: props.entity.customerName,
        productName: `${props.entity.brandName} ${props.entity.productName}`,
        productByCustomerSerialKey: props.entity.productByCustomerSerialKey,
        totalHours: props.entity.totalHours,
        chargingHours: props.entity.chargingHours,
        pPsi: props.entity.pPsi,
        temperature: props.entity.temperature,
        prp: props.entity.prp,
        engineStarts: props.entity.engineStarts,
        loadRelay: props.entity.loadRelay,
        to: props.entity.customerEmail,
        reply_to: "pablomadrigal.1995@gmail.com",
    };
}

const sendEmail = () => {
    loading.value = true;
    emailjs.send(import.meta.env.VITE_EMAILJS_BASE_SERVICE_ID, import.meta.env.VITE_EMAILJS_BASE_TEMPLATE_ID, setInstance(), import.meta.env.VITE_EMAILJS_BASE_USER_ID)
        .then(() => {
            alert('Message sent!');
            loading.value = false;
            closeModal();
        }, (error) => {
            alert('Message not sent', error);
            loading.value = false;
        });
};

</script>

<template>
    <button @click="showModal"
        class='text-white bg-blue800 hover:bg-blue900 focus:ring-4 focus:outline-none focus:ring-orange900 first-letter:font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
        Enviar por correo
    </button>
    <Modal v-if="isShowModal" @close="closeModal">
        <template #header>
            <div class="flex items-center text-lg">
                Enviar Reporte por correo
            </div>
        </template>
        <template #body>
            <form class="space-y-6" @submit.prevent="sendEmail()" v-if="!loading">
                <div class="w-full">
                    <Input v-model="entity.customerEmail" placeholder="correo electrónico" label="Correo electrónico"
                        required type="email" />
                </div>
                <div class="flex justify-between">
                    <button @click="closeModal" type="button"
                        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">
                        Cancelar
                    </button>
                    <button type="submit"
                        class="text-white bg-blue900 hover:bg-blue800 focus:ring-4 focus:outline-none focus:ring-orange900 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                        Enviar
                    </button>
                </div>
            </form>
            <BaseSkeletonLoader v-else />
        </template>
    </Modal>
</template>