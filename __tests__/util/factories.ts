import { User } from '@models/User'
import { factory } from 'factory-girl'

export default factory.define('User', User, {
  email: 'christian@orientme.com.br',
  firstName: 'Christian',
  lastName: 'Possidonio',
  password: '123',
})
