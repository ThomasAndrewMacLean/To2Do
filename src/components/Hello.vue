<template>
  <div>
    <h3 class="center-text">{{ msg }}</h3>
    <div class="hello">
      <div class="six columns">
        <form v-on:submit.prevent="addTodo">
          <label for="exampleEmailInput">New todo</label>
          <input class="u-full-width" type="text" placeholder="add new todo" v-model="newTodoInput">
          <input type="submit" :disabled="!newTodoInput" value="Add" class="button-primary" />
        </form>
      </div>
      <button @click="deleteMode=!deleteMode">🗑 {{deleteMode}}</button>
    </div>
    <section class="todoContainer">

      <div v-for="todo in todoos" class="todo" :key="todo._id">
        <div v-bind:class="{ 'deleteMode': deleteMode}" class="todoInner" @click="toggleToDo(todo)">
          {{ todo.todo }}
          <div v-if="todo.done">✅</div>
          <p v-if="!todo.done"></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import {
      api
  } from '../api/api';
  export default {
      name: 'hello',
      mounted() {
          fetch(api + 'todoos', {
              headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
              },
              method: 'GET'
          }).then(x => x.json().then(y => {
              //      console.log(x);
              console.log(y);
              if (y.message === 'jwt expired') {
                  this.$router.push('/login');
              }
              if (y.message === 'jwt malformed') {
                  this.$router.push('/signup');
              }
              this.todoos = y;
          })).catch(err => {


              console.log(err);
          });
      },
      data() {
          return {
              msg: 'Welcome to Your Vue.js PWA',
              newTodoInput: null,
              todoos: [],
              deleteMode: false
          };
      },
      methods: {
          toggleToDo(todo) {
              if (this.deleteMode) {
                  this.deleteTodo(todo._id);
                  return;
              }
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
              })).catch(() => {
                  this.$router.push('/login');
              });
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
              })).catch(() => {
                  this.$router.push('/login');
              });
          },
          deleteTodo(id) {
              event.stopPropagation();
              console.log('delete ' + id);

              fetch(api + 'deleteTodo', {
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + localStorage.getItem('token')
                  },
                  method: 'DELETE',
                  body: JSON.stringify({
                      id: id
                  })
              }).then(x => x.json().then(y => {
                  //      console.log(x);
                  console.log(y);
                  if (y.message === 'jwt expired') {
                      this.$router.push('/login');
                  }
                  if (y.message === 'jwt malformed') {
                      this.$router.push('/signup');
                  }
                  this.todoos.splice(this.todoos.findIndex(i => i._id === id), 1);
              })).catch(() => {
                  this.$router.push('/login');
              });
          }

      }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .todoContainer {
    width: 90%;
    max-width: 900px;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
  }

  .todoInner.deleteMode {
    background: red;
    color: white;
  }

  .todo {
    width: 25%;
    float: left;
    box-sizing: border-box;
    padding: 10px 10px;
  }

  .todoInner {
    cursor: pointer;
    padding: 35px;
    background: var(--color-two);
  }

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
