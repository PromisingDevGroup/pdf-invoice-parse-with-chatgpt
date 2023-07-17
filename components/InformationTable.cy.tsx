import React from 'react'
import InformationTable from './InformationTable'

describe('<InformationTable />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<InformationTable data={[["123", "$345", "4243", "234234", "wtwert", "34234234", "12312", "good"], ["123", "$345", "4243", "234234", "wtwert", "34234234", "12312", "good"]]} />)
  })
})