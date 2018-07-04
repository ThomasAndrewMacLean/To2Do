<template>
  <div>
    <h3 class="center-text">{{ msg }}</h3>
    <div class="hello">
      <div class="six columns">
        <label for="exampleEmailInput">New todo</label>
        <input class="u-full-width" type="text" placeholder="add new todo" id="newTodoInput">
        <button class="button-primary">Add</button>
      </div>
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
      },
      data() {
          return {
              msg: 'Welcome to Your Vue.js PWA'
          };
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
