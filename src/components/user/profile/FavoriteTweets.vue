<template>
  <div>
    <UserHeader 
      :user="user"
      :auth-user="authUser"
      v-if="user && authUser"
    />

    <div class="ui stackable grid container" v-if="user">
      <div class="four wide column">
        <SidebarDetails 
          :user="user"
        />
      </div>

      <div class="eight wide column" v-if="onlyTweets && authUser">
        <div class="ui segment">
          <h2 class="ui medium dividing header">
            Favorites
          </h2>

          <Tweets 
            :tweets.sync="onlyTweets"
            :auth-user="authUser"
          />
        </div>
      </div>

      <div class="four wide column">
        <WhoToFollow 
          v-if="isLoggedIn"
        />
      </div>
    </div>
  </div>
</template>

<script>
import UserHeader from './UserHeader'
import SidebarDetails from './SidebarDetails'
import Tweets from '../../tweets/Tweets'
import WhoToFollow from '../WhoToFollow'
import profileMixin from '../../../mixins/profileMixin'

export default {
  name: 'FavoriteTweets',

  mixins: [profileMixin],

  components: {
    UserHeader,
    SidebarDetails,
    Tweets,
    WhoToFollow
  },

  data () {
    return {
      user: '',
      authUser: ''
    }
  },

  computed: {
    isLoggedIn () {
      return !!this.authUser
    },

    onlyTweets () {
      return Array.from(
        this.user.favorites,
        favorite => favorite.tweet
      ).reverse()
    }
  }
}
</script>