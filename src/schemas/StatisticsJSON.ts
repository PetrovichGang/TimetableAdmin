export type StatisticsJSON = {
  users: {
    count: number
    chart: [[string, number]]
    full: Array<{
      lesson_group: string
      join: number
      first_name: string
      last_name: string
      peer_id: number
    }>
  }
  groups: {
    chart: Record<string, number>
    full: Record<string, number>
  }
}