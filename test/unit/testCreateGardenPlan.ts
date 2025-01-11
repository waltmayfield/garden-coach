import { Schema } from '../../amplify/data/resource';
import {getGardenPlanSteps} from '../../amplify/functions/generateGardenPlanStepsHandler';
import { stringify } from 'yaml'

const main = async () => {
    const garden: Schema['Garden']['createType'] = {
        objective: "Maximize food production",
        perimeterPoints: [
            {x: 0, y: 0},
            {x: 0, y: 2},
            {x: 8, y: 8},
            {x: 8, y: 0}
        ],
        units: 'metric'
    }

    const newSteps = await getGardenPlanSteps(garden)

    console.log("New Steps: ", stringify(newSteps))
}

main()