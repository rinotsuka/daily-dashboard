/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Dayjs } from "dayjs"

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
          <th css={[styles.cell, styles.week, styles.sunday]}>日</th>
          <th css={[styles.cell, styles.week]}>月</th>
          <th css={[styles.cell, styles.week]}>火</th>
          <th css={[styles.cell, styles.week]}>水</th>
          <th css={[styles.cell, styles.week]}>木</th>
          <th css={[styles.cell, styles.week]}>金</th>
          <th css={[styles.cell, styles.week, styles.saturday]}>土</th>
        </tr>
      </thead>
      <tbody>{generateCalendar()}</tbody>
    </table>
  )
}

const styles = {
  table: css`
    width: 100%;
  `,
  cell: css`
    border: none;
    font-weight: 500;
    font-size: 16px;
    text-align: center;
    letter-spacing: 1.5;
    color: #e2e8f0;
    padding: 10px 14px;
  `,
  week: css`
    font-family: "Kosugi Maru", sans-serif;
    font-family: 700;
    font-size: 15px;
  `,
  diffMonth: css`
    color: #334155 !important;
  `,
  saturday: css`
    color: #60a5fa;
  `,
  sunday: css`
    color: #f87171;
  `,
  holiday: css`
    color: #f87171;
  `,
}
