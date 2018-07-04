<template>
  <div>
    <h3 class="center-text">{{ msg }}</h3>
    <div class="hello">
      <div class="six columns">
        <label for="exampleEmailInput">New todo</label>
        <input class="u-full-width" type="text" placeholder="add new todo" v-model="newTodoInput">
        <button class="button-primary" @click="addTodo">Add</button>
      </div>
    </div>
    <div v-for="todo in todoos" :key="todo._id" @click="toggleToDo(todo)">
      {{ todo.todo }} {{todo.done}}
    </div>
  </div>
</template>

<script>
  import {
      api
  } from '../api/api';
  export default {
      name: 'hello',
      mounted() {
          fetch(api + 'users').then(x => x.json()).then(y => console.log(y));
          fetch(api + 'todoos', {
              headers: {

                  'Authorization': 'Bearer ' + localStorage.getItem('token')
              },
              method: 'GET'
          }).then(x => x.json().then(y => {
              //      console.log(x);
              console.log(y);
              this.todoos = y;
          }));
      },
      data() {
          return {
              msg: 'Welcome to Your Vue.js PWA',
              newTodoInput: null,
              todoos: []
          };
      },
      methods: {
          toggleToDo(todo) {
              console.log(todo);
              todo.done = !todo.done;
              fetch(api + 'toggleDone', {
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + localStorage.getItem('token')
                  },
                  method: 'POST',
                  body: JSON.stringify({
                      id: todo._id,
                      done: todo.done
                  })
              }).then(x => x.json().then(y => {
                  this.newTodoInput = null;
                  //  console.log(x);
                  console.log(y);
              }));
          },
          addTodo() {


              fetch(api + 'addtodo', {
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + localStorage.getItem('token')
                  },
                  method: 'POST',
                  body: JSON.stringify({
                      todo: this.newTodoInput
                  })
              }).then(x => x.json().then(y => {
                  this.newTodoInput = null;
                  //  console.log(x);
                  console.log(y);
                  this.todoos.push(y);
              }));
          }

      }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: var(--color-one);
  }

  .hello {
    display: flex;
    justify-content: center;
  }

</style>
