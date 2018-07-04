<template>
  <div id="app">
    <header>
      <span>To2Do</span>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'app'

  };


</script>

<style>
  body {

    height: 100vh;
    margin: 0;
    background: var(--color-three);

  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--color-one);


  }

  main {
    text-align: center;
    margin-top: 40px;

    background: var(--color-three);
  }

  header {
    margin: 0;
    height: 56px;
    padding: 0 16px 0 24px;

    background-color: var(--color-one);
    color: #ffffff;
  }

  header span {
    display: block;
    position: relative;
    font-size: 20px;
    line-height: 1;

    letter-spacing: .02em;

    font-weight: 400;
    box-sizing: border-box;
    padding-top: 16px;
  }

</style>
