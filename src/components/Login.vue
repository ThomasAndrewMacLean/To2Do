<template>
  <div>
    <h3 class="center-text">{{ msg }}</h3>
    <div class="hello">
      <div class="six columns">
        <form v-on:submit.prevent="login">

          <label for="exampleEmailInput">Email</label>
          <input class="u-full-width" type="email" placeholder="example@something.io" v-model="email">
          <label for="exampleEmailInput">Password</label>
          <input class="u-full-width" type="password" placeholder="p@55w0rD" v-model="password">
          <input type="submit" :disabled="email===''||password===''" value="login" class="button-primary" />
        </form>
        <div class="errorMsg" v-on:click="clearErrorMsg">{{ errorMsg }}</div>
      </div>
    </div>
    <div class="g-signin2" data-onsuccess="onSignIn"></div>
    <div id="gSignInWrapper">
      <button id="customBtn">
        Google
      </button>
    </div>
  </div>
</template>

<script>
  import {
      api
  } from '../api/api';

  export default {
      name: 'Login',
      mounted() {
          gapi.load('auth2', () => {
              // Retrieve the singleton for the GoogleAuth library and set up the client.
              var auth2 = gapi.auth2.init({
                  client_id: '171417293160-02sar26733jopm7hvfb6e5cgk4mq21d7.apps.googleusercontent.com',
                  cookiepolicy: 'single_host_origin'
                  // Request scopes in addition to 'profile' and 'email'
                  //scope: 'additional_scope'
              });
              const element = document.getElementById('customBtn');
              auth2.attachClickHandler(element, {},
                  (googleUser) => {
                      var id_token = googleUser.getAuthResponse().id_token;
                      localStorage.setItem('googleToken', id_token);
                      this.$router.push('/');

                  },
                  function (error) {
                      alert(JSON.stringify(error, undefined, 2));
                  });
          });
      },
      data() {
          return {
              msg: 'Login',
              email: null,
              password: null,
              errorMsg: ''
          };
      },
      methods: {
          clearErrorMsg() {
              this.errorMsg = '';
          },
          login() {
              console.log(this.email);
              console.warn(this.password);
              fetch(api + 'login', {
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json'
                  },
                  method: 'POST',
                  body: JSON.stringify({
                      email: this.email,
                      password: this.password
                  })
              }).then(x =>
                  x.json().then(y => {
                      console.log(x);
                      console.log(y);
                      if (x.status === 200) {
                          localStorage.setItem('token', y.token);
                          this.$router.push('/');
                      }
                      if (y.message) {
                          this.errorMsg = y.message;
                      }
                  })
              );
          },
          loginGoogle() {

          }
      }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .errorMsg {
    background: red;
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
