<template>
  <div class="meta">
    <a class="reply">
      <i class="reply icon"></i>

      {{ replies.length }}
    </a>

    <a 
      class="like"
      v-if="isFavorited"
      @click="unFavorite"
    >
      <i class="red like icon"></i>

      {{ favorites.length }}
    </a>

    <a 
      class="like"
      v-else
      @click="favorite"
    >
      <i class="like icon"></i>

      {{ favorites.length }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'Favorites',

  props: {
    tweet: {
      type: Object,
      required: true
    },
    authUser: {
      type: Object,
      required: true
    },
    replies: {
      type: Array,
      required: true
    },
    favorites: {
      type: Array,
      required: true
    }
  },

  computed: {
    isFavorited () {
      for (const favorite of this.favorites) {
        if (favorite.user_id === this.authUser.id) {
          return true
        }
      }

      return false
    }
  },

  methods: {
    favorite () {
      const token = localStorage.getItem('tweetr-token')

      if (!token) {
        alert('You must be logged in to perform the action.')

        return
      }

      axios.post('/favorites', {
        tweet_id: this.tweet.id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        this.favorites.push(response.data.data)
      })
    },

    unFavorite () {
      const token = localStorage.getItem('tweetr-token')

      if (!token) {
        alert('You must be logged in to perform the action.')

        return
      }

      axios.delete(`/favorites/${this.tweet.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        const filteredFavorites = this.favorites.filter(favorite => {
          return favorite.user_id !== this.authUser.id
        })

        this.$emit('update:favorites', filteredFavorites)
      })
    }
  }
}
</script>