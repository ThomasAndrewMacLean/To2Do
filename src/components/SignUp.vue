<template>
  <div>
    <h3 class="center-text">{{ msg }}</h3>
    <div class="hello">
      <div class="six columns">
        <form v-on:submit.prevent="signup">
          <label for="exampleEmailInput">Email</label>
          <input class="u-full-width" type="email" placeholder="example@something.io" v-model="email">
          <label for="exampleEmailInput">Password</label>
          <input class="u-full-width" type="password" placeholder="p@55w0rD" v-model="password">
          <input type="submit" :disabled="email===''||password===''" value="signup" class="button-primary" />
        </form>
      </div>
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
          fetch(api + 'users').then(x => x.json()).then(y => console.log(y));
      },
      data() {
          return {
              msg: 'Sign up',
              email: null,
              password: null
          };
      },
      methods: {
          signup() {
              console.log(this.email);
              console.warn(this.password);
              fetch(api + 'signup', {
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json'
                  },
                  method: 'POST',
                  body: JSON.stringify({
                      email: this.email,
                      password: this.password
                  })
              }).then(x => x.json().then(y => {
                  console.log(y);
                  localStorage.setItem('token', y.token);
                  router.push('/');
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
