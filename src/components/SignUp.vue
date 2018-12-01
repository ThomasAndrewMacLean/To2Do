<template>
    <div>
        <h3 class="center-text">{{ msg }}</h3>
        <div class="hello">
            <div class="six columns form-wrap">
                <form v-on:submit.prevent="signup">
                    <label for="exampleEmailInput">Email</label>
                    <input class="u-full-width" type="email" placeholder="example@something.io" v-model="email">
                    <label for="exampleEmailInput">Password</label>
                    <input class="u-full-width" type="password" placeholder="p@55w0rD" v-model="password">
                    <div class="btn-wrap">
                        <input type="submit" :disabled="email===''||password===''" value="signup" class="button-primary" />
                        <button @click.prevent id="customBtn">
                            Or sign up with Google
                        </button>
                        <button class="tertiorButton" @click.prevent="goToLogin">
                            Allready have an account? Login here
                        </button>
                    </div>
                </form>
                <div class="warning">{{error}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        api
    } from '../api/api';

    export default {
        name: 'SignUp',
        mounted() {
            gapi.load('auth2', () => {
                // Retrieve the singleton for the GoogleAuth library and set up the client.
                var auth2 = gapi.auth2.init({
                    client_id: '171417293160-02sar26733jopm7hvfb6e5cgk4mq21d7.apps.googleusercontent.com'
                });
                const element = document.getElementById('customBtn');
                auth2.attachClickHandler(element, {},
                    (googleUser) => {
                        var id_token = googleUser.getAuthResponse().id_token;
                        this.$emit('setLoader', true);

                        localStorage.setItem('googleToken', id_token);
                        localStorage.setItem('to2do', true);

                        const profile = auth2.currentUser.get().getBasicProfile();

                        fetch(api + 'loginGoogle', {
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                Authorization: 'Google ' + id_token
                            },
                            method: 'POST',
                            body: JSON.stringify({
                                name: profile.getName()
                            })
                        });
                        this.$emit('setEmail', profile.getName());
                        this.$emit('setLoader', false);

                        this.$router.push('/To2Do');
                    },
                    function (error) {
                        alert(JSON.stringify(error, undefined, 2));
                    });
            });
        },
        data() {
            return {
                msg: 'Sign up',
                email: null,
                password: null,
                error: null
            };
        },
        methods: {
            signup() {
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
                }).then(x =>
                    x.json().then(y => {
                        if (y.token) {
                            localStorage.setItem('token', y.token);
                            localStorage.setItem('to2do', true);
                            this.$router.push('/Confirm');
                        } else {
                            this.error = 'Something went wrong';
                        }
                    })
                );
            },
            goToLogin() {
                this.$router.push('/Login');
            }
        }
    };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @media (max-width: 450px) {
        .hello {
            margin: 2rem;
        }
    }

    .warning {
        color: tomato
    }

    .btn-wrap {
        display: flex;
        /* //justify-content: space-between; */
        flex-direction: column;
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

    .form-wrap {
        max-width: 400px;
    }

</style>
