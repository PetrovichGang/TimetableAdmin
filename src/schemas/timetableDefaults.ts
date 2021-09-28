const pairSchema = {p1: "", p2: "", p3: "", p4: ""}

const daySchema = {
    a: pairSchema,
    b: pairSchema
}

const daysSchema = {
    MON: daySchema,
    TUE: daySchema,
    WED: daySchema,
    THU: daySchema,
    FRI: daySchema,
    SAT: daySchema
}

const timetableDefaults = {
    Group: "",
    Days: daysSchema
}

export default timetableDefaults