<template>
  <div class="ui feed">
    <p>here</p>
    <Tweet 
      v-for="tweet in tweets"
      :key="tweet.id"
      :tweet="tweet"
      :auth-user="authUser"
      @destroy="removeDeletedTweet"
    />
  </div>
</template>

<script>
import Tweet from './Tweet'
import EventBus from '../../eventBus'

export default {
  name: 'Tweets',

  components: {
    Tweet
  },

  props: {
    tweets: {
      type: Array,
      required: true
    },
    authUser: {
      type: Object,
      required: true
    }
  },

  created () {
    EventBus.$on('tweet:added', this.fetchAddedTweet)
  },

  methods: {
    fetchAddedTweet (tweet) {
      this.tweets.unshift(tweet)
    },

    removeDeletedTweet (tweetId) {
      const filteredTweets = this.tweets.filter(tweet => {
        return tweet.id !== tweetId
      })

      this.$emit('update:tweets', filteredTweets)
    }
  }
}
</script>