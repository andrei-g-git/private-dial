<template>
    <div>
        <modal-container
            @clickedSaveModal="onSave()" 
            @clickedCloseModal="onClose()"
            :saveName="saveName"
            :closeName="closeName">
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
    ]
}
</script>

<style scoped>

</style>