<template>
    <div id="home">
        hoi
    </div>
</template>

<script>
    export default {
        name: 'Home',
        mounted() {
            if (localStorage.getItem('token')) {
                this.$router.push('/To2Do');
            } else if (localStorage.getItem('to2do')) {
                this.$router.push('/Login');
            } else {
                this.$router.push('/Signup');
            }
        },
        data() {
            return {

            };
        },
        methods: {

        }
    };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #home {
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>
