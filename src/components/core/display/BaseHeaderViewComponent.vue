<script setup>

defineProps({
 title: {
  type: String,
  required: true,
 },
 showSubtitle: {
  type: Boolean,
  default: true,
 },
});

</script>

<template>
<section class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
    <h1
        class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-blue900 md:text-5xl lg:text-6xl">
        {{ title }}</h1>
    <p class="mb-8 md:mb-0 text-lg font-normal text-gray-600 lg:text-xl sm:px-16 xl:px-48" v-if="showSubtitle">
        Gestiona tus
        {{ title.toLowerCase() }} de manera eficiente y sin complicaciones.</p>
    <p
        class="text-lg font-normal text-gray-600 lg:text-xl sm:px-16 xl:px-48 hidden md:block" v-if="showSubtitle">
        Desde la
        creación hasta la actualización y eliminación de registros.</p>
</section>
</template>