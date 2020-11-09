import request from 'supertest'
import server from '../../src/server'
import { User } from '@models/User'

describe('Users', () => {
  // loading the server
  beforeEach(() => {})

  // closing the server
  afterEach(async () => {
    await server.close()
  })

  it('Should get list of users', async () => {
    const response = await request(server).get('/users')
    console.log(response)
    expect(response.status).toEqual(200)
  })
})
