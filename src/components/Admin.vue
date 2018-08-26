<template>
  <div>
    <h3 class="center-text">Admin</h3>
    <div class="adminPage">
      <h5>logs</h5>
      <a href="https://app.logrocket.com/9kqjro/to2do/" target="_blank">logrocket</a>
      <h5>list of users</h5>
      <div v-for="user in users" :key="user.id" @click="getTodo(user)">
        {{user.email}} {{user.created}} {{user.confirmed}}
        <button @click="deleteUser(user)">☠️</button>
        <div v-for="todo in user.todoos" :key="todo._id">
          {{todo}}
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import {
      api
  } from '../api/api';

  export default {
      name: 'Admin',
      mounted() {
          this.auth = 'Bearer ' + localStorage.getItem('token');
          if (localStorage.getItem('googleToken')) {
              this.auth = 'Google ' + localStorage.getItem('googleToken');
          }

          fetch(api + 'admin/allusers', {
              headers: {
                  'Authorization': this.auth
              },
              method: 'GET'
          }).then(x => x.json().then(y => {
              console.log(y);

              this.users = y;
          })).catch(err => {
              console.log(err);
          });
      },
      data() {
          return {
              users: [],
              auth: ''
          };
      },
      methods: {
          getTodo(user) {
              if (user.todoos.length) {
                  user.todoos = [];
                  return;
              }


              fetch(api + 'admin/todoForUser', {
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': this.auth
                  },
                  body: JSON.stringify({
                      email: user.email
                  }),
                  method: 'POST'
              }).then(x => x.json().then(y => {
                  console.log(y);
                  if (y.length) {
                      user.todoos = [...y];
                  } else {
                      user.todoos.push({
                          message: 'user has no todoos'
                      });
                  }
                  //user.email = 'ok';
                  //   this.users.filter(u => u.id === user.id).todoos = y;
                  //   console.log(this.users);

              })).catch(err => {
                  console.log(err);
              });
          },
          deleteUser(user) {
              event.stopPropagation();
              fetch(api + 'admin/deleteUser', {
                  headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'Authorization': this.auth
                  },
                  body: JSON.stringify({
                      email: user.email
                  }),
                  method: 'DELETE'
              }).then(x => x.json().then(y => {
                  console.log(y);
                  this.users.splice(this.users.findIndex(i => i.id === user.id), 1);

                  //user.email = 'ok';
                  //   this.users.filter(u => u.id === user.id).todoos = y;
                  //   console.log(this.users);

              })).catch(err => {
                  console.log(err);
              });
          }
      }
  };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .adminPage {
    flex-flow: column;
    padding: 0 7rem;
  }

</style>
