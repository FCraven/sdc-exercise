<template>
  <main>
    <Card v-for='monster in monsterList'
          v-bind:name='monster'
          v-bind:key='monster'
    />
  </main>
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

<style scoped>

</style>
