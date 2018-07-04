<template>
  <div class="hello">
    <h3>{{ msg }}</h3>
  </div>
</template>

<script>
  import {
    api
  } from "../api/api";
  export default {
    name: 'hello',
    mounted() {
      fetch(api + "users").then(x => x.json()).then(y => console.log(y));
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js PWA'
      }
    }
  }

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

</style>
