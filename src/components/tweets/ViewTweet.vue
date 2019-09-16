<template>
  <div class="ui stackable two column centered vertically padded grid container">
    <div class="column">
      <a class="ui mini primary button" @click="back">
        Back
      </a>

      <div class="ui feed">
        <div class="event">
          <div class="label">
            <img src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm">
          </div>

          <div class="content">
            <div class="summary" v-if="tweet">
              <router-link :to="`/${tweet.user.username}`">
                {{ tweet.user.name }}
                <small>
                  {{ `@${tweet.user.username}` }}
                </small>
              </router-link>
            </div>

            <div class="extra text">
              {{ tweet.tweet }}
            </div>

            <Favorites 
              v-if="tweet && authUser && replies"
              :tweet="tweet"
              :replies="replies"
              :favorites.sync="tweet.favorites"
              :auth-user="authUser"
            />
          </div>
        </div>
      </div>

      <div class="ui divider"></div>

      <form class="ui form" @submit.prevent="reply">
        <div class="field">
          <textarea 
            name="body" 
            rows="2"
            v-model="body"
            placeholder="Reply..."
          ></textarea>
        </div>

        <button class="ui primary button" :disabled="!isFormValid">
          Reply
        </button>
      </form>

      <Replies :replies="replies" />
    </div>
  </div>
</template>

<script>
import Replies from './Replies'
import Favorites from './Favorites'

export default {
  name: 'ViewTweet',

  components: {
    Replies,
    Favorites
  },

  data () {
    return {
      tweet: '',
      body: '',
      replies: [],
      authUser: ''
    }
  },

  computed: {
    isFormValid () {
      return !!this.reply
    }
  },

  mounted () {
    this.fetch(),
    this.fetchAuthUser()
  },

  methods: {
    fetch () {
      axios.get(`/tweets/${this.$route.params.id}`)
        .then(response => {
          this.tweet = response.data.data

          this.replies = response.data.data.replies.reverse()
        })
    },

    back () {
      this.$router.go(-1)
    },

    reply () {
      const token = localStorage.getItem('tweetr-token')

      axios.post(`/tweets/reply/${this.tweet.id}`, {
        reply: this.body
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        this.body = ''

        this.replies.unshift(response.data.data)
      })
    },

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
    }
  }
}
</script>