<template>
    <button @click="btnTapped" class="shadow-md bg-green-400 text-center">
        {{ name }}
    </button>
</template>

<script>
export default {
    props: {
        name: String,
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