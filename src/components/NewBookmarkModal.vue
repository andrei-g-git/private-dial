<template>
    <div class='bookmark-modal-container'>
        <div class='new-bookmark-modal'>
            <p>Enter full website URL</p>
            <input type='text'
                id='url-field'>
            <button class='save-bookmark-button'
                @click='onSave()'> {{ saveBookmarkName }}
            </button>
        </div>
    </div>
</template>

<script>

import BookmarkModel from '@/js/BookmarkModel.js';

export default {
    props:{
        bookmarkGroup: Object,
        saveBookmarkName: String
    },
    methods:{
        onSave: function(){

            var url = document.getElementById('url-field');
            var urlName = url.value;

            if(urlName.length > 0){
                this.bookmarkGroup.pushBookmark(new BookmarkModel(urlName));
                this.$emit('clickedSaveBookmark');
                this.resetForms(url);
            } else {
                alert('The url must be at least 1 character long.')
            }
        },
        resetForms: function(element){
            //document.getElementById('url-field').value = ''; //Cannot set property 'value' of null ??????????????????????
            element.value = ''; //same shit
        }
    }
    
}
</script>

<style scoped>
    .bookmark-modal-container{
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
    .new-bookmark-modal{
        width: 400px;
        height: 300px;
        background-color: white;
        padding: 30px var(--group-modal-custom-horizontal-offset);
        position: relative;
        box-shadow: 0px 0px 15px;
    }
    #url-field, .p {
        display: block;
    }
    #url-field{
        margin-bottom: 10px;
    }
    .p{
        margin-bottom: 3px;
    }
    .save-bookmark-button{
        display: inline-block;
        position: absolute;
        
        margin-bottom: 30px;
        bottom: 0px;

        /* float: left;  */
        left: var(--group-modal-custom-horizontal-offset);
    }

</style>