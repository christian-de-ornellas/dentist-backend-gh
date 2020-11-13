import request from 'supertest'
import server from '../../src/server'

describe('Main', () => {
  // loading the server
  beforeEach(() => {})
  // closing the server
  afterEach(async () => {
    await server.close()
  })
  it('Should get info of the api', async () => {
    const response = await request(server).get('/')
    expect(response.status).toEqual(200)
  })
})
