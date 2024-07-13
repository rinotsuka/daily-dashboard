/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

type PressureProps = {
  pressureLevel: string | null
}

export const Pressure: React.FC<PressureProps> = ({ pressureLevel }) => (
  <div css={styles.root}>
    <span css={styles.prefix}>hPa</span>
    <span>{pressureLevel}</span>
  </div>
)

const styles = {
  root: css`
    font-size: 20px;
  `,
  prefix: css`
    font-family: "Passion One", sans-serif;
  `,
}
