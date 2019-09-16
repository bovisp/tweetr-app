<template>
  <div>
    <UserHeader 
      :user="user"
      :auth-user="authUser"
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
              v-for="following in user.following"
              :key="following.id"
              :user="following"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserHeader from './UserHeader'
import SidebarDetails from './SidebarDetails'
import UserCard from './UserCard'
import profileMixin from '../../../mixins/profileMixin'

export default {
  name: 'UsersFollowing',

  mixins: [profileMixin],

  components: {
    UserHeader,
    SidebarDetails,
    UserCard
  },

  data () {
    return {
      user: '',
      authUser: ''
    }
  }
}
</script>