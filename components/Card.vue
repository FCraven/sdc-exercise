<template>
  <p v-if="$fetchState.pending">Loading...</p>
  <p v-else-if="$fetchState.error">An error occurred :(</p>

  <div v-else
       class='card'>

       <div class="card-image">
         <figure class="image">
          <img v-bind:src='monster.sprites.front_default'
              class='card-img' />
         </figure>
       </div>

       <div class="card-content">
        <!-- name
        Abilities
        types
        hp
        attack
        defense
        loadmore button -->

       </div>

  </div>

</template>

<script>
  export default {
    props: ['name'],
    data() {
      return {
        monster: {}
      }
    },
    async fetch() {
      this.monster = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.name}`).then(res => res.json())
    }
  }

</script>

<style scoped>
.image {
  height: 200px;
  width: 200px;
}
</style>
