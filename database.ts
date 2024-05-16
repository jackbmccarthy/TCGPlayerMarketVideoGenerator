import { Sequelize, DataTypes } from 'sequelize';
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'pokemon.sqlite'
});
export const PokemonCards = sequelize.define('PokemonCards', {
    carduuid: DataTypes.UUIDV4,
    cardid: DataTypes.STRING,
    name: DataTypes.STRING,
    supertype: DataTypes.STRING,
    artist: DataTypes.STRING,
    rarity: DataTypes.STRING,
    regulationmark: DataTypes.STRING,
    imageurl: DataTypes.TEXT,
    tcgplayerurl: DataTypes.TEXT,
    tcgplayerpricedate: DataTypes.DATE,
    tcgplayernormalprice: DataTypes.FLOAT,
    tcgplayerreverseholoprice: DataTypes.FLOAT,
    tcgplayerholofoilprice: DataTypes.FLOAT
});

export const MarketChanges = sequelize.define('MarketChanges', {
    marketchangeuuid:DataTypes.UUIDV4,
    cardid: DataTypes.STRING,
    cardtype:DataTypes.STRING,
    pricedate:DataTypes.DATE,
    startcarduuid1: DataTypes.UUIDV4,
    endcarduuid1:DataTypes.UUIDV4,
    startcarduuid7: DataTypes.UUIDV4,
    endcarduuid7:DataTypes.UUIDV4,
    startcarduuid30: DataTypes.UUIDV4,
    endcarduuid30:DataTypes.UUIDV4,
    pricechangedollars1: DataTypes.FLOAT,
    pricechangepercent1: DataTypes.FLOAT,
    pricechangedollars7: DataTypes.FLOAT,
    pricechangepercent7: DataTypes.FLOAT,
    pricechangedollars30: DataTypes.FLOAT,
    pricechangepercent30: DataTypes.FLOAT,
    
    
});

MarketChanges.belongsTo(PokemonCards, {
    as: 'endcard1',
    foreignKey: 'endcarduuid1',
    targetKey: 'carduuid'
  });
  
  MarketChanges.belongsTo(PokemonCards, {
    as: 'startcard1',
    foreignKey: 'startcarduuid1',
    targetKey: 'carduuid'
  });
  
  MarketChanges.belongsTo(PokemonCards, {
    as: 'startcard7',
    foreignKey: 'startcarduuid7',
    targetKey: 'carduuid'
  });
  
  MarketChanges.belongsTo(PokemonCards, {
    as: 'endcard7',
    foreignKey: 'endcarduuid7',
    targetKey: 'carduuid'
  });
  
  MarketChanges.belongsTo(PokemonCards, {
    as: 'startcard30',
    foreignKey: 'startcarduuid30',
    targetKey: 'carduuid'
  });
  
  MarketChanges.belongsTo(PokemonCards, {
    as: 'endcard30',
    foreignKey: 'endcarduuid30',
    targetKey: 'carduuid'
  });
  

//sequelize.sync()