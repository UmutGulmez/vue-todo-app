function arrayRemove (array, value) {
    return array.filter(function(element){
        return element != value;
    });
}

const VUE = new Vue({
    el: '#app',
    data: {
      todos : [],
      archivedTodos : [],
      doneTodos : [],
      errors : [],
      errorMessages : {
        sameTodo : "You cant add same todo!",
        blankTodo : "You need to write sth!"
      }
    },
    methods : {
      addTodo : function () {
        var todosArray = this.todos
        console.log(this.inputValue)
        if (this.inputValue == undefined) {
          var errorMessage = this.errorMessages.blankTodo
          console.log(errorMessage)
          this.errors.push(errorMessage)
        } else if (this.inputValue.trim() == "") {
          this.errors.push(this.errorMessages.blankTodo)
        } else if (this.todos.includes(this.inputValue.trim())) {
          var errorMessage = this.errorMessages.sameTodo
          this.errors.push(errorMessage)
        } else {
          this.errors = []
          todosArray.push(this.inputValue.trim())
          this.inputValue = null;
          localStorage.setItem('todos', JSON.stringify(todosArray))
        }
      },
      archiveTodo : function (todo) {
        var archiveTodosArray = this.archivedTodos
        var newTodos = arrayRemove(this.todos, todo)
        this.todos = arrayRemove(this.todos, todo)
        archiveTodosArray.push(todo)
        localStorage.setItem('archivedTodos', JSON.stringify(archiveTodosArray))
        localStorage.setItem('todos', JSON.stringify(newTodos))
      },
      doneTodo : function (todo) {
        var doneTodosArray = this.doneTodos
        var newTodos = arrayRemove(this.todos, todo)
        this.todos = arrayRemove(this.todos, todo)
        doneTodosArray.push(todo)
        localStorage.setItem('doneTodos', JSON.stringify(doneTodosArray))
        localStorage.setItem('todos', JSON.stringify(newTodos))
      },
      deleteDoneTodo : function (doneTodo) {
        var doneTodosArray = this.doneTodos
        var newDoneTodos = arrayRemove(doneTodosArray, doneTodo)
        this.doneTodos = arrayRemove(doneTodosArray, doneTodo)
        localStorage.setItem('doneTodos', JSON.stringify(newDoneTodos))
      },
      deleteArchivedTodo : function (archivedTodo) {
        var archivedTodosArray = this.archivedTodos
        var newArchivedTodos = arrayRemove(archivedTodosArray, archivedTodo)
        this.archivedTodos = arrayRemove(archivedTodosArray, archivedTodo)
        localStorage.setItem('archivedTodos', JSON.stringify(newArchivedTodos))
      },
    }
})

document.addEventListener("DOMContentLoaded", () => {
  JSON.parse(localStorage.getItem('todos')).forEach((item) => {
    VUE.todos.push(item)
  });

  JSON.parse(localStorage.getItem('archivedTodos')).forEach((item) => {
    VUE.archivedTodos.push(item)
  });

  JSON.parse(localStorage.getItem('doneTodos')).forEach((item) => {
    VUE.doneTodos.push(item)
  });
});
