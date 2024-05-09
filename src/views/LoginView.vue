<template>
    <main>
      <section class="form">
          <form class="login" @submit.prevent="login">
              <h2>Login</h2>
  
              <input type="email" 
              placeholder="Email address" 
              v-model="login_form.email"/>
  
              <input type="password" 
              placeholder="Password" 
              v-model="login_form.password"/>
  
              <input type="submit" 
              value="Login" />
          </form>
      </section>
      <section class="register">
        <p>Don't have an account?</p>
        <router-link to="/register">Register</router-link>
      </section>
      
    </main>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { useStore} from 'vuex'
  
  export default {
      setup() {
        const login_form = ref ({});
        const store = useStore();
  
        const login = () => {
            store.dispatch('login', login_form.value)
        }

        return {
            login_form,
            login
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