<script setup>
import { Modal } from 'flowbite-vue'
import { ref } from 'vue'

const isShowModal = ref(false)
function closeModal() {
    isShowModal.value = false
}
function showModal() {
    isShowModal.value = true
}
</script>
<template>
    <button @click="showModal"
        class='text-white bg-blue800 hover:bg-blue900 focus:ring-4 focus:outline-none focus:ring-orange900 first-letter:font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
        Enviar por correo
    </button>
    <Modal :size="size" v-if="isShowModal" @close="closeModal">
        <template #header>
            <div class="flex items-center text-lg">
                Enviar Reporte por correo
            </div>
        </template>
        <template #body>
            
        </template>
        <template #footer>
            <div class="flex justify-between">
                <button @click="closeModal" type="button"
                    class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">
                    Cancelar
                </button>
                <button @click="closeModal" type="button"
                    class="text-white bg-blue900 hover:bg-blue800 focus:ring-4 focus:outline-none focus:ring-orange900 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Enviar
                </button>
        </div>
    </template>
</Modal></template>