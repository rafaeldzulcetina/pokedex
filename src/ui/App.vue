<template>
  <div id="app">
    <nav class="flex items-center justify-between flex-wrap bg-blue-500 p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-2">
        <svg
            class="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"
          />
        </svg>
        <span class="font-semibold text-xl tracking-tight">Amplify+Cognito</span>
      </div>
      <div class="block md:hidden">
        <button
            class="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white"
        >
          <svg
              class="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
          </svg>
        </button>
      </div>
      <div class="w-2/3 block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <router-link
              to="/"
              class=" mt-4 lg:mr-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white"
          >Home
          </router-link>
          <template v-if="user">
            <button
                @click.stop="handleLogout"
                class="ml-4 mt-4
            lg:inline-block lg:mt-0 text-blue-200
            hover:text-white">
              Logout
            </button>
          </template>
          <template v-else>
            <router-link
                to="/login"
                class="ml-4 mt-4
            lg:inline-block lg:mt-0 text-blue-200
            hover:text-white">
              Login
            </router-link>
            <router-link
                to="/register"
                class=" ml-4 mt-4
            lg:inline-block lg:mt-0 text-blue-200
            hover:text-white">
              Register
            </router-link>
          </template>
        </div>
        <div v-if="user" class="font-semibold text-white text-lg tracking-tight">
          <h1>Hi {{ user.username }}!</h1>
          <p>You're logged in with Vue + Vuex & JWT!!</p>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {getModule} from "vuex-module-decorators";
import AuthStore from "@/ui/store/modules/auth/authStore";
import {User} from "@/app/modules/Shared/domain/User";

@Component({
  name: "App",
})
export default class App extends Vue {
  authModule = getModule(AuthStore, this.$store);

  handleLogout() {
    this.authModule.signOut()
  }

  get user(): User {
    //return {id:0, name:"", base_experience: 0, sprites: {front_default: ''}}
    return this.authModule.user
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  margin: 0;
  padding: 0;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 10px;

    &.router-link-exact-active {
      color: #8300d3;
    }
  }
}
</style>
