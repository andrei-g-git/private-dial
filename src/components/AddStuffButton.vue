<template>
    <div> 
        <img class='add-stuff-button'
            
            @click='onClickButton()'
            :src='concatImage(imageName)'> 
    </div>
</template>

<script>
export default {
    data: function(){
        return{
            affix: 'new folder.png'
        }
    },
    props: {
        imageName: String,
        buttonWidth: String
    },
    methods: {
        onClickButton: function(){
            this.$emit('genericAddStuff');
        },
        concatImage: function(value){
            return require('../assets/' + value);
        },
        concatWidth: function(value){
            return require(value + '%')
        }
    }
}
</script>

<style scoped>
    .add-stuff-button{
        width: 100%;
    }
    .add-stuff-button:hover{
        opacity: 0.7;
    }
    .add-stuff-button:active{
        opacity: 0.5;
    }
</style>