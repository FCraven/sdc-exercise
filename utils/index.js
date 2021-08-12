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

export const createFlavorText =(arr)=> {
  const rawTextEntries = arr.slice(0,7);
  const textObj = {};

  for(const entry of rawTextEntries) {
    const language = entry.language.name;
    const text = entry.flavor_text;
    let newText = text.replace(/(\r\n|\n|\r)/gm, ' ');
    if(language === 'en' && !textObj[newText]) {
      textObj[newText] = true;
    }
  }
  return Object.keys(textObj).join(' ')
}
