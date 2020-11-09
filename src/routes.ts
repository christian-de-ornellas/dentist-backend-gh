import MainController from '@controllers/MainController'
import UsersController from '@controllers/UsersController'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

const routes = Router()

routes.get('/', MainController.index)

routes.get('/users', UsersController.index)
routes.post(
  '/users',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().required().email(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  UsersController.store
)

routes.post('/login', UsersController.login)

export default routes
