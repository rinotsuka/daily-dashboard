/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useWeatherData } from "@/renderer/hooks/useWeatherData"
import { Temperature } from "@/renderer/components/Temperature"
import { Humidity } from "@/renderer/components/Humidity"
import { WeatherEmoji } from "@/renderer/components/WeatherEmoji"
import { UVIndex } from "@/renderer/components/UVIndex"
import { Pressure } from "@/renderer/components/Pressure"

const weatherStyle = css`
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
`

export default function Weather() {
  const { temperature, humidity, weatherEmoji, uvIndexLevel, pressureLevel } = useWeatherData()

  return (
    <div css={weatherStyle}>
      <Temperature temperature={temperature} />
      <Humidity humidity={humidity} />
      <WeatherEmoji weatherEmoji={weatherEmoji} />
      <UVIndex uvIndexLevel={uvIndexLevel} />
      <Pressure pressureLevel={pressureLevel} />
    </div>
  )
}
