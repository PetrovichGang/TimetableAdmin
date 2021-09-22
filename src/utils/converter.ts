const daysJSON = ["MON", "TUE", "WED", "THU", "FRI", "SAT"]
const pairsIterate = ["1a", "1b", "2a", "2b", "3a", "3b", "4a", "4b"]

const toTableFormat = (group: any): any => {
    let rows: any = []

    for (let pairAB of pairsIterate) {
        let pairType = pairAB.substr(1,1)
        let pairNum = pairAB.substr(0,1)
        let row: any = { id: pairAB }
        for (let day of daysJSON) {
            let v = (group[day][pairType] ?? {})[pairNum]
            row[day] = v
        }
        rows.push(row)
    }
    console.log(rows)
    return rows
}

const toAPIFormat = (items: any, group: string): any => {
    let days: any = {}

    for (let i of items) {
        let pairType = i.id.substr(1,1)
        let pairNum = i.id.substr(0,1)

        for (let [k, v] of Object.entries(i)) {
            if (k === "id" || v === undefined || v === "") continue
            if (days[k] === undefined) days[k] = {}
            if (days[k][pairType] === undefined) days[k][pairType] = {}
            days[k][pairType][pairNum] = v
        }
    }
    console.log(days)

    return {Group: group, Days: days}
}

/*
{ pair: '1a', mon: '', tue: '' }
{ pair: '1b', mon: '', tue: '' }
{ pair: '2a', mon: '', tue: '' }

*/

export default { toTableFormat, toAPIFormat }