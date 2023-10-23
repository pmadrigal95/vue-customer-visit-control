<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

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

const update = (id) => {
    router.push({ name: "CustomerDisplayViewComponent", params: { Id: id }, });
};

const deleteItem = async (id) => {
    props.fnDelete(id);
};

</script>

<template>
    <section class="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50">
        <ol class="mt-3 divide-y divider-gray-200">
            <li v-for="item in list" :key="item.id">
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
                <section class="items-center block p-3 sm:flex pb-4 rounded-lg">
                    <img class="w-15 h-12 mb-3 mr-3 sm:mb-0"
                        src="https://ztdqsurxcyrlabzyhrud.supabase.co/storage/v1/object/public/src/images/oficina.png"
                        alt="cliente" />

                    <div class="text-blue900 w-full">
                        <div class="text-4xl font-bold pb-2">{{ item.name }}</div>
                        <div v-if="item.description"
                            class="p-3 text-xl italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 ">
                            {{ item.description }}</div>

                        <section class="flex flex-wrap gap-4 pt-4" v-if="item.address || item.phone">
                            <span v-if="item.address"
                                class="gap-1 inline-flex items-center text-xs font-normal text-gray-500 ">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="w-5 h-5 text-orange900 icon icon-tabler icon-tabler-map-pin" width="24"
                                    height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                                    <path
                                        d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z">
                                    </path>
                                </svg>
                                <p class="text-xl">{{ item.address }}</p>
                            </span>

                            <span v-if="item.phone"
                                class="gap-1 inline-flex items-center text-xs font-normal text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="w-5 h-5 text-orange900 icon icon-tabler icon-tabler-phone-call" width="24"
                                    height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path
                                        d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2">
                                    </path>
                                    <path d="M15 7a2 2 0 0 1 2 2"></path>
                                    <path d="M15 3a6 6 0 0 1 6 6"></path>
                                </svg>
                                <p class="text-xl">{{ item.phone }}</p>
                            </span>
                        </section>

                    </div>
                </section>

                <div class="flex w-full justify-end pb-3">
                    <button @click="update(item.id)" type="button"
                        class="px-8 py-2 mr-2 text-sm font-semibold text-center text-gray-100 bg-black rounded-lg hover:bg-blue900 focus:outline-none">
                        Ver más
                    </button>
                </div>
            </li>
        </ol>
    </section>
</template>