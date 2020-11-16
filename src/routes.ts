import MainController from '@controllers/MainController'
import UsersController from '@controllers/UsersController'
import ClientsController from '@controllers/ClientsController'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

const routes = Router()

routes.get('/', MainController.index)

routes.get('/users', UsersController.index)
routes.post(
  '/users',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      role: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  UsersController.store
)

routes.post('/clients', ClientsController.index)

routes.post(
  '/clients',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      document: Joi.number(),
      birth: Joi.string(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      phones: Joi.array(),
      father: Joi.string(),
      mother: Joi.string(),
      responsible: Joi.array(),
      place: Joi.array(),
    }),
  }),
  ClientsController.store
)

export default routes
