<template>
  <div>
    <h3 class="center-text">Confirm</h3>
    <div class="hello">
      <div class="six columns">
        And email was sent to you, please click the link in that email to finish the sign up.
      </div>
    </div>
  </div>
</template>

<script>
  import {
      api
  } from '../api/api';

  export default {
      name: 'Confirm',
      mounted() {
      //fetch(api + 'users').then(x => x.json()).then(y => console.log(y));
      },
      data() {
          return {

          };
      },
      methods: {}
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello {
    display: flex;
    justify-content: center;
    padding: 3rem;
  }

</style>
