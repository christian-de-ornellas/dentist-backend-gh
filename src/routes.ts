import AuthController from '@controllers/AuthController'
import ClientsController from '@controllers/ClientsController'
import DashboardController from '@controllers/DashboardController'
import FormsController from '@controllers/FormsController'
import ImagesController from '@controllers/ImagesController'
import QuestionsController from '@controllers/QuestionsControlller'
import ReplysController from '@controllers/ReplysController'
import TermsController from '@controllers/TermsController'
import TusksController from '@controllers/TusksController'
import UsersController from '@controllers/UsersController'
import checkAuthJwt from '@middlewares/checkAuthJwt'
import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'

const routes = Router()

//Routes Public
routes.post('/login', AuthController.store)

// Routes Private
routes.use(checkAuthJwt)

// Reply
routes.get('/replys', ReplysController.index)
routes.delete('/reply/:id', ReplysController.delete)
routes.post(
  '/reply',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      form: Joi.string().required(),
      question: Joi.string().required(),
      client: Joi.string().required(),
      answer: Joi.object({
        subAnswer: Joi.optional(),
        value: Joi.optional(),
      }),
    }),
  }),
  ReplysController.store
)

routes.get('/dashboard', DashboardController.index)
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

// TusksController

routes.get('/tusks', TusksController.index)
routes.delete('/tusks/:id', TusksController.delete)
routes.post('/tusks', TusksController.store)

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
      genre: Joi.string().required(),
      document: Joi.number(),
      birth: Joi.string(),
      email: Joi.string().required().email(),
      phones: Joi.array(),
      father: Joi.string(),
      mother: Joi.string(),
      place: Joi.array(),
      bondsman: Joi.object().keys({
        parent: Joi.string(),
        document: Joi.string(),
        name: Joi.string(),
      }),
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

//TermsController
routes.get('/terms', TermsController.index)
routes.post(
  '/terms',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      client: Joi.string().required(),
      form: Joi.string().required(),
      term: Joi.string().required(),
    }),
  }),
  TermsController.store
)

routes.delete('/terms/:id', TermsController.delete)

routes.post('/images', ImagesController.store)
routes.delete('/remove', ImagesController.delete)

export default routes
