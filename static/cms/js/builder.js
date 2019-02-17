Vue.component('cmscontainer',{
  props:['index', 'width_id', 'width_name', 'width', 'draggable', 'id'],
  template:'#cmscontainer',
  methods:{
    removeEl : function() {

      this.$parent.deleteContainer(this.index);
    },
    increaseSize : function() {
      this.$parent.increaseSize(this);
    },
    decreaseSize : function() {
      this.$parent.decreaseSize(this);
    },
    dragstart : function() {
      this.$parent.startDrag(this);

      this.$el.setAttribute('draggable', 'true');
      this.$el.classList.add('ghost');
    },
    dragEnd : function(){
      this.$el.setAttribute('draggable', 'false');
      this.$el.classList.remove('ghost');
    },
    dragOver : function(e){
      e.preventDefault();
      let distance = e.offsetX/this.$el.offsetWidth;
      if (distance > 0.5){
        this.$el.classList.add('dragHoverRight');
        this.$el.classList.remove('dragHoverLeft');
      } else {
        this.$el.classList.remove('dragHoverRight');
        this.$el.classList.add('dragHoverLeft');
      }
    },
    drop : function(e){
      let distance = e.offsetX/this.$el.offsetWidth;
      this.$el.classList.remove('dragHoverRight');
      this.$el.classList.remove('dragHoverLeft');
      this.$parent.drop(this, distance);
    },
    dragLeave : function(e){
      this.$el.classList.remove('dragHoverRight');
      this.$el.classList.remove('dragHoverLeft');
    }
  },
  computed : {
    widthStyle : function(){
      return {
        width : 'calc('+this.width+'% - 2em)'
      };
    },
  },
  data: function(){
    return {
      styleObject : {
          width : 'calc('+this.width+'% - 2em)'
      }
    };
  },
  created : function(){

  }
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
    }
  },
  methods : {
    serializeContainers : function(){
      return JSON.stringify(this.containers);
    },
    getContainers : function(){
    },
    addNewContainer : function(){
      this.containers.push({
        'id' : this.makeId(),
        'width_id':0,
        'width_name' : this.widths[0].name,
        'width':this.widths[0].value,
      });
      /*this.$set(this.containers, this.makeId(), {
        'width_id':0,
        'width_name' : this.widths[0].name,
        'width':this.widths[0].value,
      });*/
    },
    deleteContainer : function(index){

      this.containers.splice(index, 1);
      //delete this.containers[index];
      //++this.i;
      //this.$delete(this.containers, index);
    },
    makeId : function(){
      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (let i = 0; i < 32; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    },
    increaseSize : function(el){
      if (el.width_id == this.widths.length-1) {
        return;
      }

      i = el.width_id+1;
      let element = this.containers[el.index];
      element.width_id = i;
      element.width_name = this.widths[i].name;
      element.width = this.widths[i].value;
      this.$set(this.containers, el.index, element);

      return;
    },
    decreaseSize : function(el){
      if (el.width_id == 0){
        return;
      }

      i = el.width_id-1;
      let element = this.containers[el.index];
      element.width_id = i;
      element.width_name = this.widths[i].name;
      element.width = this.widths[i].value;
      this.$set(this.containers, el.index, element);

      return;
    },
    startDrag : function(el){
      this.dragEl = el.index;
    },
    drop : function(el, pos){
      if (this.dragEl == el.index){
        return;
      }

      //Getting the dragged element
      let dragged = this.containers[this.dragEl];
      //Splicing it out of the container (removing)
      this.containers.splice(this.dragEl, 1);

      //Find the current array index of the dropped element.

      let dropIndex = 0;
      for (let i=0; i<this.containers.length; ++i){
        if (this.containers[i].id == el.id){
          dropIndex = i;
        }
      }

      if (pos < 0.5){
        this.containers.splice(dropIndex, 0, dragged);
      } else {
        this.containers.splice(dropIndex+1, 0, dragged);
      }

      return;

    },
  }
});
