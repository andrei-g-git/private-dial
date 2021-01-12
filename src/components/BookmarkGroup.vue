<template>
    <div id='balls' class='bookmark-group'> {{ groupName }} 
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
            groupName: 'should change'
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

        //alert(document.getElementById('balls').textContent); //apparently this makes the DOM to not be mounted or some shit... gettin null wrapper errors in the tests
    }
}
</script>

<style scoped>

</style>