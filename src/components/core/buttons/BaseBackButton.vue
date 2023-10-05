<script setup>

defineProps({
    redirect: {
        type: String,
        required: true,
    },
});

</script>

<template>
    <router-link :to="{ name: redirect }">
        <section class="flex flex-row justify-start ml-2">
            <button type="button"
                class="text-white bg-blue800 hover:bg-blue900 focus:ring-4 focus:outline-none focus:ring-orange900 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-badge-left-filled"
                    width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path
                        d="M17 6h-6a1 1 0 0 0 -.78 .375l-4 5a1 1 0 0 0 0 1.25l4 5a1 1 0 0 0 .78 .375h6l.112 -.006a1 1 0 0 0 .669 -1.619l-3.501 -4.375l3.5 -4.375a1 1 0 0 0 -.78 -1.625z"
                        stroke-width="0" fill="currentColor"></path>
                </svg>
            </button>
    </section>
</router-link></template>