<script setup>
import BaseNavbar from '@/components/core/layout/BaseNavbar.vue';
</script>


<template>
    <section class="antialiased">
        <BaseNavbar />
        <main class="h-full w-full pt-20">
            <section class="container mx-auto">
                <slot name="content"></slot>
            </section>
        </main>

    </section>
</template>