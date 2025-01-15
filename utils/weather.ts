import axios from 'axios';

import opencage from 'opencage-api-client'

import {
    SecretsManagerClient,
    GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secretName = "prod/ApiKeys/OpenCage";

const getOpenCageAPIKey = async () => {
    const client = new SecretsManagerClient();

    try {
        const response = await client.send(
            new GetSecretValueCommand({
                SecretId: secretName,
                VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
            })
        );

        const apiKey = JSON.parse(response.SecretString!).ApiKey

        process.env.OPENCAGE_API_KEY = apiKey

        return apiKey
    } catch (error) {
        // For a list of exceptions thrown, see
        // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        throw error;
    }
}

interface Geometry {   
    lat: number,
    lng: number
}

export const geocode = async (address: string): Promise<Geometry> => {
    await getOpenCageAPIKey()
    const response = await opencage.geocode({ q: address })
    // console.log("opencage geocode response: ", response)
    return response.results[0].geometry
}

interface Forecast {
    startTime: string,
    temperature: number,
    temperatureUnit: string,
    probabilityOfPrecipitation: {
        unitCode: string,
        value: number
    },
}[]

// export const getLatLong

export const getWeatherForecast = async (props: {lattitude: number, longitude: number}): Promise<Forecast> => {
    try {
        const headers = {
            'User-Agent': 'GardenCoach/1.0'
        };
        
        const pointResponse = await axios.get(`https://api.weather.gov/points/${props.lattitude},${props.longitude}`, { headers })
        // console.log("pointResponse: ", pointResponse.data)

        const forecastURL = pointResponse.data.properties.forecast
        const forecastResponse = await axios.get(forecastURL, { headers })
        // console.log("forecastResponse: ", forecastResponse.data) 

        const forecast: Forecast = forecastResponse.data.properties.periods.map((period: any) => ({
            startTime: period.startTime,
            temperature: period.temperature,
            temperatureUnit: period.temperatureUnit,
            probabilityOfPrecipitation: period.probabilityOfPrecipitation,
        }));

        // console.log("forecast: ", forecast)

        return forecast
        
    } catch (error) {
        console.error('Error fetching freeze data:', error);
        throw new Error('Could not fetch freeze data');
    }
};


// getWeatherForecast({lattitude: 30.2672, longitude: -97.7431})