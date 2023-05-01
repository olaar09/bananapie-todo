<template>
    <button @click="btnTapped" class="rounded-full shadow-md p-4 w-16 h-16 flex items-center justify-center">
        <img class="w-8 h-8" :src="`/img/${btnIcon}`" />
    </button>
</template>

<script>
export default {
    props: {
        name: String,
        btnIcon: String,
        isActive: Boolean
    },

    methods: {
        btnTapped() {
            this.$emit('buttonTap', this.name)
        },
    }
}
</script>

<style  scoped></style>