<script setup>
import { ref, onMounted } from 'vue'
import { Drawer } from "flowbite";

// keep up with form data
let drawer = ref({});

onMounted(() => {

    // set the drawer menu element
    const $targetEl = document.getElementById('drawer-disabled-backdrop');

    // options with default values
    const options = {
        placement: 'left',
        backdrop: true,
        bodyScrolling: false,
        edge: false,
        edgeOffset: '',
        backdropClasses: 'bg-transparent bg-opacity-50 fixed inset-0 z-30',
    };

    /*
    * $targetEl: required
    * options: optional
    */
    drawer = new Drawer($targetEl, options);

});

const open = () => {

    drawer.toggle();
};
</script>

<template>
    <nav class="bg-blue800 border-b border-silver900 px-4 py-2.5 fixed left-0 right-0 top-0 z-50">
        <div class="flex flex-wrap justify-between items-center">
            <div class="flex justify-start items-center">
                <button @click="open"
                    class="p-2 mr-2 text-orange900 rounded-lg cursor-pointer hover:text-orange900 hover:bg-blue900 focus:bg-silver900 focus:ring-2 focus:ring-gray-100">
                    <svg aria-hidden="true" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <svg aria-hidden="true" class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <span class="sr-only">Toggle sidebar</span>
                </button>
            </div>
            <div class="flex items-center lg:order-2">

            </div>
        </div>
    </nav>

    <!-- drawer component -->
    <div id="drawer-disabled-backdrop"
        class="fixed top-14 left-0 z-50 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-64"
        tabindex="-1" aria-labelledby="drawer-disabled-backdrop-label">
        <h5 id="drawer-disabled-backdrop-label" class="text-base font-semibold text-blue900">
            Fox Paw Track</h5>
        <button type="button" @click="open"
            class="text-orange900 bg-transparent hover:bg-orange800 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
            </svg>
            <span class="sr-only">Close menu</span>
        </button>
        <div class="py-4 overflow-y-auto">
            <ul class="space-y-2 font-medium">
                <li> <router-link class="flex items-center p-2 text-blue900 rounded-lg hover:bg-gray-100 group"
                        :to="{ name: 'Home' }">
                        <svg class="w-5 h-5 text-orange900 transition duration-75 group-hover:text-blue900"
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                            <path
                                d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                            <path
                                d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                        </svg>
                        <span class="ml-3">Dashboard</span>
                    </router-link>
                </li>

                <li> <router-link class="flex items-center p-2 text-blue900 rounded-lg hover:bg-gray-100 group"
                        :to="{ name: 'AnalyticsViewComponent' }">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 text-orange900 transition duration-75 group-hover:text-blue900 icon icon-tabler icon-tabler-chart-area-line"
                            width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M4 19l4 -6l4 2l4 -5l4 4l0 5l-16 0"></path>
                            <path d="M4 12l3 -4l4 2l5 -6l4 4"></path>
                        </svg>
                        <span class="ml-3">Analytics</span>
                    </router-link>
                </li>

                <li> <router-link class="flex items-center p-2 text-blue900 rounded-lg hover:bg-gray-100 group"
                        :to="{ name: 'BrandFilterViewComponent' }">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 text-orange900 transition duration-75 group-hover:text-blue900 icon icon-tabler icon-tabler-truck-loading"
                            width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M2 3h1a2 2 0 0 1 2 2v10a2 2 0 0 0 2 2h15"></path>
                            <path d="M9 6m0 3a3 3 0 0 1 3 -3h4a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-4a3 3 0 0 1 -3 -3z"></path>
                            <path d="M9 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                            <path d="M18 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                        </svg>
                        <span class="ml-3">Marcas</span>
                    </router-link>
                </li>

                <li> <router-link class="flex items-center p-2 text-blue900 rounded-lg hover:bg-gray-100 group"
                        :to="{ name: 'ProductFilterViewComponent' }">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 text-orange900 transition duration-75 group-hover:text-blue900 icon icon-tabler icon-tabler-brand-netbeans"
                            width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path
                                d="M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z">
                            </path>
                            <path
                                d="M15.5 9.43a1 1 0 0 1 .5 .874v3.268a1 1 0 0 1 -.515 .874l-3 1.917a1 1 0 0 1 -.97 0l-3 -1.917a1 1 0 0 1 -.515 -.873v-3.269a1 1 0 0 1 .514 -.874l3 -1.786c.311 -.173 .69 -.173 1 0l3 1.787h-.014z">
                            </path>
                            <path d="M12 21v-9l-7.5 -4.5"></path>
                            <path d="M12 12l7.5 -4.5"></path>
                            <path d="M12 3v4.5"></path>
                            <path d="M19.5 16l-3.5 -2"></path>
                            <path d="M8 14l-3.5 2"></path>
                        </svg>
                        <span class="ml-3">Compresores</span>
                    </router-link>
                </li>

                <li> <router-link class="flex items-center p-2 text-blue900 rounded-lg hover:bg-gray-100 group"
                        :to="{ name: 'CustomerFilterViewComponent' }">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 text-orange900 transition duration-75 group-hover:text-blue900 icon icon-tabler icon-tabler-users-group"
                            width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                            <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1"></path>
                            <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                            <path d="M17 10h2a2 2 0 0 1 2 2v1"></path>
                            <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                            <path d="M3 13v-1a2 2 0 0 1 2 -2h2"></path>
                        </svg>
                        <span class="ml-3">Clientes</span>
                    </router-link>
                </li>

                <li> <router-link class="flex items-center p-2 text-blue900 rounded-lg hover:bg-gray-100 group"
                        :to="{ name: 'ReportFilterViewComponent' }">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            class="w-5 h-5 text-orange900 transition duration-75 group-hover:text-blue900 icon icon-tabler icon-tabler-file-report"
                            width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M17 17m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
                            <path d="M17 13v4h4"></path>
                            <path d="M12 3v4a1 1 0 0 0 1 1h4"></path>
                            <path d="M11.5 21h-6.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v2m0 3v4"></path>
                        </svg>
                        <span class="ml-3">Visitas</span>
                    </router-link>
                </li>
            </ul>


            <ul class="pt-5 mt-5 space-y-2 border-t border-gray-200">
                <li>
                    <router-link class="flex items-center p-2 text-blue900 rounded-lg hover:bg-gray-100 group"
                        :to="{ name: 'Logout' }">
                        <svg class="flex-shrink-0 w-5 h-5 text-orange900 transition duration-75 group-hover:text-gray-900"
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" />
                        </svg>
                        <span class="ml-3">Cerrar sesión </span>
                    </router-link>
                </li>
            </ul>
        </div>

    </div>
</template>