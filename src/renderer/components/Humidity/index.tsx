/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

const humidityStyle = css`
  font-size: 1.2rem;
`

type HumidityProps = {
  humidity: number | null
}

export const Humidity: React.FC<HumidityProps> = ({ humidity }) => (
  <div css={humidityStyle}>{humidity !== null ? `湿度: ${humidity}%` : "取得中..."}</div>
)
