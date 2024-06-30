import { useState, useEffect } from "react"
import axios from "axios"
import { getUVIndexLevel, getPressureChangeLevel } from "@/renderer/utils/weatherUtils"

const API_KEY = "0258e4ad783ccb27bd6713b18131494c"
const CITY = "Tokyo"

type WeatherData = {
  main: {
    temp: number
    humidity: number
  }
  weather: {
    main: string
  }[]
  coord: {
    lon: number
    lat: number
  }
}

type UVData = {
  value: number
}

type ForecastData = {
  list: {
    main: {
      pressure: number
    }
    dt_txt: string
  }[]
}

type WeatherState = {
  temperature: number | null
  humidity: number | null
  weather: string | null
  uvIndexLevel: string | null
  pressureLevel: string | null
}

const checkPressureChange = (forecastList: ForecastData["list"]): number => {
  let highestChange = 0
  for (let i = 1; i < forecastList.length; i++) {
    const prevPressure = forecastList[i - 1].main.pressure
    const currentPressure = forecastList[i].main.pressure
    const pressureChange = Math.abs(currentPressure - prevPressure)

    if (pressureChange > highestChange) {
      highestChange = pressureChange
    }
  }
  return highestChange
}

export const useWeatherData = (): WeatherState => {
  const [data, setData] = useState<WeatherState>({
    temperature: null,
    humidity: null,
    weather: null,
    uvIndexLevel: null,
    pressureLevel: null,
  })

  const fetchWeather = async () => {
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=ja`
      )
      const weatherMain = response.data.weather[0].main

      const { lon, lat } = response.data.coord
      const forecastResponse = await axios.get<ForecastData>(
        `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric&lang=ja`
      )
      const forecastList = forecastResponse.data.list
      const highestPressureChange = checkPressureChange(forecastList)

      const uvResponse = await axios.get<UVData>(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )

      const uvIndexValue = uvResponse.data.value

      setData({
        temperature: Math.round(response.data.main.temp),
        humidity: response.data.main.humidity,
        weather: weatherMain,
        uvIndexLevel: getUVIndexLevel(uvIndexValue),
        pressureLevel: getPressureChangeLevel(highestPressureChange),
      })
    } catch (error) {
      console.error("天気情報の取得に失敗しました")
    }
  }

  useEffect(() => {
    fetchWeather()
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000)

    return () => clearInterval(intervalId)
  }, [])

  return data
}
