<template>
    <div> 
        <img class='generic-button'
            
            @click='onClickButton()'
            :src='concatImage(imageName)'> 
    </div>
</template>

<script>

import AddStuffEmitterMixin from '@/mixins/AddStuffEmitterMixin.js';
import ButtonEssentialAestheticsMixin from '@/mixins/ButtonEssentialAestheticsMixin.js'; 

export default {
    mixins: [
        AddStuffEmitterMixin, 
        ButtonEssentialAestheticsMixin
    ],
    data: function(){
        return{
            affix: 'new folder.png'
        }
    },
}
</script>

<style scoped>
    @import '../css/GenericButton.css'
</style>