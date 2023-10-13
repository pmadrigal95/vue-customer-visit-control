<script setup>
// import { useRouter } from "vue-router";
// const router = useRouter();

const props = defineProps({
    list: {
        type: Array,
        default: [],
    },

    fnDelete: {
        type: Function,
        requiered: true,
    }
});

// const update = (id) => {
//     router.push({ name: "CustomerDisplayViewComponent", params: { Id: id }, });
// };

const deleteItem = async (id) => {
    props.fnDelete(id);
};

</script>


<template>
    <div class="w-full max-w-6xl mx-auto px-4 md:px-6 py-2">
        <div class="flex flex-col justify-center divide-y divide-slate-200 [&>*]:py-16">

            <div class="w-full">

                <!-- Vertical Timeline #1 -->
                <div class="-my-6">

                    <!-- Item #1 -->
                    <div class="relative pl-8 sm:pl-32 py-6 group" v-for="item in list" :key="item.id">
                        <section class="flex w-full justify-end pr-1 mt-4">
                            <button @click="deleteItem(item.id)">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                    class="w-6 h-6 text-black fill-current hover:text-blue900">
                                    <path fill-rule="evenodd"
                                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                        clip-rule="evenodd" />
                                </svg>
                            </button>
                        </section>
                        <!-- Purple label -->
                        <div v-if="item.customerName" class="font-caveat font-medium text-2xl text-blue900 mb-1 sm:mb-0">{{
                            item.customerName }}</div>
                        <!-- Vertical line (::before) ~ Date ~ Title ~ Circle marker (::after) -->
                        <div
                            class="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-blue900 after:border-4 after:box-content after:border-orange900 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
                            <time
                                class="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-white bg-blue800 rounded-full">{{
                                    item.visitDate }}</time>
                            <div v-if="item.productName || item.brandName" class="text-xl font-bold text-slate-900">{{
                                `${item.productName} (${item.brandName})` }}</div>
                        </div>
                        <!-- Content -->
                        <div v-if="item.observations"
                            class="p-3 text-2xs italic font-normal text-gray-500 border border-gray-200 rounded-lg">{{
                                item.observations }}</div>
                        <a
                            class="mt-2 inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue900 focus:z-10 focus:ring-4 focus:outline-none focus:ring-orange900 focus:text-blue900"> Ver mas <svg class="w-3 h-3 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M1 5h12m0 0L9 1m4 4L9 9" />
                            </svg></a>

                    </div>
                </div>

            </div>

    </div>
</div></template>