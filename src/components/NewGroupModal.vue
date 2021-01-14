<template>
    <div class='group-modal-container'>
        <div class='new-group-modal'> 
            <p>Name this tab group</p>
            <input type='text' 
                class='name-field'> 
            <p>Choose a color or hex</p>
            <input type='text'
                id='color-field'
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

import BookmarkGroupModel from '@/js/BookmarkGroupModel.js'

export default {
    props: {
        //showing: Boolean, //toggling from parent now
        allGroups: Object, 
        saveName: String,
        closeName: String
    },
    methods: {
        onSave: function(){
            var groupsLength = this.allGroups.getLength();
            var newGroup = new BookmarkGroupModel(groupsLength);

            var name = document.getElementsByClassName('name-field')[0].value; 
            newGroup.setName(name);
            var color = document.getElementById('color-field').value;
            newGroup.setColor(color);
            this.allGroups.pushGroup(newGroup);

            this.$emit('clickedSave');
            //this.showing = false;
        },
        onClose: function(){
            document.getElementsByClassName('name-field')[0].reset();
            document.getElementById('color-field').reset();

            this.$emit('clickedClose');
            //this.showing = false;
        }
    },
    mounted(){
        //this.showing = false; /////////////////////////////

        //this.onSave();
    }
}
</script>

<style scoped>
    .group-modal-container{
        position: fixed;
        display: flex;
        top: 0;
        left: 0;
        justify-content: center; /* this works horizontally */
        align-items: center; /* and this vertically */
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