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

routes.post('/login', AuthController.store)

// Reply
routes.get('/replys', checkAuthJwt, ReplysController.index)
routes.delete('/reply/:id', checkAuthJwt, ReplysController.delete)
routes.post(
  '/reply',
  checkAuthJwt,
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

routes.get('/dashboard', checkAuthJwt, DashboardController.index)
routes.post(
  '/users',
  checkAuthJwt,
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

routes.get('/tusks', checkAuthJwt, TusksController.index)
routes.delete('/tusks/:id', checkAuthJwt, TusksController.delete)
routes.post('/tusks', checkAuthJwt, TusksController.store)

// UsersController
routes.get('/users', checkAuthJwt, UsersController.index)
routes.get('/users/:id', checkAuthJwt, UsersController.search)
routes.delete('/users/:id', checkAuthJwt, UsersController.delete)
routes.put('/users/:id', checkAuthJwt, UsersController.update)

// ClientsController
routes.post(
  '/clients',
  checkAuthJwt,
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

routes.get('/clients', checkAuthJwt, ClientsController.index)
routes.get('/clients/search', checkAuthJwt, ClientsController.search)
routes.put('/clients/:id', checkAuthJwt, ClientsController.update)
routes.delete('/clients/:id', checkAuthJwt, ClientsController.delete)

// FormsController
routes.get('/forms', checkAuthJwt, FormsController.index)
routes.post(
  '/forms',
  checkAuthJwt,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      user: Joi.string().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
    }),
  }),
  FormsController.store
)
routes.put('/forms/:id', checkAuthJwt, FormsController.update)
routes.delete('/forms/:id', checkAuthJwt, FormsController.delete)

// QuestionsController
routes.get('/questions', checkAuthJwt, QuestionsController.index)
routes.get('/questions/all', checkAuthJwt, QuestionsController.all)
routes.post(
  '/questions',
  checkAuthJwt,
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
routes.put('/questions/:id', checkAuthJwt, QuestionsController.update)
routes.delete('/questions/:id', checkAuthJwt, QuestionsController.delete)

routes.get('/answers', checkAuthJwt, ReplysController.answers)

//TermsController
routes.get('/terms', checkAuthJwt, TermsController.index)
routes.post(
  '/terms',
  checkAuthJwt,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      client: Joi.string().required(),
      form: Joi.string().required(),
      term: Joi.string().required(),
    }),
  }),
  TermsController.store
)

routes.delete('/terms/:id', checkAuthJwt, TermsController.delete)

routes.post('/images', checkAuthJwt, ImagesController.store)
routes.delete('/remove', checkAuthJwt, ImagesController.delete)

export default routes
