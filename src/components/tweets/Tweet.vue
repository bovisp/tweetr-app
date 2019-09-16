<template>
  <div class="event">
    <div class="label">
      <img src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm">
    </div>

    <div class="content">
      <div class="summary">
        <router-link :to="`/${tweet.user.username}`">
          {{ tweet.user.name }}
          <small>{{ `@${tweet.user.username}` }}</small>
        </router-link>

        <div class="date">
          {{ tweet.created_at | timeAgo }}

          <small v-if="canDelete">
            <a @click="destroy(tweet.id)">
              Delete
            </a>
          </small>
        </div>
      </div>

      <router-link :to="`/${tweet.user.username}/status/${tweet.id}`">
        <div class="extra text">
          {{ tweet.tweet }}
        </div>
      </router-link>

      <Favorites 
        v-if="authUser"
        :tweet="tweet"
        :replies="tweet.replies"
        :favorites.sync="tweet.favorites"
        :auth-user="authUser"
      />
    </div>
  </div>
</template>

<script>
import Favorites from './Favorites'

export default {
  name: 'Tweet',

  components: {
    Favorites
  },

  data () {
    return {
      authUser: ''
    }
  },

  props: {
    tweet: {
      type: Object,
      required: true
    }
  },

  computed: {
    canDelete () {
      return this.tweet.user_id === this.authUser.id
    }
  },

  methods: {
    fetchAuthUser () {
      const token = localStorage.getItem('tweetr-token')

      axios.get('/account/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        this.authUser = response.data.data
      })
    },

    destroy (tweetId) {
      const token = localStorage.getItem('tweetr-token')

      const confirmDelete = confirm('Are you sure')

      if (confirmDelete) {
        axios.delete(`/tweets/${tweetId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          this.$emit('destroy', tweetId)
        })
      }
    }
  },

  mounted () {
    this.fetchAuthUser()
  }
}
</script>