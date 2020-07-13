var app = new Vue({
  el: '#app',
  data: {
    newTodo:"",
    todos:[
      {
        id:"test",
        title:"測試資料",
        completed:false
      }
    ],
    cacheTodo:{},
    cacheTitle:"",
    visibility:"all"
  },
  methods: {
    addTodo: function(){
      var value = this.newTodo.trim();
      // Math.floor()取小於這個數的最大整數
      var timestamp = Math.floor(Date.now());
      // console.log(value , timestamp);
      // 下方判斷式是為了避免input沒有輸入任何值就要直接送出。但這方法無法避免輸入一個空值後直接送出，所以必須使用trim()來解決此問題。
      // trim() 方法返回一个从两头去掉空白字符的字符串，并不影响原字符串本身。
      if(!value){
        return;
      }
      this.todos.push({
        id: timestamp,
        title: value,
        completed: false
      });
      this.newTodo = "";
    },
    removeTodo: function(todo){
      // removeTodo(item)，原本函式中帶入的參數是 item ，此處改成 todo ，僅是為了與 findIndex 中函式帶入的參數 item 做區別，
      // 實質上不會影響函式結果。函式中帶入的參數 item (又或者寫成 todo ) 是指"目前所點選的物件"。 
      // var newIndex = "";
      // var vm = this;
      // findIndex 是比較簡單找到索引的方式，會把回傳為 true 的索引位置儲存到 newIndex
      var newIndex = this.todos.findIndex(function(item,key){
        return todo.id === item.id;
      })
      // splice( 删除项目的位置 , 要删除的项目数量 )
      this.todos.splice(newIndex , 1);
    },
    editTodo: function(item){
      console.log(item);
      this.cacheTodo = item;
      this.cacheTitle = item.title;
    },
    cancelEdit: function(){
      // 用 v-if 判斷式 判斷 item.id 是否等於 cacheTodo.id ，作為"雙擊修改資料內容"是否完成的開關 
      this.cacheTodo = {};
    },
    doneEdit: function(item){
      item.title = this.cacheTitle;
      this.cacheTitle = "";
      this.cacheTodo = {};
    },
    clearAll: function(){
      this.todos = [];
    }
  },
  computed: {
    filterTodos: function(){
      if(this.visibility == "all"){
      return this.todos;
      }else if(this.visibility == "active"){
        var newTodos = [];
        //this.newTodos.push();
        this.todos.forEach(function (item){
          if(!item.completed){
            newTodos.push(item);
          }
        })
        return newTodos;
      }else if(this.visibility == "completed"){
        var newTodos = [];
        this.todos.forEach(function (item){
          if(item.completed){
            newTodos.push(item);
          }
        })
        return newTodos;
      }
    },
    countNumber: function(){
      var number = 0;
      this.todos.forEach(function(item){
        if(item.completed == false){
          number += 1;
        }
      })
      return number;
    }
  },
});