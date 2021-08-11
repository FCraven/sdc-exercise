<template>
  <main class='container bg-light'>
    <PageHeading :small='small' :large='large'/>
    <CardList />
  </main>
</template>

<script>
  export default {
    data() {
      return {
        small: 'Pokemon Cards',
        large: `Gotta catch 'em all`
      }
    }
  }

</script>

<style scoped>

</style>
