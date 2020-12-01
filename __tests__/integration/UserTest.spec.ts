import request from 'supertest'

import server from '../../src/server'

describe('Users', () => {
  // loading the server
  beforeEach(() => {})

  // closing the server
  afterEach(async () => {
    await server.close()
  })

  it('Should get list of users', async () => {
    const response = await request(server).get('/users')
    expect(200).toEqual(200)
  })
})
