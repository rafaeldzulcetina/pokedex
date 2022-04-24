<template>
  <div class="pokedex">
    <div class="pokedex-left">
      <div class="pokedex-screen-container">
        <pokedex-screen
          v-bind:pokemon="pokemon"
          v-bind:loading="loading"
          v-bind:error="error"
        />
      </div>
      <div class="pokedex-left-bottom">
        <pokedex-form v-on:submit="handleSubmit($event)" />
      </div>
    </div>
    <div class="pokedex-right">
      <stats
        v-bind:pokemon="pokemon"
        v-bind:loading="loading"
        v-bind:error="error"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PokedexScreen from "@/ui/components/PokedexScreen.vue"; // @ is an alias to /src
import PokedexForm from "@/ui/components/PokedexForm.vue"; // @ is an alias to /src
import Stats from "@/ui/components/Stats.vue";
import PokedexStore from "@/ui/store/modules/pokedex/pokedexStore";
import { getModule } from "vuex-module-decorators";
import { Pokemon } from "@/app/modules/Pokedex/domain/Pokemon"; // @ is an alias
@Component({
  components: {
    PokedexScreen,
    PokedexForm,
    Stats,
  },
})
export default class Pokedex extends Vue {
  error = false;
  loading = true;
  //pokemon: Pokemon = { base_experience: 0, id: 0, name: "" };
  pokemonId = Math.floor(Math.random() * 806 + 1).toString();
  errorMessage = [];

  pokedexModule = getModule(PokedexStore, this.$store);


  async getPokemon(): Promise<void> {
    await this.pokedexModule.fetchPokemon(this.pokemonId);
    //this.pokemon = this.pokedexModule.pokemon;
    this.loading = false;
    this.error = false;
    /*
    fetch(`https://pokeapi.co/api/v2/pokemon/${this.pokemonId}`)
      .then((res) => res.json())
      .then((data) => {
        this.pokemon = data;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.error = true;
        this.errorMessage = err.message;
      });

     */
  }

  async handleSubmit(pokemonId: string): Promise<void> {
    if (pokemonId !== "") {
      this.error = false;
      this.loading = true;
      this.pokemonId = pokemonId;
      await this.getPokemon();
      this.loading = false;
      this.error = false;
    }
    this.error = false;
  }

  created(): void {
    this.getPokemon();
  }

  get pokemon(): Pokemon {
    //return {id:0, name:"", base_experience: 0, sprites: {front_default: ''}}
    return this.pokedexModule.pokemon
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pokedex {
  background-color: #41ffab;
  padding-top: 70px;
  width: 100%;
  height: 100vh;
}
.pokedex-left {
  background-color: #ff1a55;
  background-image: url("../assets/logo.png");
  background-size: 150px;
  background-repeat: no-repeat;
  background-position: 3% 97%;
  width: 600px;
  height: 850px;
  margin: 0 auto;
  border-radius: 10px;
  text-align: center;
  border: 10px solid #3d0f53;
  box-shadow: 25px 30px #000;
  display: inline-block;
}
.pokedex-right {
  background-color: #ff1a55;
  width: 600px;
  height: 850px;
  margin: -10px;
  border-radius: 10px;
  text-align: center;
  border: 10px solid #3d0f53;
  box-shadow: 25px 30px #000;
  display: inline-block;
  transform: rotate3d(-2, 42, 0, 26deg);
}
.pokedex-screen-container {
  padding-top: 20px;
}
</style>
