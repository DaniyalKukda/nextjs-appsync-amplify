import faker from "faker"

export const generateAddress = () => ({
    id : faker.datatype.uuid(),
    streetAddress : faker.address.streetAddress(),
    city : faker.address.city(),
    zipCode : faker.address.zipCode()
})