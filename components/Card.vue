<template>
  <p v-if="$fetchState.pending" class='is-loading'>Loading...</p>
  <p v-else-if="$fetchState.error">An error occurred :(</p>

  <article v-else
       class='card container poke-card'>

       <!-- IMAGE TOP -->
       <div class="card-image">
         <figure class="image bg-med">
          <img v-bind:src="imageUrl"
              class='card-img' />
         </figure>
       </div>

      <!-- INFO - TITLE & COPY -->
       <div class="card-info">
          <h3 class='card-title'>{{monster.name[0].toUpperCase() + monster.name.slice(1)}}</h3>
          <div class="card-content">
            <div class='card-content-key'>Abilities: <span class='card-content-value'>{{abilities}}</span></div>
            <div class='card-content-key'>Types: <span class='card-content-value'>{{types}}</span></div>
            <div class='card-content-key'>HP: <span class='card-content-value'>{{hp}}</span></div>
            <div class='card-content-key'>Attack: <span class='card-content-value'>{{attack}}</span></div>
            <div class='card-content-key'>Defense: <span class='card-content-value'>{{defense}}</span></div>
            <button class='card-button'>Learn more</button>
          </div>

      </div>


  </article>

</template>

<script>



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
        defense: 0
      }
    },
    async fetch() {



      this.monster = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.name}`).then(res => res.json());
      const { sprites, stats, types, abilities } = this.monster
      const { front_default } = sprites.other['official-artwork']
      this.imageUrl = front_default;
      this.abilities = abilities.reduce((accum, el, index) => {
        let formattedAbility = el.ability.name.split('-').map(el => el[0].toUpperCase() + el.slice(1)).join(' ')
        return index === abilities.length - 1? accum + formattedAbility : accum + formattedAbility + ', ' ;
      },'')
      this.types = types.map(el => el.type.name[0].toUpperCase() + el.type.name.slice(1)).join(', ');
      this.hp = stats.find(el => el.stat.name === 'hp').base_stat || 0;
      this.attack = stats.find(el => el.stat.name === 'attack').base_stat || 0;
      this.defense = stats.find(el => el.stat.name === 'defense').base_stat || 0;
    }
  }

</script>

<style scoped>

  img, figure {
    border-top-left-radius: inherit;
    border-top-right-radius: inherit;
  }

  .poke-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    margin-bottom: 24px;
    background: #FFFFFF;
    border: 2px inset rgba(0,0,0,0.04);
    box-sizing: border-box;
    border-radius: 8px;
    height: 574px;
    width: 335px;
    box-shadow: none;
  }

  .card-image {
    border-radius: inherit;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
    margin: 0px 0px;
    height: 290px;
    width: 335px;
  }

  .card-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 40px;
    height: 284px;
    width: 335px;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
    margin: 0px 0px;
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
  }

</style>
