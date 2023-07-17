describe('template spec', () => {
  it('blogs', () => {
    cy.request('GET', 'https://api.openai.com/v1/engines/davinci/completions', {
      prompt:"Hello"
    })
      .then((response) => {
        expect(response.status)
        expect(response.body.data.data.choices[0].text);
      });
  });
})