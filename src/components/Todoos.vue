<template>
    <div>
        <h3 class="center-text">{{ msg }}</h3>
        <div class="hello">
            <div class="six columns">
                <form v-on:submit.prevent="addTodo">
                    <label for="exampleEmailInput">New todo</label>
                    <input class="u-full-width" type="text" placeholder="add new todo" v-model="newTodoInput">
                    <div class="btn-wrap">

                        <input id="submit-btn" type="submit" :disabled="!newTodoInput" value="Add" class="button-primary" />
                        <button id="delete-btn" @click.prevent="toggleDeleteMode">🗑</button>
                    </div>
                </form>
            </div>
        </div>
        <section class="todoContainer">

            <div v-for="todo in todoos" class="todo" :key="todo._id">
                <div v-bind:class="{ 'deleteMode': deleteMode}" class="todoInner" @click="toggleToDo(todo, $event)">
                    {{ todo.todo }}
                    <div v-if="todo.done">✅</div>
                    <p v-if="!todo.done"></p>
                </div>
            </div>
        </section>
        <transition name="snackBar">
            <div v-if="snackBarMsg" class="snackBarMsgWrap" v-on:click="setSnackBarMsg('')">
                <span class="snackBarMsg">
                    {{ snackBarMsg }}
                </span>
            </div>
        </transition>
    </div>
</template>

<script>
    import {
        api
    } from '../api/api';
    export default {
        name: 'todoosPage',
        mounted() {
            this.auth = 'Bearer ' + localStorage.getItem('token');
            if (localStorage.getItem('googleToken')) {
                this.auth = 'Google ' + localStorage.getItem('googleToken');
            }
            fetch(api + 'todoos', {
                headers: {
                    Authorization: this.auth
                },
                method: 'GET'
            })
                .then(x =>
                    x.json().then(y => {
                        if (y.message === 'jwt malformed') {
                            this.$router.push('/signup');
                        }
                        if (x.status === 403) {
                            this.$router.push('/login');
                        }
                        this.todoos = y.todoos;
                        this.$emit('setEmail', y.user);
                    })
                )
                .catch(err => {
                    console.log(err);
                });
        },
        data() {
            return {
                msg: 'Welcome to Your To2Do app!',
                newTodoInput: null,
                todoos: [],
                deleteMode: false,
                auth: '',
                snackBarMsg: ''
            };
        },
        computed: {
            //msg: () => this.deleteMode ? 'Click a To2Do to delete it! ☠️' : 'Welcome to Your To2Do app!'

        },
        methods: {
            toggleDeleteMode() {

                this.deleteMode = !this.deleteMode;
                this.msg = this.deleteMode ? 'Click a To2Do to delete it! ☠️' : 'Welcome to Your To2Do app!';
            },
            setSnackBarMsg(msg) {
                this.snackBarMsg = msg;
                if (msg) {
                    setTimeout(() => this.setSnackBarMsg(''), 1500);
                }
            },
            toggleToDo(todo, e) {
                if (e.altKey) {
                    const el = document.createElement('textarea');
                    el.value = todo.todo;
                    document.body.appendChild(el);
                    el.select();
                    document.execCommand('copy');
                    document.body.removeChild(el);

                    this.setSnackBarMsg('To2Do copied! 💾');
                    return;
                }

                if (this.deleteMode) {
                    this.deleteTodo(todo._id);
                    return;
                }
                todo.done = !todo.done;
                fetch(api + 'toggleDone/', {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: this.auth
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        id: todo._id,
                        done: todo.done
                    })
                })
                    .then(x =>
                        x.json().then(y => {
                            this.newTodoInput = null;
                        })
                    )
                    .catch(() => {
                        this.$router.push('/login');
                    });
            },
            addTodo() {
                fetch(api + 'addtodo/', {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: this.auth
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        todo: this.newTodoInput
                    })
                })
                    .then(x =>
                        x.json().then(y => {
                            this.newTodoInput = null;
                            //  console.log(x);
                            console.log(y);
                            this.todoos.push(y);
                            this.setSnackBarMsg('To2Do added ! 👍');
                        })
                    )
                    .catch(() => {
                        this.$router.push('/login');
                    });
            },
            deleteTodo(id) {
                event.stopPropagation();
                fetch(api + 'deleteTodo/', {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: this.auth
                    },
                    method: 'DELETE',
                    body: JSON.stringify({
                        id: id
                    })
                })
                    .then(x =>
                        x.json().then(y => {
                            if (y.message === 'jwt expired') {
                                this.$router.push('/login');
                            }
                            if (y.message === 'jwt malformed') {
                                this.$router.push('/signup');
                            }
                            this.todoos.splice(this.todoos.findIndex(i => i._id === id), 1);
                        })
                    )
                    .catch(() => {
                        this.$router.push('/login');
                    });
            }
        }
    };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .btn-wrap {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
    }

    #submit-btn {
        width: 75%;
    }

    #delete-btn {
        width: 22%;
    }

    .snackBarMsgWrap {
        bottom: 0;
        background: var(--color-four);
        position: fixed;
        height: 60px;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-weight: lighter;
        font-size: large;
    }

    .snackBar-enter-active,
    .snackBar-leave-active {
        transition: opacity .5s;

    }

    .snackBar-leave-to,
    .snackBar-enter {
        opacity: 0;
    }

    .todoContainer {
        width: 90%;
        max-width: 900px;
        margin: auto;
        display: flex;
        flex-wrap: wrap;
    }

    .todoInner.deleteMode {
        background: var(--color-one);
        color: white;
    }

    .todo {
        width: 25%;
        float: left;
        box-sizing: border-box;
        padding: 10px 10px;
    }

    @media (max-width: 900px) {
        .todo {
            width: 33.3333%;
        }
    }

    @media (max-width: 650px) {
        .todo {
            width: 50%;
        }
    }

    @media (max-width: 450px) {
        .todo {
            width: 100%;
        }
        form {
            margin: 2rem;
        }
    }

    .todoInner {
        cursor: pointer;
        padding: 35px;
        word-break: break-word;
        background: var(--color-two);
        overflow: hidden;
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

    #deleteButton {
        position: absolute;
        top: 10rem;
        right: 3rem;
        font-size: 2rem;
    }

</style>
