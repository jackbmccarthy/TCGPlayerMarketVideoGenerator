import { BelongsTo, Op, literal } from "sequelize";
import { MarketChanges, PokemonCards } from "./database";


export default async function getLargestChangesByPercent(pricedate:string, numberOfCards:number = 15){
    let topFiftyPositiveMovers = await MarketChanges.findAll({
        limit:numberOfCards,
        order:[["pricechangepercent1","DESC"], ["createdAt","DESC"],],
        where:{
            pricedate:pricedate,
            pricechangepercent1: {[Op.ne]: null},
            startcarduuid1: {[Op.ne]: null},
            endcarduuid1: {[Op.ne]: null},
            cardtype: {[Op.ne]: null},
            pricechangedollars1:{[Op.gte]:1}
        },
        include: [   {
            model: PokemonCards,
            as: "endcard1"
        },
        {
            model: PokemonCards,
            as: "startcard1"
        },
        {
            model: PokemonCards,
            as: "endcard7"
        },
        {
            model: PokemonCards,
            as: "startcard7"
        },
        {
            model: PokemonCards,
            as: "endcard30"
        },
        {
            model: PokemonCards,
            as: "startcard30"
        }]
    })

    let topFiftyNegativeMovers = await MarketChanges.findAll({
        limit:numberOfCards,
        order:[["pricechangepercent1","ASC"], ["createdAt","DESC"],],
        where:{
            pricedate:pricedate,
            pricechangepercent1: {[Op.ne]: null},
            startcarduuid1: {[Op.ne]: null},
            endcarduuid1: {[Op.ne]: null},
            cardtype: {[Op.ne]: null},
            pricechangedollars1:{[Op.gte]:1}
        },
        
        include: [   {
            model: PokemonCards,
            as: "endcard1"
        },
        {
            model: PokemonCards,
            as: "startcard1"
        },
        {
            model: PokemonCards,
            as: "endcard7"
        },
        {
            model: PokemonCards,
            as: "startcard7"
        },
        {
            model: PokemonCards,
            as: "endcard30"
        },
        {
            model: PokemonCards,
            as: "startcard30"
        }]
    })

    const topMovers = [...topFiftyPositiveMovers, ...topFiftyNegativeMovers]
    //console.log(topMovers.length)
    const topMoversJSON = topMovers.map((card)=>{
        return card.toJSON()
    })
    topMoversJSON.sort((a,b)=>{
        return Math.abs(a["pricechangepercent1"]) > Math.abs(b["pricechangepercent1"])  ? 1 : -1
    })
    return topMoversJSON
}