<template>
  <div class="ui stackable three column centered grid container">
    <div class="column">
      <h2 class="ui dividing header">
        Sign up. It's free!
      </h2>

      <Notification 
        :message="notification.message"
        :type="notification.type"
        v-if="notification.message"
      />

      <form class="ui form">
        <div class="field" :class="{ error: errors.has('name') }">
          <label for="name">Full name</label>

          <input 
            type="text" 
            id="name"
            name="name"
            v-model="name"
            v-validate="'required'"
          >

          <span
            v-show="errors.has('name')"
            class="is-danger"
          >{{ errors.first('name') }}</span>
        </div>

        <div class="field" :class="{ error: errors.has('username') }">
          <label for="username">Username</label>

          <input 
            type="text" 
            id="username"
            v-model="username"
            name="username"
            :class="{ 'input': true, 'is-danger': errors.has('username') }"
            v-validate="'required'"
          >

          <span
            v-show="errors.has('username')"
            class="is-danger"
          >{{ errors.first('username') }}</span>
        </div>

        <div class="field" :class="{ error: errors.has('email') }">
          <label for="email">Email</label>

          <input 
            type="email" 
            id="email"
            name="email"
            v-model="email"
            :class="{ 'input': true, 'is-danger': errors.has('email') }"
            v-validate="'required|email'"
          >

          <span
            v-show="errors.has('email')"
            class="is-danger"
          >{{ errors.first('email') }}</span>
        </div>

        <div class="field" :class="{ error: errors.has('password') }">
          <label for="password">Password</label>

          <input 
            type="password" 
            id="password"
            name="password"
            v-model="password"
            :class="{ 'input': true, 'is-danger': errors.has('password') }"
            v-validate="'required'"
          >

          <span
            v-show="errors.has('password')"
            class="is-danger"
          >{{ errors.first('password') }}</span>
        </div>

        <button 
          class="ui fluid primary button" 
          :disabled="!isFormValid" 
          @click.prevent="signup"
          type="submit"
        >
          SIGN UP
        </button>

        <div class="ui hidden divider"></div>
      </form>

      <div class="ui divider"></div>

      <div class="ui column grid">
        <div class="center aligned column">
          <p>
            Got an account? <router-link to="/signin">Sign in</router-link>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Notification from '@/components/Notification'

export default {
  components: {
    Notification
  },

  data () {
    return {
      password: '',
      email: '',
      username: '',
      name: '',
      notification: {
        message: '',
        type: ''
      }
    }
  },

  computed: {
    isFormValid () {
      return Object.keys(this.fields).every(key => this.fields[key].valid)
    }
  },

  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('tweetr-token')

    return token ? next('/') : next() 
  },

  methods: {
    signup () {
      axios.post('/signup', {
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password
      })
      .then(response => {
        localStorage.setItem('tweetr-token', response.data.data.token)

        this.$router.push('/')
      })
      .catch(error => {
        this.notification = Object.assign({}, this.notification, {
          message: error.response.data.message,
          type: error.response.data.type
        })
      })
    }
  }
}
</script>

