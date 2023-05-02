
<template>
    <div class="text-center fixed top-0 bottom-0 left-0 right-0 flex justify-center bg-[#000000da]"
        @click="$emit('close-modal')">
        <div class="text-center bg-white p-5 rounded mt-60 w-5/12 h-96" @click.stop>
            <h6 class="font-bold mb-6">Sign in to continue</h6>
            <form @submit.prevent="login" class="w-9/12 mx-auto">
                <div class="mx-auto ">
                    <div class="text-left">Email address</div>
                    <input class="border-2 p-2 w-full rounded shadow border-green-400 h-14" v-model="email">
                </div>

                <div class="mx-auto  mt-4">
                    <div class="text-left">Password</div>
                    <input type="password" cols="10" class="border-2 p-2 w-full rounded shadow border-green-400 h-14"
                        v-model="password">
                </div>
                <div class="mx-auto w-4/12 mt-4 text-center flex">
                    <Button type="submit" class="font-bold rounded p-2 bg-green w-full text-center bg-green-500"
                        name="Login"></Button>
                </div>
                <div class="justify-center text-center bg-white mt-4">
                    <NuxtLink to="/register">Signup</NuxtLink>
                </div>
            </form>

        </div>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'Login | TODO App'
})

//middlewares
definePageMeta({
    middleware: 'authenticated'
})

const user = ref(null)
const loading = ref(false)
const authError = ref('')
const email = ref('')
const password = ref('')


watchEffect(async () => {
    if (user.value) {
        await navigateTo('/')
    }
});

const login = async () => {
    console.log(email.value, password.value);

    loading.value = true
    const response = await $fetch('https://dummyjson.com/auth/login', {
        headers: { 'Content-Type': 'application/json' },
        method: "POST",
        body: JSON.stringify({
            username: email.value,
            password: password.value,
            // username: 'kminchelle',
            // password: '0lelplR',
        })
    });

    const auth = usePersistentAuth();
    auth.value = response;
    await navigateTo('/');
}
const clearError = () => {
    authError.value = '';
};
</script>
