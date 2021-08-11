<template>
  <div>
    <h1>{{monsterName}}</h1>
    <NuxtLink to="/">
          <button class='back-button'> Back </button>
    </NuxtLink>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        monster: {}
      }
    },
    async asyncData({route}) {
      return {
        monsterName: route.params.monster
      }
    },
    async fetch() {
      const data = await fetch()
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

</style>
