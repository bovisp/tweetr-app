<template>
  <div class="ui stackable grid container">
    <UserSettingsMenu />

    <div class="eight wide column">
      <div class="ui segment">
        <h2 class="ui dividing header">
          Change password
        </h2>

        <Notification 
          :message="notification.message"
          :type="notification.type"
          v-if="notification.message"
        />

        <form class="ui form" @submit.prevent="update">
          <div class="field" :class="{ error: errors.has('password') }">
            <label for="password">Current password</label>

            <input 
              type="password"
              id="password"
              name="password"
              v-model="password"
              data-vv-as="current password"
              v-validate="'required'"
            >

            <span
              v-show="errors.has('password')"
              class="is-danger"
            >{{ errors.first('password') }}</span>
          </div>

          <div class="field" :class="{ error: errors.has('newPassword') }">
            <label for="newPassword">New password</label>

            <input 
              type="password"
              id="newPassword"
              name="newPassword"
              v-model="newPassword"
              data-vv-as="new password"
              ref="newPassword"
              v-validate="'required'"
            >

            <span
              v-show="errors.has('newPassword')"
              class="is-danger"
            >{{ errors.first('newPassword') }}</span>
          </div>

          <div class="field" :class="{ error: errors.has('confirmPassword') }">
            <label for="confirmPassword">Confirm password</label>

            <input 
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              v-model="confirmPassword"
              data-vv-as="confirm password"
              v-validate="'required|confirmed:newPassword'"
            >

            <span
              v-show="errors.has('confirmPassword')"
              class="is-danger"
            >{{ errors.first('confirmPassword') }}</span>
          </div>

          <button 
            class="ui button primary" 
            type="submit"
            :disabled="!isFormValid"
          >
            Change password
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Notification from '../../Notification'
import UserSettingsMenu from './Menu'

export default {
  name: 'UserProfileEditFrom',

  components: {
    Notification,
    UserSettingsMenu
  },

  data () {
    return {
      password: '',
      newPassword: '',
      confirmPassword: '',
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

    return token ? next() : next('/signin')
  },

  methods: {
    update () {
      const token = localStorage.getItem('tweetr-token')

      axios.put('/account/update_password', {
        password: this.password,
        newPassword: this.newPassword
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        this.password = this.newPassword = this.confirmPassword = ''

        this.$nextTick(() => this.$validator.reset())

        this.notification = Object.assign({}, this.notification, {
          message: response.data.message,
          type: 'success'
        })
      })
      .catch(error => {
        this.password = this.newPassword = this.confirmPassword = ''

        this.$nextTick(() => this.$validator.reset())

        this.notification = Object.assign({}, this.notification, {
          message: error.response.data.message,
          type: 'danger'
        })
      })
    }
  }
}
</script>