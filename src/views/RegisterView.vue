<template>
  <main>
    <section class="forms">
        <form class="register" @submit.prevent="register">
            <h2>Register</h2>

            <input type="text" 
            placeholder="First name" 
            v-model="register_form.fname"/>

            <input type="text" 
            placeholder="Last name" 
            v-model="register_form.lname"/>

            <input type="email" 
            placeholder="Email address" 
            v-model="register_form.email"/>

            <input type="password" 
            placeholder="Password" 
            v-model="register_form.password"/>

            <input type="password" 
            placeholder="Confirm password" 
            v-model="register_form.conf"/>

            <input type="submit" 
            value="Register" />
        </form>
    </section>
    <section class="login">
      <p>Already have an account?</p>
      <router-link to="/login">Login</router-link>
    </section>
  </main>
</template>

<script>
import { ref } from 'vue'
import { useStore} from 'vuex'

export default {
    setup() {
        const register_form = ref ({});
        const store = useStore();

        const register = () => {
            store.dispatch('register', register_form.value)
        }
        return {
          register_form,
          register
        }
    }
}
</script>

<style>
 body {
        background-color:rgb(235, 231, 231);
    }
    main {
        height: 100vh;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        align-items: center;
        justify-content: center;
    }
</style>