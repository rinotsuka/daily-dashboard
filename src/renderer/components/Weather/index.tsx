/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useWeatherData } from "@/renderer/hooks/useWeatherData"
import { Temperature } from "@/renderer/components/Temperature"
import { Humidity } from "@/renderer/components/Humidity"
import { WeatherEmoji } from "@/renderer/components/WeatherEmoji"
import { UVIndex } from "@/renderer/components/UVIndex"
import { Pressure } from "@/renderer/components/Pressure"
import { WeatherIcon } from "../WeatherIcon"

const styles = {
  root: css`
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    text-align: center;
  `,
  temperatureHumidity: css`
    display: flex;
  `,
}

export default function Weather() {
  const { temperature, humidity, weather, uvIndexLevel, pressureLevel } = useWeatherData()

  return (
    <div css={styles.root}>
      <WeatherIcon weather={weather} />
      <div css={styles.temperatureHumidity}>
        <Temperature temperature={temperature} />
        <Humidity humidity={humidity} />
      </div>
      <UVIndex uvIndexLevel={uvIndexLevel} />
      <Pressure pressureLevel={pressureLevel} />
    </div>
  )
}
