<template>
  <div class="ui stackable grid container">
    <UserSettingsMenu />

    <div class="eight wide column">
      <div class="ui segment">
        <h2 class="ui dividing header">
          Edit profile
        </h2>

        <Notification 
          :message="notification.message"
          :type="notification.type"
          v-if="notification.message"
        />

        <form class="ui form" @submit.prevent="update">
          <div class="field" :class="{ error: errors.has('name') }">
            <label for="name">Full name</label>

            <input 
              type="text"
              name="name"
              v-model="name"
              id="name"
              v-validate="'required'"
            >

            <span
              v-show="errors.has('name')"
              class="is-danger"
            >
              {{ errors.first('name') }}
            </span>
          </div>

          <div class="field" :class="{ error: errors.has('username') }">
            <label for="username">Username</label>

            <input 
              type="text"
              name="username"
              id="username"
              v-model="username"
              v-validate="'required'"
            >

            <span
              v-show="errors.has('username')"
              class="is-danger"
            >
              {{ errors.first('username') }}
            </span>
          </div>

          <div class="field" :class="{ error: errors.has('email') }">
            <label for="email">Email</label>

            <input 
              type="email"
              name="email"
              id="email"
              v-model="email"
              v-validate="'required|email'"
            >

            <span
              v-show="errors.has('email')"
              class="is-danger"
            >
              {{ errors.first('email') }}
            </span>
          </div>

          <div class="field">
            <label for="bio">Bio</label>

            <textarea 
              rows="5"
              id="bio"
              v-model="bio"
            ></textarea>
          </div>

          <div class="field">
            <label for="location">Location</label>

            <input 
              type="text"
              id="location"
              v-model="location"
            >
          </div>

          <div class="field">
            <label for="websiteUrl">Website URL</label>

            <input 
              type="url"
              id="websiteUrl"
              v-model="websiteUrl"
            >
          </div>

          <button class="ui primary button">
            Update profile
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
  name: 'Profile',

  components: {
    Notification,
    UserSettingsMenu
  },

  data () {
    return {
      name: '',
      username: '',
      email: '',
      bio: '',
      location: '',
      websiteUrl: '',
      notification: {
        message: '',
        type: ''
      }
    }
  },

  beforeRouteEnter (to, from, next) {
    const token = localStorage.getItem('tweetr-token')

    return token ? next() : next('/signin')
  },

  created () {
    this.fetch()
  },

  methods: {
    fetch () {
      const token = localStorage.getItem('tweetr-token')

      axios.get('/account/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        this.name = response.data.data.name,
        this.username = response.data.data.username,
        this.email = response.data.data.email,
        this.location = response.data.data.location,
        this.bio = response.data.data.bio,
        this.websiteUrl = response.data.data.websiteUrl
      })
    },

    update () {
      const token = localStorage.getItem('tweetr-token')

      axios.put('/account/update', {
        name: this.name,
        email: this.email,
        username: this.username,
        location: this.location,
        bio: this.bio,
        website_url: this.websiteUrl
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        this.notification = Object.assign({}, this.notification, {
          message: response.data.message,
          type: 'success'
        })
      })
    }
  }
}
</script>