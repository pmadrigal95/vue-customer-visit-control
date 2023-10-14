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
        </div>
    </div>
</template>