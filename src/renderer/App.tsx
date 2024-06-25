/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import Calendar from "@/renderer/components/Calendar"
import Clock from "@/renderer/components/Clock"
import OutsideTemperature from "@/renderer/components/OutsideTemperature"
import RoomTemperature from "@/renderer/components/RoomTemperature"
import Weather from "@/renderer/components/Weather"
import Humidity from "@/renderer/components/Humidity"
import UV from "@/renderer/components/UV"
import CO2 from "@/renderer/components/CO2"

export default function App() {
  return (
    <div css={styles.root}>
      <Calendar />
      <Clock />
      <OutsideTemperature />
      <RoomTemperature />
      <Weather />
      <Humidity />
      <UV />
      <CO2 />
    </div>
  )
}

const styles = {
  root: css``,
}
