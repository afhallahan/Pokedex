let pokemonList = [
    {
        name: 'Kingdra', 
        height: 1.8, 
        types: ['dragon', 'water'],
    },
    {
        name: 'Wigglytuff',
        height: 12,
        types: ['fairy', 'normal'],
    },
    {
        name: 'Rhydon',
        height: 120,
        types: ['rock', 'ground'],
    },
];

for (let i = 0; i < pokemonList.length; i++) {
    document.write(+
        pokemonList[i].name + 
        +
        "height:" +
        pokemonList[i].height +
       
    );

    {
        if (pokemonList[i].height >= 15) {
          document.write( 
            pokemonList[i].name +  
              pokemonList[i].height +  
              "-Wow, that's big!" 
             
          );
        }
      }
    }