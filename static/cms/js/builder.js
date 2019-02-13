Vue.component('cmscontainer',{
  props:['index', 'fraction'],
  template:'#cmscontainer',
  methods:{
    removeEl : function() {
      console.log("Deleted!");

      this.$parent.deleteContainer(this.index);
    }
  }
});

var builderApp = new Vue({
  el: '#builder',
  data: {
    containers : [],
  },
  methods : {
    getContainers : function(){
      console.log(this.containers);
    },
    addNewContainer : function(){
      this.containers.push({'width':'1/6'});
    },
    deleteContainer : function(index){
      this.containers.splice(index, 1);
    }
  }
});
