/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect, useState } from "react"
import dayjs, { Dayjs } from "dayjs"
import axios from "axios"
import "dayjs/locale/ja"
import weekday from "dayjs/plugin/weekday"
import advancedFormat from "dayjs/plugin/advancedFormat"
import { CalendarHeader } from "@/renderer/components/CalendarHeader"
import { CalendarTable } from "@/renderer/components/CalendarTable"

dayjs.extend(weekday)
dayjs.extend(advancedFormat)
dayjs.locale("ja")

type HolidayData = {
  [key: string]: string
}

export default function Calendar() {
  const [holidays, setHolidays] = useState<string[]>([])
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs())

  useEffect(() => {
    // 祝日をAPIから取得
    const fetchHolidays = async () => {
      try {
        const response = await axios.get<HolidayData>("https://holidays-jp.github.io/api/v1/date.json")
        const holidaysData = Object.keys(response.data)
        setHolidays(holidaysData)
      } catch (error) {
        console.error("祝日の取得に失敗しました", error)
      }
    }

    fetchHolidays()
  }, [])

  const prevMonth = () => setCurrentDate(currentDate.subtract(1, "month"))
  const nextMonth = () => setCurrentDate(currentDate.add(1, "month"))
  const today = () => setCurrentDate(dayjs())

  return (
    <div css={styles.root}>
      <CalendarHeader currentDate={currentDate} onPrevMonth={prevMonth} onNextMonth={nextMonth} onToday={today} />
      <CalendarTable currentDate={currentDate} holidays={holidays} />
    </div>
  )
}

const styles = {
  root: css`
    width: 368px;
  `,
}
