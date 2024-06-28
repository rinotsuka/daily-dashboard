/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Calendar from "@/renderer/components/Calendar"
import Clock from "@/renderer/components/Clock"
import RoomTemperature from "@/renderer/components/RoomTemperature"
import Weather from "@/renderer/components/Weather"
import CO2 from "@/renderer/components/CO2"

export default function App() {
  return (
    <div css={styles.root}>
      <div css={styles.left}>
        <Weather />
        <RoomTemperature />
        <CO2 />
      </div>
      <div css={styles.right}>
        <Clock />
        <Calendar />
      </div>
    </div>
  )
}

const styles = {
  root: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #000;
    font-family: "Work Sans", "Kosugi Maru", sans-serif;
    color: #e2e8f0;
    height: 100vh;
    padding-left: 24px;
    padding-right: 24px;
  `,
  right: css`
    padding-bottom: 8px;
  `,
  left: css``,
}
