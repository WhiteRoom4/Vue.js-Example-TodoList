const vm = new Vue({
    el: "#app",
    data: {
      newItem:"",
      toDoList:["洗衣服","澆花","拖地"],
      DoneList:[]
    },
    methods:{
      pushNewItem: function(){
        this.toDoList.push(this.newItem)
        this.newItem=""
      }
    },
    computed:{
      doneString:function(){
        return this.DoneList.join(",")
      }
    },
    filters:{
    //也是function寫法
      checkboxFormat: (str) => {
      return `| ${str} |`
      }
    },
    watch:{
      toDoList: function(){
        alert("已新增項目")
      }
    }
})  