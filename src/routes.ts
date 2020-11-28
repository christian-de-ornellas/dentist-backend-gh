import MainController from '@controllers/MainController'
import UsersController from '@controllers/UsersController'
import ClientsController from '@controllers/ClientsController'
import FormsController from '@controllers/FormsController'
import AuthController from '@controllers/AuthController'
import QuestionsController from '@controllers/QuestionsControlller'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import checkAuthJwt from '@middlewares/checkAuthJwt'
import ReplysController from '@controllers/ReplysController'

const routes = Router()

// Reply
routes.get('/replys', ReplysController.index)
routes.post(
  '/reply',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      user: Joi.string().required(),
      question: Joi.string().required(),
      client: Joi.string().required(),
      answer: Joi.string().required(),
    }),
  }),
  ReplysController.store
)

routes.get('/', MainController.index)
routes.post('/login', AuthController.store)
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

// All routes be private and need authentication
routes.use(checkAuthJwt)

// UsersController
routes.get('/users', UsersController.index)

routes.delete('/users/:id', UsersController.delete)
routes.put('/users/:id', UsersController.update)

// ClientsController
routes.post(
  '/clients',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      document: Joi.number(),
      birth: Joi.string(),
      email: Joi.string().required().email(),
      phones: Joi.array(),
      father: Joi.string(),
      mother: Joi.string(),
      place: Joi.array(),
    }),
  }),
  ClientsController.store
)

routes.get('/clients', ClientsController.index)
routes.get('/clients/search', ClientsController.search)
routes.put('/clients/:id', ClientsController.update)
routes.delete('/clients/:id', ClientsController.delete)

// FormsController
routes.get('/forms', FormsController.index)
routes.post(
  '/forms',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      user: Joi.string().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
    }),
  }),
  FormsController.store
)
routes.put('/forms/:id', FormsController.update)
routes.delete('/forms/:id', FormsController.delete)

// QuestionsController
routes.get('/questions', QuestionsController.index)
routes.get('/questions/all', QuestionsController.all)
routes.post(
  '/questions',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      form: Joi.string().required(),
      user: Joi.string().required(),
      question: Joi.string().required(),
      input: Joi.string().required(),
    }),
  }),
  QuestionsController.store
)
routes.put('/questions/:id', QuestionsController.update)
routes.delete('/questions/:id', QuestionsController.delete)

export default routes
