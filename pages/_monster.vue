<template>
  <main class='container bg-light'>

    <section class='hero hero-bg-img mb-4' :style="`backgroundImage: linear-gradient(to top, white, white, rgba(255,255,255,0.25),transparent, transparent), url(${this.monster.sprites.front_default})`">
      <div class='hero-blur p-4'>

        <PageHeading :small="'Types: ' + typesList" :large='titleName' />

         <div class="tile is-ancestor ml-4 is-mobile p-3">
            <div class='tile is-4' >
                <p class="heading">Growth Rate</p>
                  <p class="title">{{growthRate}}</p>
            </div>
          </div>

        <div class="tile is-ancestor ml-4 is-mobile p-3">
          <div v-for='stat in stats' :key='stat.base_stat' class="stat tile is-2">
            <!-- Add content or other tiles -->
            <p class="heading">{{stat.stat.name}}</p>
              <p class="title">{{stat.base_stat}}</p>
          </div>
        </div>
      </div>
    </section>


    <div class='content'>
     <p>{{flavorText}}</p>
    </div>

    <NuxtLink to="/">
          <button class='back-button'> Back </button>
    </NuxtLink>
  </main>
</template>

<script>

import { capitalize, parseTypes } from '../utils'

  export default {

    data() {
      return {
        monster: {},
        typesList: '',
        speciesInfo: {},
        evolutionChain: {},
        flavorText: '',
        growthRate: '',
        stats: []
      }
    },
    async asyncData({route}) {
      return {
        titleName: capitalize(route.params.monster),
        monsterName: route.params.monster
      }
    },

    fetchOnServer: false,

    async fetch() {

      const savedMonster = localStorage.getItem(this.monsterName)

      if(!savedMonster){
        try{
            this.monster = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.monsterName}`).then(res => res.json());
            localStorage.setItem(this.monsterName, JSON.stringify(this.monster))
            return
          } catch(err) {
            console.log(err)
          }
        }

      this.monster = JSON.parse(savedMonster)
      const { types } = this.monster;
      const { url: speciesUrl } = this.monster.species

      try {
          this.speciesInfo = await fetch(speciesUrl).then(res => res.json())
          this.evolutionChain = await fetch(this.speciesInfo.evolution_chain.url).then(res => res.json()).then(data => data.chain)


      } catch(err) {
          console.log(err)
      }

      this.typesList = parseTypes(types)

      const createFlavorText =(arr)=> {
        const rawTextEntries = arr.slice(0,7);
        const textObj = {}
        for(const entry of rawTextEntries) {
          const language = entry.language.name;
          const text = entry.flavor_text;
          let newText = text.replace(/(\r\n|\n|\r)/gm, ' ')
          if(language === 'en' && !textObj[newText]) {
            textObj[newText] = true;
          }
        }
        return Object.keys(textObj).join(' ')

      }
      this.flavorText = createFlavorText(this.speciesInfo.flavor_text_entries)
      this.growthRate = this.speciesInfo.growth_rate.name;
      this.stats = this.monster.stats;
    }

  }




</script>

<style scoped>
  .back-button {
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

     #page-heading-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: flex-start;
    margin-bottom: 40px;
  }
  .title {
    font-style: normal;
    font-weight: 900;
    font-size: 12px;
    line-height: 12px;
    letter-spacing: 1px;
    font-feature-settings: 'liga' off;
    color: #000000;
  }

  .catch-phrase {
    font-style: normal;
    font-weight: 900;
    font-size: 36px;
    line-height: 44px;
    letter-spacing: -1px;
    font-feature-settings: 'liga' off, 'kern' off;
    color: #000000;
    backdrop-filter: blur(5px);
  }

  /* .stats {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: space-evenly;
    padding-bottom: 20px;
    width: 100%;
    border: 3px solid blue;
  } */

  .stat {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;
  }

  .hero-bg-img {
    background-position: center, 75% 50%;
    background-repeat: no-repeat, no-repeat;
    background-size: 100%, 50%;
  }

  .hero-blur {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    backdrop-filter: blur(1px);
  }

  @media only screen and (max-width: 768px) {
    .stat {
      flex-flow: row ;
    }

    .hero-bg-img {
      background-position: center, 75px 20px;
      background-size: 100%, 100%;

    }
  }



</style>
