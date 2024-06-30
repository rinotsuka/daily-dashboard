export const getUVIndexLevel = (uvIndex: number): string => {
  if (uvIndex < 3) {
    return "低い"
  } else if (uvIndex < 6) {
    return "中程度"
  } else if (uvIndex < 8) {
    return "高い"
  } else if (uvIndex < 11) {
    return "非常に高い"
  } else {
    return "極端に高い"
  }
}

export const getPressureChangeLevel = (pressureChange: number): string => {
  if (pressureChange < 2) {
    return "非常に安定"
  } else if (pressureChange < 5) {
    return "安定"
  } else if (pressureChange < 8) {
    return "中程度"
  } else if (pressureChange < 10) {
    return "変動"
  } else {
    return "急激な変動"
  }
}
