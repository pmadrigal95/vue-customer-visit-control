<script setup>
import AuthenticationTemplateComponent from '@/layouts/templates/authentication/AuthenticationTemplateComponent.vue';
import BaseSkeletonLoader from '@/components/core/loaders/BaseSkeletonLoader.vue';

import { ref } from "vue";
import useAuthUser from "@/composables/UseAuthUser";
import { useRouter } from "vue-router";

import { Input } from 'flowbite-vue';

// Use necessary composables
const router = useRouter();
const { login } = useAuthUser();

// keep up with form data
const form = ref({
    email: "",
    password: "",
});

let loading = ref(false);

// call the proper login method from the AuthUser composable
// on the submit of the form
const handleLogin = async () => {
    try {

        loading.value = true;
        await login(form.value);
        router.push({ name: "Home" });
    } catch (error) {
        loading.value = false;
        alert(error.message);
    }
};
</script>

<template>
    <AuthenticationTemplateComponent>
        <template v-slot:content>
            <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div class="sm:mx-auto sm:w-full sm:max-w-sm" v-if="!loading">
                    <img class="mx-auto h-45 w-auto block md:hidden"
                        src="https://ztdqsurxcyrlabzyhrud.supabase.co/storage/v1/object/public/src/images/logoFox.png"
                        alt="Your Company" />
                    <h2
                        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-blue900">
                        Bienvenido a Fox Paw Track</h2>
                    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form class="space-y-6" @submit.prevent="handleLogin()">
                            <div class="w-full">
                                <Input v-model.trim="form.email" placeholder="Ingresa su correo electrónico"
                                    label="Correo electrónico" required type="email" />
                            </div>
                            <div class="w-ful">
                                <Input v-model.trim="form.password" placeholder="Ingresa su contraseña " label="Contraseña "
                                    required type="password" />
                            </div>
                            <div>
                                <button type="submit"
                                    class="w-full text-white bg-blue800 hover:bg-blue900 focus:ring-4 focus:outline-none focus:ring-orange900 first-letter:font-medium rounded-lg text-sm px-5 py-2.5 text-center">Iniciar
                                    sesión</button>
                            </div>
                        </form>
                    </div>
                </div>

                <BaseSkeletonLoader v-else />
            </div>
        </template>
    </AuthenticationTemplateComponent>
</template>

  
  