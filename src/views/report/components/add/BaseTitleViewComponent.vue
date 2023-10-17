<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },

    subtitle: {
        type: String,
        default: 'Seleccionar uno',
    },

    fnAction: {
        type: Function,
        default: undefined,
    },
});
</script>

<template>
    <div class="overflow-hidden bg-white dark:bg-gray-800 sm:rounded-lg">
        <div class="flex-row items-center justify-between p-4 space-y-3 sm:flex sm:space-y-0 sm:space-x-4">
            <div>
                <h5 class="mr-3 font-semibold dark:text-white">{{ title }}</h5>
                <p class="text-gray-500 dark:text-gray-400">{{ subtitle }}</p>
            </div>
            <div v-if="fnAction">
                <a @click="fnAction"
                    class="cursor-pointer mt-2 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue900 focus:z-10 focus:ring-4 focus:outline-none focus:ring-orange900 focus:text-blue900">
                    Regresar </a>
            </div>
        </div>
    </div>
</template>