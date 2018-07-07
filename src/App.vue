<template>
  <div id="app">
    <header>
      <span>To2Do</span>
      <button @click="logout" class="logout-btn u-pull-right">logout</button>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  export default {
      name: 'app',
      methods: {
          logout() {
              localStorage.removeItem('googleToken');
              localStorage.removeItem('token');
              var auth2 = gapi.auth2.getAuthInstance();
              if (auth2) {
                  auth2.signOut().then(function () {
                      console.log('User signed out.');
                  });
              }
              this.$router.push('/login');
          }
      }

  };

</script>

<style>
  body {

    height: 100vh;
    margin: 0;
    background: var(--color-three);

  }

  .pull-right {
    float: right;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: var(--color-one);


  }

  main {
    margin-top: 40px;

    background: var(--color-three);
  }

  header {
    margin: 0;
    height: 56px;
    padding: 0 16px 0 24px;

    background-color: var(--color-one);
    color: #ffffff;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  .logout-btn {
    color: white;
    border: 1px solid white;
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
