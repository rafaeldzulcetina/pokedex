import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { User } from "@/app/modules/Shared/domain/User";
import { Auth, Hub, Logger } from 'aws-amplify'

const logger = new Logger('auth-logger', process.env.VUE_APP_LOGLEVEL)

/**
 * Declare the vuex module to be implemented
 * @module Pokemons
 */
@Module({
  name: "AuthStore",
  namespaced: true,
})

/**
 * Declare Pokedex Store
 * @class AuthStore
 * @extend VuexModule
 */
export default class AuthStore extends VuexModule {

  user: User = {username: "", password: ""}
  token = ""
  failAttempts = {}
  accessToEmail = false

  /**
   * Mutations of Pokemon Store
   */
  @Mutation
  setUser(user: User): void {
    this.user = user;
    if(user !== null)
      localStorage.setItem('user', JSON.stringify(user))
    else
      localStorage.removeItem('user')
    //location.reload(true);
  }

  @Mutation
  setFailAttempts(failAttempts): void {
    this.failAttempts = failAttempts;
    //location.reload(true);
  }

  @Mutation
  setToken(token: string): void {
    this.token = token;
  }


  /**
   * @method signIn
   */
  @Action
  async signUp({username, password, email}): Promise<void> {
    console.log("Params: ", {username, password})

    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email
          // other custom attributes
        }
      });
      //Retornar algo para indicar que si funcionó
      console.log(user);
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  @Action
  async signIn({username, password}) {
    try {
      const user = await Auth.signIn(username, password);
      // ejecutamos la mutación
      this.setUser(user)

      const session = await Auth.currentSession()
      const token = session.getIdToken().getJwtToken()

      this.setToken(token)

      location.reload(true)

    } catch (error) {
      console.log('error signing in', error);
      return false
    }
  }

  @Action
  init () {
    const sFailAttempts = localStorage.getItem('__failAttempts')
    if (sFailAttempts && sFailAttempts !== '') {
      const failAttempts = JSON.parse(sFailAttempts)
      this.setFailAttempts(failAttempts)
     }

    const listener = async (data: any) => {
      switch (data.payload.event) {
        case 'signIn':
          logger.debug('user signed in')
          await this.session()
          break
        case 'signUp':
          logger.debug('user signed up')
          break
        case 'signOut':
          logger.debug('user signed out')
          break
        case 'signIn_failure':
          logger.error('user sign in failed')
          // logger.error(`lastUserAttempSigIn: ${this.lastUserAttempSigIn}`)
          logger.debug(data)
          //commit('failAttemp', { username })
          break
        case 'tokenRefresh':
        {
          await this.session()
        }
          break
        case 'tokenRefresh_failure':
          logger.error('token refresh failed')
          break
        case 'configured':
          logger.debug('the Auth module is configured')
      }
    }

    Hub.listen('auth', listener)

    return Auth.currentSession()
      .then(session => {
        const token = session.getIdToken().getJwtToken()
        this.setToken(token)
        })
      .then(() => {
        return Auth.currentAuthenticatedUser()
      })
      .then(user => {
        this.setUser(user)
        return user
      })
      .then(async user => {
        if (!user) return
        /*
        const userInfo = localStorage.getItem('userInformation')
        if(userInfo)
          commit('userInformation', { userInformation: JSON.parse(userInfo) })
         */
      })
      .catch(e => {
        logger.warn(e)
        this.setUser(null)
        this.setToken(null)
      })
  }

  @Action
  session () {
    return Auth.currentSession()
      .then(session => {
        logger.warn('Session info is OK')
        if (session) {
          const token = session.getIdToken().getJwtToken()
          this.setToken(token)
          logger.debug('token refresh succeeded')
        } else {
          this.clearSession()
          logger.warn('Session info is missing')
        }
      })
      .catch(e => {
        this.clearSession()
        logger.warn('Session info is missing')
        logger.warn(e)
      })
  }

  @Action
  clearSession () {
    this.setToken(null)
    this.setUser(null)
  }

  @Action
  signOut () {
    return Auth.signOut()
      .then(data => {
        this.clearSession()
        logger.debug(data)
      }).then(()=>{
        location.reload(true)
      })
      .catch(err => logger.warn(err))
  }

}
