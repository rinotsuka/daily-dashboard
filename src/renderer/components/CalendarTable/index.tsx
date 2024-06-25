/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import dayjs, { Dayjs } from "dayjs"

const styles = {
  table: css`
    width: 100%;
    border-collapse: collapse;
  `,
  cell: css`
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  `,
  diffMonth: css`
    color: #ccc;
  `,
  saturday: css`
    background-color: #f0f8ff;
  `,
  sunday: css`
    background-color: #ffe4e1;
  `,
  holiday: css`
    background-color: #ffebcd;
  `,
}

type CalendarTableProps = {
  currentDate: Dayjs
  holidays: string[]
}

export function CalendarTable({ currentDate, holidays }: CalendarTableProps) {
  const isHoliday = (date: Dayjs) => holidays.includes(date.format("YYYY-MM-DD"))

  const generateCalendar = () => {
    const startOfMonth = currentDate.startOf("month")
    const endOfMonth = currentDate.endOf("month")
    const startDate = startOfMonth.startOf("week")
    const endDate = endOfMonth.endOf("week")

    let date = startDate
    const weeks = []

    while (date.isBefore(endDate, "day")) {
      const days = []
      for (let i = 0; i < 7; i++) {
        const isSameMonth = date.month() === currentDate.month()
        const isSaturday = date.day() === 6
        const isSunday = date.day() === 0

        days.push(
          <td
            key={date.toString()}
            css={[
              styles.cell,
              !isSameMonth && styles.diffMonth,
              isSaturday && styles.saturday,
              isSunday && styles.sunday,
              isHoliday(date) && styles.holiday,
            ]}
          >
            {date.date()}
          </td>
        )
        date = date.add(1, "day")
      }
      weeks.push(<tr key={date.toString()}>{days}</tr>)
    }

    return weeks
  }

  return (
    <table css={styles.table}>
      <thead>
        <tr>
          <th css={styles.cell}>日</th>
          <th css={styles.cell}>月</th>
          <th css={styles.cell}>火</th>
          <th css={styles.cell}>水</th>
          <th css={styles.cell}>木</th>
          <th css={styles.cell}>金</th>
          <th css={styles.cell}>土</th>
        </tr>
      </thead>
      <tbody>{generateCalendar()}</tbody>
    </table>
  )
}
