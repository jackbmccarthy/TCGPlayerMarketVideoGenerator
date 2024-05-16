import { Op, literal } from "sequelize";
import { MarketChanges, PokemonCards } from "./database";


export default async function getLargestChangesByDollars(pricedate: string, numberOfCards:number = 15) {
    let topFiftyPositiveMovers = await MarketChanges.findAll({
        limit: numberOfCards,
        order: [["createdAt", "DESC"], ["pricechangedollars1", "DESC"]],
        where: {
            pricedate: pricedate,
            pricechangepercent1: { [Op.ne]: null },
            startcarduuid1: { [Op.ne]: null },
            endcarduuid1: { [Op.ne]: null },
            cardtype: { [Op.ne]: null },
            pricechangedollars1: { [Op.gte]: 1 }
        },
        include: [
            {
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
        }
    ]
    })

    let topFiftyNegativeMovers = await MarketChanges.findAll({
        limit: numberOfCards,
        order: [["pricechangedollars1", "ASC"], ["createdAt", "DESC"],],
        where: {
            pricedate: pricedate,
            pricechangepercent1: { [Op.ne]: null },
            startcarduuid1: { [Op.ne]: null },
            endcarduuid1: { [Op.ne]: null },
            cardtype: { [Op.ne]: null },
            pricechangedollars1: { [Op.gte]: 1 }
        },
        include: [
            {
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
            }
        ]
    })

    const topMovers = [...topFiftyPositiveMovers, ...topFiftyNegativeMovers]
    //console.log(topMovers.length)
    const topMoversJSON = topMovers.map((card) => {
        return card.toJSON()
    })
    topMoversJSON.sort((a, b) => {
        return Math.abs(a["pricechangedollars1"]) > Math.abs(b["pricechangedollars1"]) ? 1 : -1
    })
    return topMoversJSON
}