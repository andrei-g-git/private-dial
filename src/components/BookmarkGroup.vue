<template>
    <div>
        <div class="bookmark-group-container">
            <div
                :id="'bookmark-group-' + getGroupIndex()"
                class="bookmark-group"
                style="background-color: white"
            >
                <div class="bookmark-button-wrapper">
                    <AddStuffButton
                        :buttonWidth="percentWidth"
                        :imageName="bookmarkButtonImgName"
                        @genericAddStuff="onClickAddBookmark()"
                    >
                    </AddStuffButton>
                </div>
                <p class="group-name">{{ groupName }}</p>
            </div>
            <div
                class="bookmark-wrapper"
                v-for="(bookmark, index) in bookmarks.getBookmarks()"
                :key="index"
                :id="'bookmark' + getBookmarkIndex(bookmark)"
                @click.right.stop.prevent="
                    recordBookmark(bookmark);
                    notifyParent();
                "
            >
                <!-- The model seems to retain the correct bookmarks after one's deletion but this loop renders an incorect list... -->
                <!-- I'm guessing it has something to do with the index not changing correctly? -->

                <!-- INDEXES ARE GLOBAL so indexes from different groups will overlap (but I doubt that was causing the problem) -->
                <Bookmark :bookmarkModel="bookmark"> </Bookmark>
            </div>
        </div>
    </div>
</template>

<script>
import Bookmark from "@/components/Bookmark.vue";
import AddStuffButton from "@/components/AddStuffButton.vue";

export default {
    components: {
        Bookmark,
        AddStuffButton
    },
    data: function () {
        return {
            bookmarks: null,
            groupName: "should change",
            headerBackgroundColor: "",
            bookmarkButtonImgName: "new folder.png",
            percentWidth: "30%",
            showNewBookmarkModal: false,
            saveBookmarkButtonName: "Save",
            showContext: false,
            rightClickedBookmark: null,
        };
    },
    props: {
        //groupName: String, //might not need to be a prop
        groupModel: Object, //these vue components will also have to act as controllers becuase they are easier to test that way, can't separate view from controller
    },
    methods: {
        getGroupIndex: function () {
            return this.groupModel.getIndex();
        },
        onClickAddBookmark: function () {
            this.$emit("clickedAddBookmark", this.groupModel.getIndex());
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

        var bookmarkGroupElement = document.getElementById(
            "bookmark-group-" + index
        );
        bookmarkGroupElement.style["background-color"] = this.headerBackgroundColor; //   #### COMMENT OUT WHEN TESTING ###

        //I THINK THAT IF I CHANGE THE STYLE DYNAMICALLY THEN THE COMPONENT I SHALLOWMOUNT
        //INTO THE TEST BECOMES INVALID AND THE ENTIRE THING STARTS FAILING WITH
        //'CANNOT READ PROPERTY {WHATEVER} OF NULL
        //maybe it should be in the created hook? -- won't set the color then
    },
};
</script>

<style scoped>
.bookmark-group-container {
    width: 200px;
    border: solid 1px gray;
    display: block;
}
.bookmark-group {
    width: 100%; 
    /* height: 30px; */ /* .................... */
    border: solid 1px gray;

    display: inline-block;

    position: relative;

    margin: -1px -1px;

    /* padding-bottom: 17px; */
}
.bookmark-button-wrapper {
    position: absolute;
    /*left: 5;  remains at 0 */
    top: 17px;

    /* width: 10%; */
    width: 20px;
    padding-left: 5px;
}
.group-name {
    position: relative;
    text-align: center;
}
</style>