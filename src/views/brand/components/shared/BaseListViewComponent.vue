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
    router.push({ name: "BrandEditorViewComponent", params: { Id: id }, });
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
                        src="https://ztdqsurxcyrlabzyhrud.supabase.co/storage/v1/object/public/src/images/paquetes.png?t=2023-10-04T02%3A19%3A13.097Z"
                        alt="cliente" />

                    <div class="text-blue900 w-full">
                        <div class="text-3xl font-bold pb-2">{{ item.name }}</div>
                        <div v-if="item.description"
                            class="p-3 text-2xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50">
                            {{ item.description }}</div>
                    </div>
                </section>

                <div class="flex w-full justify-end pb-3">
                    <button @click="update(item.id)" type="button"
                        class="px-8 py-2 mr-2 text-sm font-semibold text-center text-gray-100 bg-black rounded-lg hover:bg-blue900 focus:outline-none">
                        Editar
                    </button>
            </div>
        </li>
    </ol>
</section>
</template>