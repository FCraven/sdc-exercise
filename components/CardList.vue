<template>
  <section class=''>
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

