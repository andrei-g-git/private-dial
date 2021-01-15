<template>
    <div class='bookmark-modal-container'>
        <div class='new-bookmark-modal'>
            <p>Enter full website URL</p>
            <input type='text'
                id='url-field'>
            <button class='save-bookmark-button'
                @click='onSave()'>
            </button>
        </div>
    </div>
</template>

<script>

import BookmarkModel from '@/js/BookmarkModel.js';

export default {
    props:{
        bookmarkGroup: Object /* Array, */
        //showing: Boolean    ----doesn't handle v-show
    },
    methods:{
        onSave: function(){
     
            //var ulrs = document.getElementsByClassName('url-field');
            //var urls = document.querySelectorAll(".url-field");
            //var url = urls[0].value;
            var url = document.getElementById('url-field');
            var poop = url.value;
            this.bookmarkGroup.pushBookmark(new BookmarkModel(poop));

            this.$emit('clickedSaveBookmark');

            this.resetForms(url);
            
        },
        resetForms: function(element){
            //document.getElementById('url-field').value = ''; //Cannot set property 'value' of null ??????????????????????
            element.value = ''; //same shit
        }
    }
    
}
</script>

<style scoped>

</style>