import AuthController from '@controllers/AuthController'
import ClientsController from '@controllers/ClientsController'
import DashboardController from '@controllers/DashboardController'
import FormsController from '@controllers/FormsController'
import QuestionsController from '@controllers/QuestionsControlller'
import ReplysController from '@controllers/ReplysController'
import UsersController from '@controllers/UsersController'
import checkAuthJwt from '@middlewares/checkAuthJwt'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

const routes = Router()

// Reply
routes.get('/replys', ReplysController.index)
routes.put('/reply/:id', ReplysController.update)
routes.post(
  '/reply',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      form: Joi.string().required(),
      question: Joi.string().required(),
      client: Joi.string().required(),
      answer: Joi.object({
        value: Joi.optional(),
      }),
    }),
  }),
  ReplysController.store
)
routes.put('reply/:id', ReplysController.update)

routes.get('/dashboard', DashboardController.index)
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
routes.get('/users/:id', UsersController.search)
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
      question: Joi.object({
        ask: Joi.string().required(),
        input: Joi.array().items(
          Joi.object({
            type: Joi.string(),
            value: Joi.optional(),
          })
        ),
      }),
      subQuestion: Joi.object().keys({
        ask: Joi.optional(),
        valueKey: Joi.optional(),
        input: Joi.array().items(
          Joi.object({
            type: Joi.optional(),
            value: Joi.optional(),
          })
        ),
      }),
    }),
  }),
  QuestionsController.store
)
routes.put('/questions/:id', QuestionsController.update)
routes.delete('/questions/:id', QuestionsController.delete)

routes.get('/answers', ReplysController.answers)

export default routes
