

<template>
    <div class="text-center fixed top-0 bottom-0 left-0 right-0 flex justify-center bg-[#000000da]"
        @click="$emit('close-modal')">
        <div class="text-center bg-white p-5 rounded mt-60 w-5/12 h-96" @click.stop>
            <h6 class="font-bold mb-6">Update todo</h6>
            <form @submit.prevent="onSubmit" class="w-9/12 mx-auto">
                <div class="mx-auto ">
                    <div class="text-left">Todo name</div>
                    <input class="border-2 p-2 w-full rounded shadow border-green-400 h-14" v-model="todoName">
                </div>

                <div class="mx-auto  mt-4">
                    <div class="text-left">Todo description</div>
                    <textarea cols="10" class="border-2 p-2 w-full rounded shadow border-green-400 h-14"
                        v-model="todoDescription"> </textarea>
                </div>
            </form>
            <div class="mx-auto w-4/12 mt-4 text-center flex">
                <Button @button-tap="onSubmit" class="font-bold rounded p-2 bg-green w-full text-center"
                    name="Update todo"></Button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {

    props: {
        todoNameProp: String,
        todoDescriptionProp: String,
        todoIdProp: Number,
    },
    data() {
        return {
            todoName: '',
            todoDescription: ''
        }
    },

    methods: {
        onSubmit() {
            this.$emit('todoUpdated', { todo: this.todoName, description: this.todoDescription, id: this.todoIdProp })
        }
    },
    mounted() {
        this.todoName = this.todoNameProp || '';
        this.todoDescription = this.todoDescriptionProp || '';

        console.log(this.todoNameProp, this.todoDescriptionProp, "mcejkfdmkjndcms");
    }

}
</script>

<style  scoped></style>