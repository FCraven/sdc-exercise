export const capitalize =( str )=> str[0].toUpperCase() + str.slice(1);

export const parseTypes =(types)=> {
  return types.map(el => capitalize(el.type.name)).join(', ')
}

export const parseAbilities =(abilities)=> {
  return abilities.reduce((accum, el, index) => {
    let formattedAbility = el.ability.name.split('-').map(el => capitalize(el)).join(' ')
    return index === abilities.length - 1? accum + formattedAbility : accum + formattedAbility + ', ' ;
  },'');
}
