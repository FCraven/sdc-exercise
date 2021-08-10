export const state =()=> ({
  monsterList: ['charmander', 'bulbasaur', 'squirtle'],
  pokeBall: []
})

export const mutations = {
  addToPokeBall(state, monster) {
    state.pokeBall.push(monster)
  }
}
