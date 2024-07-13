/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useWeatherData } from "@/renderer/hooks/useWeatherData"
import { Temperature } from "@/renderer/components/Temperature"
import { Humidity } from "@/renderer/components/Humidity"
import { UVIndex } from "@/renderer/components/UVIndex"
import { Pressure } from "@/renderer/components/Pressure"
import { WeatherIcon } from "../WeatherIcon"

export default function Weather() {
  const { temperature, humidity, weather, uvIndexLevel, pressureLevel } = useWeatherData()

  return (
    <div css={styles.root}>
      <WeatherIcon weather={weather} />
      <div css={styles.temperatureHumidity}>
        <Temperature temperature={temperature} />
        <Humidity humidity={humidity} />
      </div>
      <div css={styles.pleasant}>
        <UVIndex uvIndexLevel={uvIndexLevel} />
        <Pressure pressureLevel={pressureLevel} />
      </div>
    </div>
  )
}

const styles = {
  root: css`
    border-radius: 8px;
    text-align: center;
  `,
  temperatureHumidity: css`
    display: flex;
    justify-content: center;
    margin-top: 8px;
    margin-bottom: 24px;
  `,
  pleasant: css`
    display: flex;
    justify-content: center;
  `,
}
