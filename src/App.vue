<template>
    <div id="app">
        <header>
            <span @click="goTooTo2Do">To2Do</span>
            {{email}}
            <button v-if="email" @click="logout" class="logout-btn u-pull-right">logout</button>
        </header>
        <main>
            <div id="loader" v-bind:class="{ 'show': showLoader}">
                <div class="loaderMsg">

                    <div class="spinner"></div>
                    Loading...
                </div>
            </div>
            <router-view @setEmail="setEmail" @setLoader="setLoader"></router-view>
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
                email: null,
                showLoader: false
            };
        },
        methods: {
            goTooTo2Do() {
                this.$router.push('/To2Do');

            },
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
            },
            setLoader(bool) {
                this.showLoader = bool;
            }
        }
    };

</script>

<style>
    #loader {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.5);
        justify-content: center;
        align-items: center;
        display: none;
        z-index: 999;
    }

    #loader.show {
        display: flex;

    }

    .spinner {
        width: 40px;
        height: 40px;
        border-radius: 80px;
        margin: auto;
        border: 3px solid var(--color-three);
        border-top: 3px solid var(--color-one);
        animation: rotating 2s linear infinite;
        -webkit-animation: rotating 2s linear infinite;

        margin-bottom: 2rem;
    }

    @-webkit-keyframes rotating {
        from {
            -webkit-transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(360deg);
        }
    }

    @keyframes rotating {
        from {
            -webkit-transform: rotate(0deg);
        }
        to {
            -webkit-transform: rotate(360deg);
        }
    }

    .loaderMsg {

        background: var(--color-three);
        border-radius: 4px;
        padding: 3rem;
        border: 3px solid var(--color-one);
    }

    body {
        height: 100vh;
        margin: 0;
        background: var(--color-three);
    }

    .pull-right {
        float: right;
    }

    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
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

        letter-spacing: 0.02em;

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

    footer code {
        background: transparent;
        border: none;
    }

    .emoji {
        text-decoration: none;
        cursor: help;
        font-size: large;
        font-style: normal;
    }

</style>
