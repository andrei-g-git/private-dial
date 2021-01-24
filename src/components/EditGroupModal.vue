<template>
    <div>
        <modal-container
            @clickedSaveModal="onSave()" 
            @clickedCloseModal="onClose()"
            :fieldAffix="fieldAffix"
            ><!--             :saveName="saveName"
            :closeName="closeName" -->
            <template v-slot:button-name-1> Saveee </template>
            <template v-slot:button-name-2> Closeee </template>            
        </modal-container>
    </div>
</template>

<script>

import ModalContainer from '@/components/ModalContainer.vue';
import GroupModalCommonsMixin from '@/mixins/GroupModalCommonsMixin.js';
import EditGroupModalMixin from '@/mixins/NewGroupModalMixin.js';

export default {
    components: {
        "modal-container": ModalContainer
    },
    mixins: [
        GroupModalCommonsMixin,
        EditGroupModalMixin
    ],
    data: function(){
        return{
            fieldAffix: "edit"
        }
    }    
}
</script>

<style scoped>

</style>