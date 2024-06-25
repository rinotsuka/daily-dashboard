/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect, useState } from "react"
import axios from "axios"

const styles = {
  weather: css`
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: center;
  `,
  temp: css`
    font-size: 2rem;
    margin-bottom: 0.5rem;
  `,
  humidity: css`
    font-size: 1.2rem;
  `,
  emoji: css`
    font-size: 2rem;
  `,
  uvIndex: css`
    font-size: 1.2rem;
  `,
  pressure: css`
    font-size: 1.2rem;
  `,
  warning: css`
    color: red;
    font-size: 1.5rem;
    margin-top: 1rem;
  `,
  okay: css`
    color: green;
    font-size: 1.5rem;
    margin-top: 1rem;
  `,
}

// APIキー
const API_KEY = "0258e4ad783ccb27bd6713b18131494c"
const CITY = "Tokyo" // 取得したい都市名

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

const getWeatherEmoji = (main: string) => {
  switch (main.toLowerCase()) {
    case "clear":
      return "☀️" // 晴れ
    case "clouds":
      return "☁️" // 曇り
    case "rain":
      return "🌧️" // 雨
    case "drizzle":
      return "🌦️" // 霧雨
    case "thunderstorm":
      return "⛈️" // 雷雨
    case "snow":
      return "❄️" // 雪
    case "mist":
    case "fog":
      return "🌫️" // 霧
    default:
      return "🌈" // その他
  }
}

const getUVIndexLevel = (uvIndex: number) => {
  if (uvIndex < 3) {
    return "低い"
  } else if (uvIndex < 6) {
    return "中程度"
  } else if (uvIndex < 8) {
    return "高い"
  } else if (uvIndex < 11) {
    return "非常に高い"
  } else {
    return "極端に高い"
  }
}

const getPressureChangeLevel = (pressureChange: number) => {
  if (pressureChange < 2) {
    return "非常に安定"
  } else if (pressureChange < 5) {
    return "安定"
  } else if (pressureChange < 8) {
    return "中程度"
  } else if (pressureChange < 10) {
    return "変動"
  } else {
    return "急激な変動"
  }
}

const checkPressureChange = (forecastList: ForecastData["list"]) => {
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

export default function Weather() {
  const [temperature, setTemperature] = useState<number | null>(null)
  const [humidity, setHumidity] = useState<number | null>(null)
  const [weatherEmoji, setWeatherEmoji] = useState<string>("")
  const [uvIndex, setUvIndex] = useState<number | null>(null)
  const [pressureLevel, setPressureLevel] = useState<string | null>(null)

  const fetchWeather = async () => {
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=ja`
      )
      const weatherMain = response.data.weather[0].main
      setTemperature(Math.round(response.data.main.temp))
      setHumidity(response.data.main.humidity)
      setWeatherEmoji(getWeatherEmoji(weatherMain))

      // 今日と明日の気圧の取得
      const { lon, lat } = response.data.coord
      const forecastResponse = await axios.get<ForecastData>(
        `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric&lang=ja`
      )
      const forecastList = forecastResponse.data.list

      const highestPressureChange = checkPressureChange(forecastList)
      setPressureLevel(getPressureChangeLevel(highestPressureChange))

      // UVインデックスの取得
      const uvResponse = await axios.get<UVData>(
        `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      )
      setUvIndex(uvResponse.data.value)
    } catch (error) {
      console.error("天気情報の取得に失敗しました")
    }
  }

  useEffect(() => {
    fetchWeather()
    const intervalId = setInterval(fetchWeather, 30 * 60 * 1000) // 30分ごとにAPIをリクエスト

    return () => clearInterval(intervalId) // コンポーネントがアンマウントされたらインターバルをクリア
  }, [])

  return (
    <div css={styles.weather}>
      <div css={styles.temp}>{temperature !== null ? `${temperature}°C` : "取得中..."}</div>
      <div css={styles.humidity}>{humidity !== null ? `湿度: ${humidity}%` : "取得中..."}</div>
      <div css={styles.emoji}>{weatherEmoji}</div>
      <div css={styles.uvIndex}>{uvIndex !== null ? `UVインデックス: ${getUVIndexLevel(uvIndex)}` : "取得中..."}</div>
      {pressureLevel && <div css={styles.pressure}>{`気圧の変動: ${pressureLevel}`}</div>}
    </div>
  )
}
