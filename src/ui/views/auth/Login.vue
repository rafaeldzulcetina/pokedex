<template>
  <div class="flex justify-center items-center mt-52">
    <div class="w-full max-w-sm">
      <div v-if="failLogin" class="alert bg-yellow-100 rounded-lg py-5 px-6 mb-3 text-base text-yellow-700 inline-flex items-center w-full alert-dismissible fade show" role="alert">
        <strong class="mr-1">Ooops! </strong> Credenciales incorrectas 😪
        <button type="button" class="btn-close box-content w-4 h-4 p-1 ml-auto text-yellow-900 border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-yellow-900 hover:opacity-75 hover:no-underline" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="identity-input mb-4">
          <label
              for="identity"
              class="block text-gray-700 text-sm font-bold mb-2"
          >
            Email</label
          >
          <input
              id="identity"
              class="shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Username"
              aria-describedby="usernameHelp"
              v-model="username"
          />
          <span class="text-xs text-red-700" id="usernameHelp"></span>
        </div>

        <div class="password-input mb-6">
          <label
              for="identity"
              class="block text-gray-700 text-sm font-bold mb-2"
          >Password</label
          >

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
              :disabled="loading"
              class="bg-blue-600 hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              @click.stop="handleSubmit"
          >
            <template v-if="loading">
              <svg class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
              </svg>
              Loading...
            </template>
            <template v-else>
              Sign In
            </template>
          </button>
          <a
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { getModule } from "vuex-module-decorators";
import AuthStore from "@/ui/store/modules/auth/authStore";
@Component({
  components: {
  },
})
export default class Login extends Vue {
  username = ""
  password = ""
  submitted = false
  failLogin = false

  authModule = getModule(AuthStore, this.$store);

  async handleSubmit(e) {
    e.preventDefault()
    await this.$store.dispatch('initLoader')
    this.submitted = true;
    this.failLogin = false
    const { username, password } = this;
    if (username && password) {
      const response = await this.authModule.signIn({username, password})
      if(!response){
        this.failLogin = true
        await this.$store.dispatch('stopLoader')
      }
    }
  }

  get loading() {
    return this.$store.state.isLoading
  }
}
</script>

<style scoped>

</style>
