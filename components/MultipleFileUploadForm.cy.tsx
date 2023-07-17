import React from 'react'
import MultipleFileUploadForm from './MultipleFileUploadForm'

describe('<MultipleFileUploadForm />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<MultipleFileUploadForm />)
  })
})