<script setup>

defineProps({
 title: {
  type: String,
  required: true,
 },

 count: {
  type: [String, Number],
  required: true,
 },
});

</script>

<template>
    <div
        class="flex flex-col px-6 py-10 overflow-hidden bg-white hover:bg-gradient-to-br hover:from-orange900 hover:via-blue900 hover:to-blue800 rounded-xl shadow-lg duration-300 hover:shadow-2xl group">
        <div class="flex flex-row justify-between items-center">
            <div class="px-4 py-4 bg-gray-300  rounded-xl bg-opacity-30">
                <slot name="content"></slot>
            </div>
        </div>
        <h1 class="text-3xl sm:text-4xl xl:text-5xl font-bold text-gray-700 mt-12 group-hover:text-gray-50">{{ count }}</h1>
        <div class="flex flex-row justify-between group-hover:text-gray-200">
            <p>{{ title }}</p>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-orange900 group-hover:text-gray-200"
                    viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd" />
                </svg>
            </span>

        </div>
    </div>
</template>