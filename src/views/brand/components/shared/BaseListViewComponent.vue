<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

import useBrand from "@/composables/UseBrand";


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
    router.push({ name: "BrandEditorViewComponent", params: { Id: id }, });
};

const deleteItem = async (id) => {
    props.fnDelete(id);
};

</script>

<template>
    <section class="flex flex-col gap-4">
        <section v-for="item in list" :key="item.id">
            <div
                class=" flex flex-col items-start justify-start w-full gap-4 p-8 bg-silver900 hover:bg-gray-300 rounded-xl">
                <div class="flex items-start justify-between w-full">
                    <img class="w-14 h-14"
                        src="https://ztdqsurxcyrlabzyhrud.supabase.co/storage/v1/object/public/src/images/paquetes.png?t=2023-10-04T02%3A19%3A13.097Z"
                        alt="" />
                    <button @click="deleteItem(item.id)">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                            class="w-6 h-6 text-black fill-current hover:text-blue900">
                            <path fill-rule="evenodd"
                                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div>
                    <h4 class="text-xl font-semibold text-blue900" v-if="item.name">{{ item.name }}</h4>
                    <p class="mt-2 text-sm text-blue800 md:mt-1" v-if="item.description">
                        {{ item.description }}
                    </p>
                </div>
                <div class="flex w-full justify-end">
                    <button @click="update(item.id)" type="button"
                        class="px-8 py-2 mr-2 text-sm font-semibold text-center text-gray-100 bg-black rounded-lg hover:bg-blue900 focus:outline-none">
                        Editar
                    </button>
                </div>
            </div>
        </section>
    </section>
</template>