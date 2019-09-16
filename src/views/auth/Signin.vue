<template>
  <div class="ui stackable three column centered grid container">
    <div class="column">
      <h2 class="ui dividing header">
        Log In
      </h2>

      <Notification
        :message="notification.message"
        :type="notification.type"
        v-if="notification.message"
      />

      <form class="ui form" @submit.prevent="signin">
        <div class="field">
          <label for="email">Email</label>

          <input 
            type="email"
            name="email"
            v-model="email"
            required
          >
        </div>

        <div class="field">
          <label for="password">Password</label>

          <input 
            type="password"
            name="password"
            v-model="password"
            required
          >
        </div>

        <button class="ui fluid primary button">SIGN IN</button>

        <div class="ui hidden divider"></div>
      </form>

      <div class="ui divider"></div>

      <div class="ui column grid">
        <div class="ui center aligned column">
          <p>
            Don't have an account? <router-link to="/signup">Sign up</router-link>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import Notification from '../../components/Notification'

export default {
  name: 'Signin',

  components: {
    Notification
  },

  data () {
    return {
      email: '',
      password: '',
      notification: {
        message: '',
        type: ''
      }
    }
  },

  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('tweetr-token')

    return token ? next('/') : next()
  },

  methods: {
    signin () {
      axios.post('/signin', {
        email: this.email,
        password: this.password
      })
      .then(response => {
        localStorage.setItem('tweetr-token', response.data.data.token)

        this.$router.push('/')
      })
      .catch(error => {
        this.email = this.password = ''

        this.notification = Object.assign({}, this.notification, {
          message: error.response.data.message,
          type: error.response.data.status
        })
      })
    }
  }
}
</script>

