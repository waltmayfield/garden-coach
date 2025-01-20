import { stringify } from 'yaml'
import { geocode, getWeatherForecast } from '../../utils/weather';


const main = async () => {
    const location = await geocode("Austin, Texas, USA")
    console.log("Location: \n", stringify(location))

    const forecast = await getWeatherForecast({lattitude: location.lat, longitude: location.lng})
    console.log("Forecast: ", forecast)
}

main()