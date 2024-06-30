/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { ReactSVG } from "react-svg"
import waterDropletsIcon from "@/assets/icons/water-droplets.svg"

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

type HumidityProps = {
  humidity: number | null
}

export const Humidity: React.FC<HumidityProps> = ({ humidity }) => (
  <div css={styles.root}>
    <ReactSVG src={waterDropletsIcon} css={styles.icon} />
    <span>{humidity && `湿度: ${humidity}%`}</span>
  </div>
)
