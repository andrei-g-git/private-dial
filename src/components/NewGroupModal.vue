<template>
    <div>
        <modal-container
            @clickedSaveModal="onSave()" 
            @clickedCloseModal="onClose()"
            :fieldAffix="fieldAffix"
            >

            <template v-slot:button-name-1> Save </template>
            <template v-slot:button-name-2> Close </template>            
        </modal-container> <!--             :saveName="saveName"
            :closeName="closeName" -->
    </div>
</template>

<script>

// eslint-disable-next-line no-unused-vars 
//import BookmarkGroupModel from '@/js/BookmarkGroupModel.js';
import ModalContainer from '@/components/ModalContainer.vue';
import GroupModalCommonsMixin from '@/mixins/GroupModalCommonsMixin.js';
import NewGroupModalMixin from '@/mixins/NewGroupModalMixin.js';

export default {
    components: {
        "modal-container": ModalContainer
    },
    mixins: [
        GroupModalCommonsMixin,
        NewGroupModalMixin
    ],
    data: function(){
        return{
            fieldAffix: "new"
        }
    }
}
</script>

<style scoped>

</style>