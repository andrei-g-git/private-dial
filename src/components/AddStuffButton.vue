<template>
    <div> 
        <img class='add-stuff-button'
            :click='onClickButton()'
            :src='buttonImageSrc'> 

    </div>
</template>

<script>
export default {
    props: {
        name: String,
        eventName: String,
        buttonImageSrc: String
    },
    methods: {
        onClickButton: function(){
            this.$emit(this.eventName);
        }
    }
}
</script>

<style scoped>
    .add-stuff-button{
        width: 5%;
        float: right;
    }
    .add-stuff-button:hover{
        opacity: 0.7;
    }
    .add-stuff-button:active{
        opacity: 0.5;
    }
</style>