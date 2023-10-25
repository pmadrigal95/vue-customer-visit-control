<script setup>
defineProps({
    entity: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <section class="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50">
        <ol class="mt-3 divide-y divider-gray-200">
            <li>
                <section class="entitys-center block p-3 sm:flex pb-4 rounded-lg">
                    <img class="w-15 h-12 mb-3 mr-3 sm:mb-0"
                        src="https://ztdqsurxcyrlabzyhrud.supabase.co/storage/v1/object/public/src/images/oficina.png"
                        alt="cliente" />

                    <div class="text-blue900 w-full">
                        <div class="text-4xl font-bold pb-2">{{ entity.customerName }}</div>

                        <section class="flex flex-wrap gap-4" v-if="entity.customerEmail">
                            <span v-if="entity.customerEmail"
                                class="gap-1 inline-flex entitys-center text-xs font-normal text-gray-500 ">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="w-5 h-5 text-orange900 icon icon-tabler icon-tabler-mail-filled" width="24"
                                    height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path
                                        d="M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z"
                                        stroke-width="0" fill="currentColor"></path>
                                    <path
                                        d="M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z"
                                        stroke-width="0" fill="currentColor"></path>
                                </svg>
                                <p class="text-xl">{{ entity.customerEmail }}</p>
                            </span>
                        </section>
                    </div>
                </section>
            </li>

            <li>
                <section class="entitys-center block p-3 sm:flex pb-4 rounded-lg">
                    <img class="w-15 h-12 mb-3 mr-3 sm:mb-0"
                        src="https://ztdqsurxcyrlabzyhrud.supabase.co/storage/v1/object/public/src/images/compresor.png"
                        alt="compresor" />

                    <div class="text-blue900 w-full">
                        <div class="text-4xl font-bold pb-2">{{ entity.productName }}</div>

                        <div v-if="entity.productByCustomerNextMaintenance"
                            class="p-3 text-2xs italic font-normal text-gray-500 border border-gray-200 rounded-lg bg-gray-50 my-2">
                            {{ entity.productByCustomerNextMaintenance }}
                        </div>


                        <section class="flex flex-wrap gap-4" v-if="entity.brandName">
                            <span v-if="entity.brandName"
                                class="gap-1 inline-flex entitys-center text-xs font-normal text-gray-500 ">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="w-5 h-5 text-orange900 transition duration-75 group-hover:text-blue900 icon icon-tabler icon-tabler-truck-loading"
                                    width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M2 3h1a2 2 0 0 1 2 2v10a2 2 0 0 0 2 2h15"></path>
                                    <path d="M9 6m0 3a3 3 0 0 1 3 -3h4a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-4a3 3 0 0 1 -3 -3z">
                                    </path>
                                    <path d="M9 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                    <path d="M18 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                </svg>
                                <p class="text-xl">{{ entity.brandName }}</p>
                            </span>

                            <span v-if="entity.productByCustomerSerialKey"
                                class="gap-1 inline-flex entitys-center text-xs font-normal text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    class="w-5 h-5 text-orange900 transition duration-75 group-hover:text-blue900 icon icon-tabler icon-tabler-key"
                                    width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path
                                        d="M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0z">
                                    </path>
                                    <path d="M15 9h.01"></path>
                                </svg>
                                <p class="text-xl">{{ entity.productByCustomerSerialKey }}</p>
                            </span>
                        </section>
                    </div>

                </section>
            </li>
        </ol>
    </section>
</template>