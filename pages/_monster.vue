<template>
  <main class='container bg-light'>
    <PageHeading :small="'Types: ' + typesList" :large='titleName' />
    <ul>
      <li v-for='ability in monster.abilities' v-bind:key='ability.ability.name'>{{ability.ability.name}}</li>
      </ul>
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
        typesList: ''
      }
    },
    async asyncData({route}) {
      return {
        monsterName: route.params.monster,
        titleName: capitalize(route.params.monster)
      }
    },
    fetchOnServer: false,
    async fetch() {
      const pokeBall = window.localStorage;
      const savedMonster = pokeBall[this.monsterName]
      //GET MONSTER FROM POKEBALL OR API
      if(savedMonster){
        this.monster = JSON.parse(pokeBall.getItem(this.monsterName))
      } else {
          try{
            this.monster = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.monsterName}`).then(res => res.json());
            pokeball.setItem(this.monsterName, JSON.stringify(this.monster))
          } catch(err) {
              next(err)
          }
      }

      const { abilities, types } = this.monster

      this.typesList = parseTypes(types)
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
  }

</style>
