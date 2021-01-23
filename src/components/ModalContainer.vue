<template>
    <div class='group-modal-container'>
        <div class='new-group-modal'> 
            <p>Name this tab group</p>
            <input type='text' 
                class='name-field'
                :id="'name-field-' + fieldAffix"> 
            <p>Choose a color or hex</p>
            <input type='text'
                :id="'color-field-' + fieldAffix"
                class='color-field'>            
            <button class='save-button'
                v-on:click='onSave()'> {{ saveName }}
            </button>
            <button class='close-button'
                v-on:click='onClose()'> {{ closeName }}
            </button>

        </div>
    </div>    
</template>

<script>
export default {
    props: {
        saveName: {
            type: String,
            default: "Button 1"
        },
        closeName: {
            type: String,
            default: "Button 2"
        },
        fieldAffix: {
            type: String,
            default: "default"
        }
    },
    methods: {
        onSave: function(){
            this.$emit('clickedSaveModal');
        },
        onClose: function(){
            this.$emit('clickedCloseModal');
        }
    }
}
</script>

<style scoped>
    .group-modal-container{
        position: fixed;
        display: flex;
        top: 0;
        left: 0;
        justify-content: center; 
        align-items: center; 
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;

        --group-modal-custom-horizontal-offset: 40px;
    }
    .new-group-modal{
        width: 400px;
        height: 300px;
        background-color: white;
        padding: 30px var(--group-modal-custom-horizontal-offset);
        position: relative;
        box-shadow: 0px 0px 15px;
    }
    .name-field, .color-field, .p{
        display: block;     
    }
    .name-field, .color-field{
        margin-bottom: 10px;
    }
    .p{
        margin-bottom: 3px;
    }
    .save-button, .close-button{
        display: inline-block;
        position: absolute;
        
        margin-bottom: 30px;
        bottom: 0px;
    }
    .save-button{
        float: left; 
        left: var(--group-modal-custom-horizontal-offset);
    }
    .close-button{
        float: right; 
        right: var(--group-modal-custom-horizontal-offset);
    }
</style>