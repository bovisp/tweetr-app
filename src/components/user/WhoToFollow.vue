<template>
  <div class="ui segment">
    <h2 class="ui medium dividing header">
      Who to follow
    </h2>

    <i class="refresh link items"></i>

    <div class="ui divided link items">
      <div 
        class="item"
        v-for="user in usersToFollow"
        :key="user.id"
      >
        <div class="ui avatar image">
          <img src="https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm">
        </div>

        <div class="content">
          <router-link class="ui small header" :to="`/${user.username}`">
            {{ user.name }} <small>{{ `@${user.username}` }}</small>
          </router-link>

          <div class="meta">
            <button
              class="ui compact mini primary button"
              @click="followUser(user.id)"
            >Follow</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>Th

<script>
export default {
  name: 'WhoToFollow',

  data () {
    return {
      usersToFollow: ''
    }
  },

  created () {
    this.fetchWhoToFollow()
  },

  methods: {
    fetchWhoToFollow () {
      const token = localStorage.getItem('tweetr-token')

      axios.get('/users/follow', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        this.usersToFollow = response.data.data
      })
    },

    followUser (userId) {
      const token = localStorage.getItem('tweetr-token')

      axios.post('/users/follow', {
        user_id: userId
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        this.usersToFollow = this.usersToFollow.filter(user => {
          return user.id !== userId
        })
      })
    }
  }
}
</script>