<template>
    <div>
        <h3 class="center-text">{{ msg }}</h3>
        <div class="hello">
            <div class="six columns form-wrap">
                <form v-on:submit.prevent="login">

                    <label for="exampleEmailInput">Email</label>
                    <input class="u-full-width" type="email" placeholder="example@something.io" @blur="onBlurEmail"
                        v-model="email">
                    <label for="exampleEmailInput">Password</label>
                    <input class="u-full-width" type="password" placeholder="p@55w0rD" @blur="onBlurPassword" v-model="password">
                    <div class="btn-wrap">
                        <input type="submit" :disabled="email===''||password===''" value="login" class="button-primary" />
                        <button @click.prevent id="customBtn">
                            Login with Google
                        </button>
                        <button class="secondaryButton" @click.prevent="goToSignUp">
                            Sign up
                        </button>
                    </div>
                </form>
                <transition name="error">
                    <div v-if="errorMsg" class="errorMsgWrap" v-on:click="clearErrorMsg">
                        <span class="errorMsg">
                            {{ errorMsg }}
                        </span>
                    </div>
                </transition>
            </div>
        </div>
        <div class="g-signin2" data-onsuccess="onSignIn"></div>
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
                msg: 'Login',
                email: '',
                password: '',
                errorMsg: ''
            };
        },
        methods: {
            goToSignUp() {
                this.$router.push('/Signup');
            },
            onBlurPassword(event) {
                if (event && this.password !== event.target.value) this.password = event.target.value;
            },
            onBlurEmail(event) {
                if (event && this.email !== event.target.value) this.email = event.target.value;
            },
            clearErrorMsg() {
                this.errorMsg = '';
            },
            login() {
                this.$emit('setLoader', true);
                this.$emit('setEmail', this.email);
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
                        this.$emit('setLoader', false);

                        if (x.status === 200) {
                            localStorage.setItem('token', y.token);
                            localStorage.setItem('to2do', true);

                            this.$router.push('/To2Do');
                        }
                        if (y.message) {
                            this.errorMsg = y.message;
                            setTimeout(() => this.clearErrorMsg(), 5000);
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
<style scoped>
    @media (max-width: 450px) {
        .hello {
            margin: 2rem;
        }
    }

    .form-wrap {
        max-width: 400px;
        position: relative;
    }

    .errorMsgWrap {
        background: var(--color-one);
        border-radius: 4px;
        color: white;
        display: flex;
        justify-content: center;
        position: absolute;
        width: 100%;
    }

    .errorMsg {
        padding: 1rem;
    }

    .error-enter-active,
    .error-leave-active {
        transition: all .5s;
        left: 0vw;

    }

    .error-leave-to {
        left: 100vw;
    }

    .error-enter {
        left: -100vw;
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

    .btn-wrap {
        display: flex;
        /* //justify-content: space-between; */
        flex-direction: column;
    }

</style>
