<template>
  <section class='card-container'>
      <Card v-for='monster in monsterList'
            v-bind:name='monster'
            v-bind:key='monster'
      />
  </section>
</template>

<script>
 export default {
    data() {
      return {
       monsterList: this.$store.state.monsterList
      }
    }
  }
</script>

<style>

  .card-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  @media only screen and (min-width: 376px) {
    .card-container {
      flex-flow: row wrap;
      justify-content: space-around;
      align-items: flex-start;
    }
  }

  @media only screen and (min-width: 1225px) {
    .card-container {
      justify-content: space-between;
    }
  }



</style>
