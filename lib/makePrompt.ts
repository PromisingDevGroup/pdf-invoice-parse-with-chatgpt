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

    // Give me English and Spanish version. --- no need
    return "Give me invoice data: invoice number, provider name, customer name, tax amount, net amount, gross amount, invoice date and due date) from the following: Give me an English version. And don't include unncessary information, even Invoice Data:. And do not exclude any info even though it may be null or undefined.\""+input+"\""+"\n"
}

export default makePrompt