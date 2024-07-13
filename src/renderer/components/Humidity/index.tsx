/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { ReactSVG } from "react-svg"
import waterDropletsIcon from "@/assets/icons/water-droplets.svg"

type HumidityProps = {
  humidity: number | null
}

export const Humidity: React.FC<HumidityProps> = ({ humidity }) => (
  <div css={styles.root}>
    <ReactSVG src={waterDropletsIcon} css={styles.icon} />
    <span>{humidity && `${humidity}%`}</span>
  </div>
)

const styles = {
  root: css`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
  `,
  icon: css`
    display: inline-block;
    stroke: #e2e8f0;
    width: 28px;
    height: 28px;
    margin-right: 4px;
  `,
}
