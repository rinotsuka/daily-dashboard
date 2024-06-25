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
  hourly: {
    dt: number
    uvi: number
  }[]
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

const getPressureLevel = (pressure: number) => {
  if (pressure < 980) {
    return "非常に低い"
  } else if (pressure < 1000) {
    return "低い"
  } else if (pressure < 1020) {
    return "中程度"
  } else if (pressure < 1040) {
    return "高い"
  } else {
    return "非常に高い"
  }
}

const getStrongUVWarning = (hourlyUV: { dt: number; uvi: number }[]) => {
  const strongUV = hourlyUV.some((hour) => hour.uvi >= 6) // 中程度以上
  return strongUV
}

export default function Weather() {
  const [temperature, setTemperature] = useState<number | null>(null)
  const [humidity, setHumidity] = useState<number | null>(null)
  const [weatherEmoji, setWeatherEmoji] = useState<string>("")
  const [uvIndex, setUvIndex] = useState<number | null>(null)
  const [pressureToday, setPressureToday] = useState<number | null>(null)
  const [pressureTomorrow, setPressureTomorrow] = useState<number | null>(null)
  const [uvWarning, setUvWarning] = useState<boolean>(false)

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
      const todayForecast = forecastResponse.data.list.find(
        (forecast) =>
          forecast.dt_txt.includes("12:00:00") && new Date(forecast.dt_txt).getDate() === new Date().getDate()
      )
      const tomorrowForecast = forecastResponse.data.list.find(
        (forecast) =>
          forecast.dt_txt.includes("12:00:00") && new Date(forecast.dt_txt).getDate() === new Date().getDate() + 1
      )
      if (todayForecast) {
        setPressureToday(todayForecast.main.pressure)
      }
      if (tomorrowForecast) {
        setPressureTomorrow(tomorrowForecast.main.pressure)
      }

      // UVインデックスの取得
      const uvResponse = await axios.get<UVData>(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${API_KEY}`
      )
      const currentUV = uvResponse.data.hourly[0].uvi
      setUvIndex(currentUV)
      setUvWarning(getStrongUVWarning(uvResponse.data.hourly))
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
      {pressureToday !== null && <div css={styles.pressure}>{`今日の気圧: ${getPressureLevel(pressureToday)}`}</div>}
      {pressureTomorrow !== null && (
        <div css={styles.pressure}>{`明日の気圧: ${getPressureLevel(pressureTomorrow)}`}</div>
      )}
      {uvWarning ? (
        <div css={styles.warning}>⚠️ 今日のUVインデックスが高い時間帯がありますので注意してください</div>
      ) : (
        <div css={styles.okay}>✅ UVインデックスは問題ありません</div>
      )}
    </div>
  )
}
