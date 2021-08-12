<template>
  <section class='container page-heading-container'>
    <h1 class='is-uppercase title'>{{small}}</h1>
    <h2 class='catch-phrase'>{{large}}</h2>
  </section>
</template>

<script>
 export default {
   props: ['small', 'large']
 }
 //figure out props
</script>


<style scoped>
  .page-heading-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: flex-start;
    margin-bottom: 40px;
  }

</style>
