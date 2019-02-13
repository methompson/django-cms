Vue.component('cmscontainer',{
  props:['k'],
  template:'#cmscontainer',
  methods:{
    removeEl : function() {
      console.log("Deleted!");
      console.log(this.k);
      this.$parent.deleteContainer(this.k);
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
    deleteContainer : function(k){
      this.containers.splice(k, 1);
    }
  }
});
