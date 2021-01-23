<template>
    <div>
        <div class="bookmark-group-container">
            <div :id="'bookmark-group-' + getGroupIndex()"
                class="bookmark-group"
                style="background-color: white">
                <div class="bookmark-button-wrapper">
                    <AddStuffButton
                        :buttonWidth="percentWidth"
                        :imageName="bookmarkButtonImgName"
                        @genericAddStuff="onClickAddBookmark()"
                    >
                    </AddStuffButton>
                </div>

                <p class="group-name">{{ groupName }}</p>

                <div class="edit-button-wrapper">
                    <EditGroupButton
                        :buttonWidth="percentWidth"
                        :imageName="editButtonImageName"
                        @clickedEdit="onClickEdit()">
                    </EditGroupButton>
                </div>
            </div>
            <div class="bookmark-container"> 
                <div class="bookmark-wrapper"
                    v-for="(bookmark, index) in bookmarks.getBookmarks()"
                    :key="index"
                    :id="'bookmark' + getBookmarkIndex(bookmark)"
                    @click.right.stop.prevent="recordBookmark(bookmark);
                        notifyParent();">
                    <!-- The model seems to retain the correct bookmarks after one's deletion but this loop renders an incorect list... -->
                    <!-- I'm guessing it has something to do with the index not changing correctly? -->
                    <!-- Indexes from different groups will overlap (but I doubt that was causing the problem) -->
                    <Bookmark :bookmarkModel="bookmark"> </Bookmark>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

/* ####delete-with-hashtags-to-enable#### eslint-env jquery */

import Bookmark from "@/components/Bookmark.vue";
import AddStuffButton from "@/components/AddStuffButton.vue";
import EditGroupButton from '@/components/EditGroupButton.vue';

import $ from 'jquery';
// eslint-disable-next-line no-unused-vars 
import jquery from '../../node_modules/jquery/dist/jquery.js';
// eslint-disable-next-line no-unused-vars 
import Vue from 'vue';

export default {
    components: {
        Bookmark,
        AddStuffButton,
        EditGroupButton
    },
    data: function () {
        return {
            bookmarks: null,
            groupName: "should change",
            headerBackgroundColor: "",
            bookmarkButtonImgName: "new folder.png",
            editButtonImageName: "edit.png",
            percentWidth: "30%",
            showNewBookmarkModal: false,
            saveBookmarkButtonName: "Save",
            showContext: false,
            rightClickedBookmark: null,
        };
    },
    props: {
        groupModel: Object
    },
    methods: {
        getGroupIndex: function () {
            return this.groupModel.getIndex();
        },
        onClickAddBookmark: function () {
            this.$emit("clickedAddBookmark", this.groupModel.getIndex());
        },
        onClickEdit: function(){
            this.$emit("clickedEditGroup", this.groupModel.getIndex());
        },
        getBookmarkIndex: function (bookmark) {
            return this.bookmarks.getBookmarks().indexOf(bookmark);
        },
        recordBookmark: function (bookmark) {
            this.rightClickedBookmark = bookmark;
        },
        getRightClickedBookmark: function () {
            return this.rightClickedBookmark;
        },
        showContextMenu: function () {
            this.showContext = true;
        },
        notifyParent: function () {
            this.$emit(
                "rightClickedBookmark",
                this.getBookmarkIndex(this.getRightClickedBookmark())
            );
        },
    },
    beforeMount() {
        this.groupName = this.groupModel.getName();
        this.bookmarks = this.groupModel; 
    },
    mounted() {
        var index = this.groupModel.getIndex();
        this.headerBackgroundColor = this.groupModel.getColor();

/*         var bookmarkGroupElement = document.getElementById("bookmark-group-" + index);
        bookmarkGroupElement.style["background-color"] = this.headerBackgroundColor; */ //   #### COMMENT OUT WHEN TESTING ###

        //I THINK THAT IF I CHANGE THE STYLE DYNAMICALLY THEN THE COMPONENT I SHALLOWMOUNT
        //INTO THE TEST BECOMES INVALID AND THE ENTIRE THING STARTS FAILING WITH
        //'CANNOT READ PROPERTY {WHATEVER} OF NULL
        //maybe it should be in the created hook? -- won't set the color then

        //trying jquery
        $("#bookmark-group-" + index).css("background-color", this.headerBackgroundColor);

    },

};
</script>

<style scoped>
.bookmark-group-container {
    width: 200px;
    /* height: 90vh; */
    border: solid 1px gray;
/*     display: block;
    overflow-y: auto;
    overflow-x: hidden; */
}
.bookmark-container {
    height: 85vh; /* looks like the bookmark contexmenu really doesn't like specifying the height of ... whatever the hell ... everything I guess */
    display: block; /* eh maybe it's not the height, bug's still there after I comment out the height */
    overflow-y: auto; /* I think it has something to do with rendering the contextmenu ITEMS below all the bookmark group containers */
    overflow-x: hidden;
}
.bookmark-group {
    width: 100%; 
    /* height: 30px; */
    border: solid 1px gray;
    display: inline-block;
    position: relative;
    margin: -1px -1px;
}
.bookmark-button-wrapper, .edit-button-wrapper {
    position: absolute;
    /* top: 17px; */
    width: 20px;
    
    /* padding-top: 17px; */ /* looks like arranging the button's y position makes it intert now */
}
.bookmark-button-wrapper {
    padding-left: 5px;
}
.edit-button-wrapper {
    padding-right: 5px;
    right: 0;
}
.group-name {
    position: relative;
    text-align: center;
}
/* test */
/* .bookmark-wrapper {
    background-color: lightblue;
} */
</style>