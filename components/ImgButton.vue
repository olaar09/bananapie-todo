<template>
    <button @click="btnTapped" class="shadow-md flex">
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