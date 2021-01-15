<template>
    <div :id='"bookmark-group-" + getGroupIndex()'
        class='bookmark-group'
        style='background-color:white;'> <!-- {{ groupName }} -->
        <div class='bookmark-button-wrapper'>
            <AddStuffButton 
                :buttonWidth='percentWidth'
                :imageName='bookmarkButtonImgName'
                @genericAddStuff='onClickAddBookmark()'>
            </AddStuffButton> 
        </div>
        <p class='group-name'>{{ groupName }} </p>
        <div class='bookmark-wrapper'
            v-for='(bookmark, index) in bookmarks'
            v-bind:key='index'>
            <Bookmark></Bookmark>
        </div>
    </div>
</template>

<script>

import Bookmark from '@/components/Bookmark.vue'
import AddStuffButton from '@/components/AddStuffButton.vue'

export default {
    components: {
        Bookmark,
        AddStuffButton
    },
    data: function(){
        return {
            bookmarks: null,
            groupName: 'should change',
            headerBackgroundColor: '',
            bookmarkButtonImgName: 'new folder.png',
            percentWidth: '30%'
        }
    },
    props: {
        //groupName: String, //might not need to be a prop
        groupModel: Object //these vue components will also have to act as controllers becuase they are easier to test that way, can't separate view from controller
    },
    methods: {
        getGroupIndex: function(){
            return this.groupModel.getIndex();
        },
        onClickAddBookmark: function(){
            //alert('added new bookmark')
        }
    },
    mounted(){
        this.groupName = this.groupModel.getName();
        this.bookmarks = this.groupModel.getBookmarks();

        var index = this.groupModel.getIndex();
        this.headerBackgroundColor = this.groupModel.getColor();
        var bookmarkGroupElement = document.getElementById('bookmark-group-' + index); //should test if index matches id number affix but that's white box shit...
        bookmarkGroupElement.style['background-color'] = this.headerBackgroundColor; //I THINK THAT IF I CHANGE THE STYLE DYNAMICALLY THEN THE COMPONENT I SHALLOWMOUNT
                                                                                //INTO THE TEST BECOMES INVALID AND THE ENTIRE THING STARTS FAILING WITH 
                                                                                //'CANNOT READ PROPERTY {WHATEVER} OF NULL
                                                                                //maybe it should be in the created hook? -- won't set the color then

    }
}
</script>

<style scoped>
    .bookmark-group{

        width: 200px;
        border: solid 1px gray;

        display: inline-block;

        position: relative;



        /* display: flex;
        align-items: baseline; */
    }
    .bookmark-button-wrapper{
        position: absolute;
        left: 0;
        /* float: left; */ 
        top: 50%;

        width: 10%;
        
    }
    .group-name{
        text-align: center;
    }
</style>