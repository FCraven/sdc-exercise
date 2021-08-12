<template>

  <article v-if="$fetchState.pending"
        class='poke-card'>
        <!-- IMAGE TOP -->
        <div class="card-image">
          <progress class="progress is-small is-primary" max="100">60%</progress>
        </div>

        <!-- INFO - TITLE & COPY -->
        <div class="card-info">
            <div class="card-content">

              <h3 class='card-title'>Loading...</h3>

              <div class='card-content-key'>Abilities:
                <span class='card-content-value'>...</span>
              </div>
              <div class='card-content-key'>Types:
                <span class='card-content-value'>...</span>
              </div>
              <div class='card-content-key'>HP:
                <span class='card-content-value'>...</span>
              </div>
              <div class='card-content-key'>Attack:
                <span class='card-content-value'>...</span>
              </div>
              <div class='card-content-key'>Defense:
                <span class='card-content-value'>...</span>
              </div>

              <NuxtLink :to="`/${monster.name}`">
                <button class='card-button'> Learn more </button>
              </NuxtLink>

            </div>

        </div>

  </article>

  <p v-else-if="$fetchState.error">An error occurred :(</p>

  <article v-else
       class='poke-card'>
       <!-- add card and container classes to above class if cards get wonky -->

       <!-- IMAGE TOP -->
       <div class="card-image">
        <img class='card-img' :src='imageUrl' />
       </div>

      <!-- INFO - TITLE & COPY -->
       <div class="card-info">
          <div class="card-content">

            <h3 class='card-title'>{{monster.name[0].toUpperCase() + monster.name.slice(1)}}</h3>

            <div class='card-content-key'>Abilities:
              <span class='card-content-value'>{{abilities}}</span>
            </div>
            <div class='card-content-key'>Types:
              <span class='card-content-value'>{{types}}</span>
            </div>
            <div class='card-content-key'>HP:
              <span class='card-content-value'>{{hp}}</span>
            </div>
            <div class='card-content-key'>Attack:
              <span class='card-content-value'>{{attack}}</span>
            </div>
            <div class='card-content-key'>Defense:
              <span class='card-content-value'>{{defense}}</span>
            </div>

            <NuxtLink :to="`/${monster.name}`">
              <button class='card-button'> Learn more </button>
            </NuxtLink>

          </div>

      </div>

  </article>

</template>

<script>

  const { parseTypes, parseAbilities } = require('../utils')

  export default {
    props: ['name'],
    data() {
      return {
        monster: {},
        imageUrl: '',
        abilities: '',
        types: '',
        hp: 0,
        attack: 0,
        defense: 0,
      }
    },
    fetchOnServer: false,
    async fetch() {
      const pokeBall = window.localStorage;
      const savedMonster = pokeBall[this.name]
      try{
        if(savedMonster){
          this.monster = JSON.parse(pokeBall.getItem(this.name))
          console.log('from localStorage')
        } else {
          console.log('fetching ' + this.name)
            this.monster = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.name}`).then(res => res.json());
            pokeBall.setItem(this.name, JSON.stringify(this.monster));

        }
      } catch(err) {
          console.log(err);
      }

      const { sprites, stats, types, abilities } = this.monster;
      const { front_default } = sprites.other['official-artwork'];

      this.imageUrl = front_default;
      this.abilities = parseAbilities(abilities)
      this.types = parseTypes(types);
      this.hp = stats.find(el => el.stat.name === 'hp').base_stat || 0;
      this.attack = stats.find(el => el.stat.name === 'attack').base_stat || 0;
      this.defense = stats.find(el => el.stat.name === 'defense').base_stat || 0;
    }
  }

</script>

<style scoped>

  .poke-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    margin-bottom: 24px;
    background: #FFFFFF;
    border: 2px inset rgba(0,0,0,0.04);
    box-sizing: border-box;
    border-radius: 8px;
    height: 574px;
    max-width: 335px;
    box-shadow: none;
  }

  .card-image {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;

    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
    margin: 0px 0px;
    height: 290px;
    width: 335px;
    background: #E0E0E0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-img {
    height: 100%;
    width: auto;
  }

  .card-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px 40px 40px 40px;
    height: 284px;
    width: 335px;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
    margin: 0px 0px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  .card-title {
    font-style: normal;
    font-weight: 900;
    font-size: 24px;
    line-height: 28px;
    font-feature-settings: 'liga' off;
    color: #000000;

    flex:none;
    align-self: stretch;
    flex-grow: 0;
    margin: 12px 0px;
  }

  .card-content {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    color: #000000;
    flex: none;
    order: 2;
    align-self: stretch;
    flex-grow: 0;
    margin: 12px 0px;
    padding: 0;
    height: 100px;
    width: 255px;
  }

  .card-content-value {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;

  }

  .card-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 24px;
    border: 2px solid #5700FF;
    box-sizing: border-box;
    border-radius: 22px;
    flex: none;
    order: 1;
    flex-grow: 0;
    margin: 20px 0px;
    background: inherit;
    color: #5700FF;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    font-feature-settings: 'liga' off;
  }



</style>
