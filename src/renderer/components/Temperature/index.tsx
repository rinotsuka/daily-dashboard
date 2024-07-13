/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { ReactSVG } from "react-svg"
import temperatureIcon from "@/assets/icons/temperature.svg"

type TemperatureProps = {
  temperature: number | null
}

export const Temperature: React.FC<TemperatureProps> = ({ temperature }) => (
  <div css={styles.root}>
    <ReactSVG src={temperatureIcon} css={styles.icon} />
    <span>{temperature && `${temperature}°C`}</span>
  </div>
)

const styles = {
  root: css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    margin-right: 24px;
  `,
  icon: css`
    display: inline-block;
    stroke: #e2e8f0;
    width: 28px;
    height: 28px;
    margin-right: 4px;
  `,
}
