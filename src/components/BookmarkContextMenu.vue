<template>
    <div contextmenu="bookmark-contextmenu"
        id="bookmark-context-menu">
        <menu type="context" 
            id="bookmark-context">
            <div class="menu-item">
                <menuitem @click="onClickDelete()"> Delete -hardcoded- </menuitem>
                <menuitem @click="onClickEdit()"/>
            </div>
        </menu>
    </div>
</template>

<script>
export default {
    methods: {
        onClickDelete: function(){
            this.$emit('clickedDeleteBookmarkMenuItem');
        }               
    }
}
</script>

<style scoped>
    #bookmark-context{
        border: solid 1px gray;
    }
    .menu-item{
        display: block;
        margin-bottom: 5px;
    } 
    .menu-item :hover{
        background-color: rgb(200, 200, 200);
        color: green;
    }   
</style>