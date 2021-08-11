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
