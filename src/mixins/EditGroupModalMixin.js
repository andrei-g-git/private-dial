/* so the chrome dev tools don't see this jile and the app uses NewGroupModalMixin instead of this even though I'm giving this mixin to the NewGroupModal ..
I have no idea what the hell is going on... */
export default {
    props: {
        groupIndex: Number
    },
    methods: {
        onSave: function(){
            alert('clicked save in edit group modal')
            var name = document.getElementById('name-field-' + this.fieldAffix).value;
            var color = document.getElementById('color-field-' + this.fieldAffix).value;
            if((name.length > 0) || (color.length > 0)){   
                var group = this.allGroups.getGroupAt(groupIndex);
                group.setName(name);
                group.setColor(color);
                this.$emit('clickedSave');
                this.resetForms();                
            }
        }
    },
    mounted(){
        alert('cmon...') //doesn't run either, seems like this mixin just doesn't exist in the actual code... dev tools can't even find the file...
        var name = this.allGroups.getNameAt(this.groupIndex);
        var color = this.allGroups.getColorAt(this.groupIndex);

        document.getElementById('name-field-' + this.fieldAffix).value = name;
        document.getElementById('color-field-' + this.fieldAffix).value = color;
    }
}