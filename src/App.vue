<template>
  <div id="app">
    <header>
      <span>To2Do</span>
      {{email}}
      <button @click="logout" class="logout-btn u-pull-right">logout</button>
    </header>
    <main>
      <router-view @setEmail="setEmail"></router-view>
    </main>
    <footer>
      <code>
        made by:
        <a href="mailto:thomas.maclean+work@gmail.com">thomas maclean</a>
        <router-link class="emoji" to="Admin">🤖</router-link>

        {{'© ' +new Date().getFullYear()}}
      </code>
    </footer>
  </div>
</template>

<script>
  export default {
      name: 'app',
      data() {
          return {
              email: null
          };
      },
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
              this.email = null;
              this.$router.push('/login');
          },
          setEmail(email) {
              this.email = email;
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

    height: 100vh;
  }


  main {
    margin: 40px 0;
    min-height: calc(100vh - 196px);
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


  footer {
    height: 60px;
    background: var(--color-four);
    width: 100vw;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: medium;
  }

  .emoji {
    text-decoration: none;
    cursor:help;
    font-size: large;
    font-style: normal;
  }

</style>
