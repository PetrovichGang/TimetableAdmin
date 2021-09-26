const pairSchema = {1: "", 2: "", 3: "", 4: ""}

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