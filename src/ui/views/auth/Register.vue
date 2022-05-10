<template>
  <div class="flex justify-center items-center mt-52">
    <div class="w-full max-w-sm">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 class="text-md font-bold mb-2">Register Form</h3>
        <hr class="mb-2">
        <div class="identity-input mb-4">
          <label
              for="identity"
              class="block text-gray-700 text-sm font-bold mb-2">
            Username</label>
          <input
              id="identity"
              class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Username"
              aria-describedby="usernameHelp"
              v-model="username"/>
          <span class="text-xs text-red-700" id="usernameHelp"></span>
        </div>

        <div class="identity-input mb-4">
          <label
              for="identity"
              class="block text-gray-700 text-sm font-bold mb-2">
            Email</label>
          <input
              id="email"
              class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="E-mail"
              aria-describedby="emailHelp"
              v-model="email"/>
          <span class="text-xs text-red-700" id="emailHelp"></span>
        </div>

        <div class="password-input mb-6">
          <label
              for="identity"
              class="block text-gray-700 text-sm font-bold mb-2">Password</label>

          <input
              aria-describedby="passwordHelp"
              v-model="password"
              class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="*******"
          />

          <span class="text-xs text-red-700" id="passwordHelp"></span>
        </div>

        <div class="flex items-center justify-between">
          <button
              class="bg-blue-600 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              @click.stop="handleSubmit"
          >
            Register
          </button>
          <a
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="/login"
          >
            Already have account?
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {getModule} from "vuex-module-decorators";
import AuthStore from "@/ui/store/modules/auth/authStore";

@Component({
  components: {},
})
export default class Register extends Vue {
  username = ""
  email = ""
  password = ""

  submitted = false

  authModule = getModule(AuthStore, this.$store);

  handleSubmit(e): void {
    e.preventDefault()
    const { username, password, email } = this;
    this.submitted = true;
    this.authModule.signUp({username, password, email})
    //this.register(this.user);
  }

}
</script>

<style scoped>

</style>
