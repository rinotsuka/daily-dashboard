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
      <Calendar />
      <Clock />
      <Weather />
      <RoomTemperature />
      <CO2 />
    </div>
  )
}

const styles = {
  root: css`
    background-color: #000;
    font-family: "Work Sans", sans-serif;
    color: #f1f5f9;
  `,
}
