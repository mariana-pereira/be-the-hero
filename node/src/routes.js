const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const OngController = require('./app/controllers/OngController');
const IncidentController = require('./app/controllers/IncidentController');
const ProfileController = require('./app/controllers/Profile.controller');
const SessionController = require('./app/controllers/SessionController');

const routes = Router();

routes.post(
  '/sessions',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required()
    })
  }),
  SessionController.store
);

routes.get('/ongs', OngController.index);

routes.post(
  '/ongs',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.string()
        .required()
        .min(10)
        .max(11),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2)
    })
  }),
  OngController.store
);

routes.get(
  '/profile',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  ProfileController.index
);

routes.get(
  '/incidents',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  }),
  IncidentController.index
);

routes.post(
  '/incidents',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  IncidentController.store
);

routes.delete(
  '/incidents/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  }),
  IncidentController.delete
);

module.exports = routes;
