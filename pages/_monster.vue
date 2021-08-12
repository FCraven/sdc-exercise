<template>
  <main class='container bg-light'>

    <section class='hero hero-bg-img mb-4' :style="`backgroundImage: linear-gradient(to top, white, white, rgba(255,255,255,0.25),transparent, transparent), url(${imageUrl})`">
      <div class='hero-blur p-4'>
        <PageHeading :small="'Type: ' + typesList" :large='titleName' />
        <div class="tile is-ancestor ml-4 is-mobile p-3">
          <div v-for='stat in stats' :key='stat.stat.name' class="stat tile is-2 ">
            <!-- Add content or other tiles -->
            <p class="heading is-size-7-touch is-size-6-desktop">{{stat.stat.name}}</p>
              <p class="title is-size-7-touch is-size-6-desktop">{{stat.base_stat}}</p>
          </div>
        </div>
      </div>
    </section>

  <hr />

    <div class='evolution-container'>

      <nav class="level">
        <div class="level-item has-text-centered">
          <div class='is-flex is-justify-content-center is-align-items-baseline'>
            <p class="heading p-1 is-size-7 is-size-6-tablet is-size-5-desktop">Growth Rate</p>
            <p class="title p-1 is-size-7 is-size-6-tablet is-size-5-desktop">{{growthRate.toUpperCase()}}</p>
          </div>
        </div>
      </nav>

      <nav class="breadcrumb is-centered has-arrow-separator " aria-label="breadcrumbs">
        <ul class=''>
          <li class='is-size-6 is-size-5-tablet is-size-4-desktop' v-for='form in evolutionChainArray' :form='form' :key='form'>{{form[0].toUpperCase() + form.slice(1)}}</li>
        </ul>
      </nav>

    </div>

<hr />

    <div class='content px-2'>
     <p class='is-size-4-desktop'>{{flavorText}}</p>
    </div>

    <NuxtLink to="/">
          <button class='outline-button'> Back </button>
    </NuxtLink>
  </main>
</template>

<script>

  import { capitalize, parseTypes, createFlavorText } from '../utils'

  export default {
    data() {
      return {
        monster: {},
        typesList: '',
        speciesInfo: {},
        evolutionChainData: {},
        evolutionChainArray: [],
        flavorText: '',
        growthRate: '',
        stats: [],
        imageUrl: ''
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
      //LOAD OR FETCH MONSTER
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

      //USE MONSTER INFO
      const { types } = this.monster;
      const { url: speciesUrl } = this.monster.species
      const forms = []

      //GET SPECIES INFO TO GET EVOLUTION CHAIN
      try {
          this.speciesInfo = await fetch(speciesUrl).then(res => res.json())
          this.evolutionChainData = await fetch(this.speciesInfo.evolution_chain.url).then(res => res.json()).then(data => data.chain)
      } catch(err) {
        console.log(err)
      }

      const createEvolutionChain =(chain)=> {
        forms.push(chain.species.name);
        while(chain.evolves_to.length)  {
          chain = chain.evolves_to[0]
            createEvolutionChain(chain);
          }
         return [...new Set(forms)]
      }

      this.imageUrl = this.monster.sprites.front_default;
      this.typesList = parseTypes(types)
      this.flavorText = createFlavorText(this.speciesInfo.flavor_text_entries)
      this.growthRate = this.speciesInfo.growth_rate.name;
      this.stats = this.monster.stats;
      this.evolutionChainArray = createEvolutionChain(this.evolutionChainData)
    }
  }
</script>

<style scoped>
  .stat {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: baseline;
    height: 100%;
  }

  .hero-bg-img {
    background-position: center, 80% 50%;
    background-repeat: no-repeat, no-repeat;
    background-size: 100%, 50%;
  }

  .evolution-container {
    display: flex;
    flex-direction: column;
    justify-content:flex-end;
    align-items: center;
  }

  .hero-blur {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
    backdrop-filter: blur(1px);
  }

  @media only screen and (min-width: 769px) {
      .evolution-container {
        flex-direction: row;
        justify-content: space-evenly;
        align-items: baseline;
      }
  }

  @media only screen and (max-width: 768px) {
    .stat {
      flex-direction: row;
    }

    .hero-bg-img {
      background-position: center,;
      background-size: 100%, 80%;
    }
  }


  @media only screen and (max-width: 440px) {
    .hero-bg-img {
        background-position: center, 75px 20px;
        background-size: 100%, cover;
      }
  }
</style>
