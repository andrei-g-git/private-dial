<template>
    <div> 
        <img class='generic-button'
            
            @click='onClickButton()'
            :src='concatImage(imageName)'> 
    </div>    
</template>

<script>

import EditGroupEmitterMixin from '@/mixins/EditGroupEmitterMixin.js';
import ButtonEssentialAestheticsMixin from '@/mixins/ButtonEssentialAestheticsMixin.js'; 

export default {
    mixins: [
        EditGroupEmitterMixin, 
        ButtonEssentialAestheticsMixin
    ],
    data: function(){
        return{
            affix: 'edit.png'
        }
    },    
}
</script>

<style scoped>
    @import '../css/GenericButton.css'
</style>