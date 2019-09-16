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

      <div class="twelve wide column">
        <div class="ui segment">
          <div class="ui three column grid">
            <UserCard 
              v-for="follower in user.followers"
              :key="follower.id"
              :user="user"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidebarDetails from './SidebarDetails'
import UserHeader from './UserHeader'
import UserCard from './UserCard'
import profileMixin from '../../../mixins/profileMixin'

export default {
  name: 'UserFollowers',

  mixins: [profileMixin],

  components: {
    UserCard,
    UserHeader,
    SidebarDetails
  },

  data () {
    return {
      user: '',
      authUser: ''
    }
  }
}
</script>