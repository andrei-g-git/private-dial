<template>
    <div id='balls' class='bookmark-group'
        style='background-color:gray;'> {{ groupName }} 
        <div class='bookmark-wrapper'
            v-for='(bookmark, index) in bookmarks'
            v-bind:key='index'>
            <Bookmark></Bookmark>
        </div>
    </div>
</template>

<script>

import Bookmark from '@/components/Bookmark.vue'

export default {
    components: {
        Bookmark
    },
    data: function(){
        return {
            bookmarks: null,
            groupName: 'should change',
            headerBackgroundColor: ''
        }
    },
    props: {
        //groupName: String, //might not need to be a prop
        groupModel: Object //these vue components will also have to act as controllers becuase they are easier to test that way, can't separate view from controller
    },
    methods: {
/*         getPassedName(){
            return this.groupName = this.groupModel.getName();
        },
        getBookmarks(){
            return this.bookmarks = this.groupModel.getBookmarks();
        } */
    },
    mounted(){
        this.groupName = this.groupModel.getName();
        this.bookmarks = this.groupModel.getBookmarks();

        this.headerBackgroundColor = this.groupModel.getColor();
        //document.documentElement.style.setProperty('--group-background-color', this.headerBackgroundColor); 
        var bookmarkGroupElement = document.getElementsByClassName('bookmark-group')[0];
        bookmarkGroupElement.style['background-color'] = this.headerBackgroundColor;
    }
}
</script>

<style scoped>
/*     :root{
        --group-background-color: gray;
    } */
    .bookmark-group{
        text-align: center;
        width: 200px;
        border: solid 1px gray;
        /* background: var(--group-background-color); */
    }
</style>