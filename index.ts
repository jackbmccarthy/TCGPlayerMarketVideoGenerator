import { writeFileSync } from "fs";
import getLargestChangesByPercent from "./getLargestChangesByPercent";
import getLatestTCGPlayerPriceDate from "./getLatestTCGPlayerDate";


async function main(){
    let latestDate = await getLatestTCGPlayerPriceDate()
    let biggestChangesPercent = await getLargestChangesByPercent(latestDate)
    let biggestChangesDollars = await getLargestChangesByPercent(latestDate)
writeFileSync("changes.json", JSON.stringify([...biggestChangesDollars,...biggestChangesPercent]))
   // console.log(biggestChangesPercent, biggestChangesDollars)
    
}

main()