const makePrompt = (input: unknown) => {
    //ID (automatic)
    // Invoice number.
    // Provider Name
    // Customer name
    // %Tax
    // Tax amount
    // net amount
    // Gross Amount
    // Invoice date
    // Due date
    return "Give me invoice datainvoice number, provider name, customer name, tax amount, net amount, gross amount, invoice date and due date) from the following: Give me English and Spanish version.\""+input+"\""+"\n"
}

export default makePrompt