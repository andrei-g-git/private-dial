<template>
    <div :id='"bookmark-group-" + getGroupIndex()'
        class='bookmark-group'
        style='background-color:white;'> {{ groupName }} 
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
        getGroupIndex: function(){
            return this.groupModel.getIndex();
        }
    },
    //mounted(){
    beforeMount(){
        this.groupName = this.groupModel.getName();
        this.bookmarks = this.groupModel.getBookmarks();

        var index = this.groupModel.getIndex();
        this.headerBackgroundColor = this.groupModel.getColor();
        var bookmarkGroupElement = document.getElementById('bookmark-group-' + index); //should test if index matches id number affix but that's white box shit...
        bookmarkGroupElement.style['background-color'] = this.headerBackgroundColor; //I THINK THAT IF I CHANGE THE STYLE DYNAMICALLY THEN THE COMPONENT I SHALLOWMOUNT
                                                                                //INTO THE TEST BECOMES INVALID AND THE ENTIRE THING STARTS FAILING WITH 
                                                                                //'CANNOT READ PROPERTY {WHATEVER} OF NULL
                                                                                //maybe it should be in teh created hook?

    }
}
</script>

<style scoped>
    .bookmark-group{
        text-align: center;
        width: 200px;
        border: solid 1px gray;
    }
</style>