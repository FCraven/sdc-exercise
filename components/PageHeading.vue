<template>
  <section id='page-heading-container'>
    <h1 class='is-uppercase title'>Pokemon Cards</h1>
    <h2 class='catch-phrase'>Gotta catch 'em all</h2>
  </section>
</template>

<style scoped>
  #page-heading-container {
    width: 335px;
    /* height: 76px; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: flex-start;
    margin-bottom: 40px;
    padding-bottom: 3px;
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
