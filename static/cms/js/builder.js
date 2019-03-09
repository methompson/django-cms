Vue.component('cmscontainer',{
    props:['index', 'width_id', 'width_name', 'width', 'draggable', 'id', 'components'],
    template:'#cmscontainer',
    methods:{
        removeEl : function() {
            //Runs the deleteContainer function to delete the component
            // this.$parent.deleteContainer(this.index);
            this.$emit('delete', this.index);
        },
        increaseSize : function() {
            //Runs the increaseSize function to increase this component's width
            // this.$parent.increaseSize(this);
            this.$emit('increase_size', this);
        },
        decreaseSize : function() {
            //Runs the decreaseSize function to decrease this component's width
            // this.$parent.decreaseSize(this);
            this.$emit('decrease_size', this);
        },
        dragstart : function() {
            //Sends the element to the parent to store as a variable
            // this.$parent.startDrag(this);
            this.$emit('start_drag', this);

            //Turns draggable on and adds the ghost class.
            this.$el.setAttribute('draggable', 'true');
            this.$el.classList.add('ghost');
        },
        dragEnd : function(){
            //Turns draggable off, then removes the ghost class.
            this.$el.setAttribute('draggable', 'false');
            this.$el.classList.remove('ghost');
        },
        dragOver : function(e){
            e.preventDefault();

            //get the distance (in pixels) and divide by the total width to get the
            //ratio of distance from the left side. When distance is < 0.5, it's closer
            //to the left side and when it's > 0.5, it's closer to the right side.
            let distance = e.offsetX/this.$el.offsetWidth;

            //Depending on which side it's closer to, add border coloring to show the
            //User which side the user is closer to.
            if (distance > 0.5){
                this.$el.classList.add('dragHoverRight');
                this.$el.classList.remove('dragHoverLeft');
            } else {
                this.$el.classList.remove('dragHoverRight');
                this.$el.classList.add('dragHoverLeft');
            }
        },
        drop : function(e){
            //Calculates the distance ratio as above.
            let distance = e.offsetX/this.$el.offsetWidth;

            //Removes the border colors for hovers.
            this.$el.classList.remove('dragHoverRight');
            this.$el.classList.remove('dragHoverLeft');

            //Runs the drop function to change component location
            // this.$parent.drop(this, distance);
            this.$emit('drop', this, distance);
        },
        dragLeave : function(e){
            //Removes either drag hover class
            this.$el.classList.remove('dragHoverRight');
            this.$el.classList.remove('dragHoverLeft');
        },
        addComponentDialog : function(){
            //this.$emit('showcomponents', this)
            this.showList = true;
        },
        cancelComponent : function(){
            console.log("Something");
            this.showList = false;
        },
    },
    computed : {
        widthStyle : function(){
            //Returns a width style that determines the component's width
            return {
                width : 'calc('+this.width+'% - 2em)'
            };
        },
        showComponentList: function(){
            if (this.showList){
                console.log('True');
                return true;
            } else {
                console.log('false');
                return false;
            }
            return false;
            console.log(this.showList);
            return this.showList;
        },
    },
    data: function(){
        return {
            showList : 'false',
        };
    },
    created : function(){
        this.showList = false;
    }
});

Vue.component('componentpicker', {
    template:'#componentpicker',
    methods : {
        cancel : function(){
            this.$emit('cancel_component', this);
        },
        addComponent : function(type){
            console.log(type);
        },
    },
});

var builderApp = new Vue({
    el: '#builder',
    data: {
        containers : [],
        i : 0,
        widths : [
            {'name' : '1/6', 'value' : 100/6},
            {'name' : '1/5', 'value' : 100/5},
            {'name' : '1/4', 'value' : 100/4},
            {'name' : '1/3', 'value' : 100/3},
            {'name' : '2/5', 'value' : 200/5},
            {'name' : '1/2', 'value' : 100/2},
            {'name' : '3/5', 'value' : 300/5},
            {'name' : '2/3', 'value' : 200/3},
            {'name' : '3/4', 'value' : 300/4},
            {'name' : '4/5', 'value' : 400/5},
            {'name' : '5/6', 'value' : 500/6},
            {'name' : '1/1', 'value' : 100},
        ],
        dragEl : '',
    },
    computed : {
        serial_export: function(){
            return this.serializeContainers();
            //return 'hello!';
        },
        all_containers: function(){
            return this.containers;
        },
        
    },
    methods : {
        serializeContainers : function(){
            return JSON.stringify(this.containers);
        },
        addNewContainer : function(){
            //Add new object with default values to the containers array
            let id = this.makeId();
            this.containers.push({
                'id' : id,
                'width_id':0,
                'width_name' : this.widths[0].name,
                'width':this.widths[0].value,
                'components':{},
            });
            /*this.$set(this.containers, this.makeId(), {
                'width_id':0,
                'width_name' : this.widths[0].name,
                'width':this.widths[0].value,
            });*/
        },
        deleteContainer : function(index){

            this.containers.splice(index, 1);
            //this.$delete(this.containers, index);
        },
        makeId : function(){
            //Random character ID creator.
            //Not cryptographically secure. Simply for use with making unique IDs
            let text = "";
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (let i = 0; i < 16; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        },
        increaseSize : function(el){
            //Increases the width of a container.

            //Checks if the current width is at the maximum defined width listed above
            //In the 'widths' data item. Do Nothing if it is.
            if (el.width_id == this.widths.length-1) {
                return;
            }

            //Get the next higher value.
            i = el.width_id+1;
            //Get a copy of the object in the container
            let element = this.containers[el.index];

            //Modify requisite fields with specific index
            element.width_id = i;
            element.width_name = this.widths[i].name;
            element.width = this.widths[i].value;

            //Place it back in the containers array
            this.$set(this.containers, el.index, element);

            return;
        },
        decreaseSize : function(el){
            //Decreases the width of a container.

            //Checks if the current width is at the minimum defined width listed above
            //In the 'widths' data item. Do Nothing if it is.
            if (el.width_id == 0){
                return;
            }

            //Get the next lower value.
            i = el.width_id-1;
            //Get a copy of the object in the container
            let element = this.containers[el.index];
            element.width_id = i;
            element.width_name = this.widths[i].name;
            element.width = this.widths[i].value;

            //Place it back in the containers array
            this.$set(this.containers, el.index, element);

            return;
        },
        startDrag : function(el){
            //Keep track of which object is being dragged. Place the array index of
            //the dragged object into a variable.
            this.dragEl = el.index;
        },
        dropContainer : function(el, pos){
            //Swapping objects around in the containers array.

            //If the dropped and dragged object are the same, do nothing.
            if (this.dragEl == el.index){
                return;
            }

            //Get the dragged element
            let dragged = this.containers[this.dragEl];
            //Splicing it out of the container (removing)
            this.containers.splice(this.dragEl, 1);

            //Find the current array index of the dropped element.
            let dropIndex = -1;
            for (let i=0; i<this.containers.length; ++i){
                if (this.containers[i].id == el.id){
                dropIndex = i;
                }
            }

            //dropIndex should be 0 or greater. There's an error otherwise.
            if (dropIndex < 0){
                console.log('There was an error dropping');
                return;
            }

            //If the position is < 0.5, it's on the left side, otherwise, it's on the
            //right side. Place the dragged element either in the dropped element's
            //array index (pushing the dropped element over) or immediately after.
            if (pos < 0.5){
                this.containers.splice(dropIndex, 0, dragged);
            } else {
                this.containers.splice(dropIndex+1, 0, dragged);
            }

            return;

        },
        addComponent : function(container, type){

        },
        deleteComponent : function(container, id){

        },
    }
});
