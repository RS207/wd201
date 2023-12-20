const fs = require('fs');

const createTodoList = () => {
  let todos = [];

  const addTodo = (title, dueDate, completed = false) => {
    todos.push({ title, dueDate, completed });
  };

  const markAsComplete = (index) => {
    if (index >= 0 && index < todos.length) {
      todos[index].completed = true;
    }
  };

  const getOverdueTodos = () => {
    const today = new Date().toISOString().split("T")[0];
    return todos.filter((todo) => !todo.completed && todo.dueDate < today);
  };

  const getDueTodayTodos = () => {
    const today = new Date().toISOString().split("T")[0];
    return todos.filter((todo) => !todo.completed && todo.dueDate === today);
  };

  const getDueLaterTodos = () => {
    const today = new Date().toISOString().split("T")[0];
    return todos.filter((todo) => !todo.completed && todo.dueDate > today);
  };

  const formatTodoList = (todoList) => {
    let formattedList = "";
    todoList.forEach((todo) => {
      const checkbox = todo.completed ? "[x]" : "[ ]";
      const dueDate = todo.dueDate === today ? "" : ` ${todo.dueDate}`;
      formattedList += `${checkbox} ${todo.title}${dueDate}\n`;
    });
    return formattedList;
  };

  return {
    addTodo,
    markAsComplete,
    getOverdueTodos,
    getDueTodayTodos,
    getDueLaterTodos,
    formatTodoList,
  };
};

// ####################################### #
// DO NOT CHANGE ANYTHING BELOW THIS LINE. #
// ####################################### #

module.exports = createTodoList;
const todoManager = createTodoList();

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

var dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(new Date(new Date().setDate(dateToday.getDate() - 1)));
const tomorrow = formattedDate(new Date(new Date().setDate(dateToday.getDate() + 1)));

todoManager.addTodo("Submit assignment", yesterday);
todoManager.addTodo("Pay rent", today, true);
todoManager.addTodo("Service Vehicle", today);
todoManager.addTodo("File taxes", tomorrow);
todoManager.addTodo("Pay electric bill", tomorrow);

console.log("My Todo-list\n");

console.log("Overdue");
var overdues = todoManager.getOverdueTodos();
var formattedOverdues = todoManager.formatTodoList(overdues);
console.log(formattedOverdues);
console.log("\n");

console.log("Due Today");
let itemsDueToday = todoManager.getDueTodayTodos();
let formattedItemsDueToday = todoManager.formatTodoList(itemsDueToday);
console.log(formattedItemsDueToday);
console.log("\n");

console.log("Due Later");
let itemsDueLater = todoManager.getDueLaterTodos();
let formattedItemsDueLater = todoManager.formatTodoList(itemsDueLater);
console.log(formattedItemsDueLater);
console.log("\n\n");
