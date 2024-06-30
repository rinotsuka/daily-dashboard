/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { ReactSVG } from "react-svg"
import sunIcon from "@/assets/icons/sun.svg"
import cloudIcon from "@/assets/icons/cloud.svg"
import rainIcon from "@/assets/icons/rain.svg"
import thunderIcon from "@/assets/icons/thunder.svg"
import snowIcon from "@/assets/icons/snow.svg"
import fogIcon from "@/assets/icons/fog.svg"

const styles = {
  root: css`
    font-size: 2rem;
  `,
  icon: css`
    display: inline-block;
    stroke: #f3f4f6;
    width: 120px;
    height: 120px;
  `,
  sun: css`
    stroke: #fdba74;
  `,
  cloud: css``,
  rain: css`
    .rain {
      stroke: #60a5fa;
    }
  `,
  thunder: css`
    .thunder {
      stroke: #facc15;
    }
  `,
  snow: css`
    .snow {
      stroke: #bae6fd;
    }
  `,
  fog: css`
    stroke: #9ca3af;
  `,
}

type WeatherEmojiProps = {
  weather: string | null
}

export const WeatherIcon: React.FC<WeatherEmojiProps> = ({ weather }) => {
  const weatherSvg = (main: string): React.ReactNode => {
    switch (main.toLowerCase()) {
      case "clear":
        return <ReactSVG src={sunIcon} css={[styles.icon, styles.sun]} />
      case "clouds":
        return <ReactSVG src={cloudIcon} css={[styles.icon, styles.cloud]} />
      case "rain":
      case " drizzle":
        return <ReactSVG src={rainIcon} css={[styles.icon, styles.rain]} />
      case "thunderstorm":
        return <ReactSVG src={thunderIcon} css={[styles.icon, styles.thunder]} />
      case "snow":
        return <ReactSVG src={snowIcon} css={[styles.icon, styles.snow]} />
      case "mist":
      case "fog":
        return <ReactSVG src={fogIcon} css={[styles.icon, styles.fog]} />
      default:
        return "🌈"
    }
  }

  return (
    <div css={styles.root}>
      {/* <span>{weather ? weatherSvg(weather) : "🌈"}</span> */}
      <span>{weather ? weatherSvg("fog") : "🌈"}</span>
    </div>
  )
}
