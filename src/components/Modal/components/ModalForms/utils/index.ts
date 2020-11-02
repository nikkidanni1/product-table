import Ajv from "ajv"

export const validation = (schema: {
    minLength?: number,
    maxLength?: number,
    pattern?: string,
    type?: string,
    minimum?: number,
    maximum?: number
}, data: string | number) => {
    const ajv = new Ajv({ allErrors: false })
    const validate = ajv.compile(schema)
    let value = data
    if (schema.type === "integer" || schema.type === "number") {
        value = value === "" || isNaN(Number(value)) ? "" : Number(value)
    }
    validate(value)
    return ajv.errorsText(validate.errors)
}
