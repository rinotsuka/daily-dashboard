/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { ReactSVG } from "react-svg"
import temperatureIcon from "@/assets/icons/temperature.svg"

const styles = {
  root: css`
    font-size: 2rem;
    margin-bottom: 0.5rem;
  `,
  icon: css`
    display: inline-block;
    stroke: #fff;
    width: 32px;
    height: 32px;
  `,
}

type TemperatureProps = {
  temperature: number | null
}

export const Temperature: React.FC<TemperatureProps> = ({ temperature }) => (
  <div css={styles.root}>
    <ReactSVG src={temperatureIcon} css={styles.icon} />
    <span>{temperature && `${temperature}°C`}</span>
  </div>
)
