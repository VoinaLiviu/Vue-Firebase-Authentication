import { createStore } from 'vuex'
import router from '../router'
import { auth, db } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

import { doc, setDoc } from 'firebase/firestore'

export default createStore({
  state: {
    user: null
  },
  getters: {
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
    },
    CLEAR_USER(state) {
      state.user = null
    }
  },
  actions: {
    async login({ commit }, details) {
      const { email, password } = details

      try {
        await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            alert("User not found")
            break
          case 'auth/wrong-password':
            alert("Wrong password")
            break
          default:
            alert("Something went wrong")
        }

        return
      }

      commit('SET_USER', auth.currentUser)

      router.push('/')
    },

    async register({ commit }, details) {
      const { fname, lname, email, password, conf } = details

      if (password === conf) {
        try {
          await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
          switch (error.code) {
            case 'auth/email-already-in-use':
              alert("Email already in use")
              break
            case 'auth/invalid-email':
              alert("Invalid email")
              break
            case 'auth/operation-not-allowed':
              alert("Operation not allowed")
              break
            case 'auth/weak-password':
              alert("Weak password")
              break
            default:
              alert("Something went wrong")
          }
          return
        }
      } else {
        alert("Passwords don't match")
        return
      }


      commit('SET_USER', auth.currentUser)
      console.log(auth.currentUser.uid)

      await setDoc(doc(db, 'userDetails', auth.currentUser.uid), {
        fname: fname,
        lname: lname
      });

      router.push('/')
    },

    async logout({ commit }) {
      await signOut(auth)

      commit('CLEAR_USER')

      router.push('/login')
    },

    fetchUser({ commit }) {
      auth.onAuthStateChanged(async user => {
        if (user === null) {
          commit('CLEAR_USER')
        } else {
          commit('SET_USER', user)

          if (router.isReady() && router.currentRoute.value.path == '/login') {
            router.push('/')
          }
        }
      })
    }
  }
})
