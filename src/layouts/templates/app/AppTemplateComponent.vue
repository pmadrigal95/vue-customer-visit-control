<script setup>
import BaseNavbar from '@/components/core/layout/BaseNavbar.vue';
</script>


<template>
    <section class="antialiased">
        <BaseNavbar />
        <main class="p-4 md:ml-64 h-full w-full pt-20">
            <slot name="content"></slot>

        </main>

    </section>
</template>