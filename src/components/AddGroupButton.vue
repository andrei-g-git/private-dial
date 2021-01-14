<template>
    <div> 
        <img class='add-group'
            v-on:click='onAdd()'
            src='../assets/new folder.png'> 

    </div>
</template>

<script>
export default {
    props: {
        name: String
    },
    methods: {
        onAdd: function(){
            this.$emit('clickedAddGroup');
        }
    }
}
</script>

<style scoped>
    .add-group{
        width: 5%;
        float: right;
    }
    .add-group:hover{
        opacity: 0.7;
    }
    .add-group:active{
        opacity: 0.5;
    }
</style>