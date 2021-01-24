import BookmarkGroupModel from '@/js/BookmarkGroupModel.js';

export default {
    methods: {
        onSave: function(){
            alert('this should have been in the edit group mixin')
            var groupsLength = this.allGroups.getLength();
            var newGroup = new BookmarkGroupModel(groupsLength); /* should fins a way to do dependency injection */
            var name = document.getElementById('name-field-' + this.fieldAffix).value;
            var color = document.getElementById('color-field-' + this.fieldAffix).value;
            if((name.length > 0) || (color.length > 0)){ 
                newGroup.setName(name);
                newGroup.setColor(color);
                this.allGroups.pushGroup(newGroup);
                this.$emit('clickedSave');

                this.resetForms();
            } else {
                alert('Name and color must be at least 1 character long.');
            }
        }      
    }
}