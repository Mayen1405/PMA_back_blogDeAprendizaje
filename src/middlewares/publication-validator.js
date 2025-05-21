import { body, param } from 'express-validator';
import { validateFields } from './validate-fields.js';
import { handleErrors } from './handle-errors.js';
import { deleteFileOnError } from './delete-file-on-error.js';

export const cursos = [
    "Tecnologia",
    "Practica Supervisada",
    "Taller"
]

export const createPublicationValidator = [
    body('title')
        .notEmpty()
        .withMessage('El campo title es obligatorio')
        .isLength({ min: 5 })
        .withMessage('El campo title debe tener al menos 5 caracteres'),
    body('description')
        .notEmpty()
        .withMessage('El campo description es obligatorio')
        .isLength({ min: 10 })
        .withMessage('El campo description debe tener al menos 10 caracteres'),
    body('course')
        .notEmpty()
        .withMessage('El campo course es obligatorio')
        .isIn(cursos)
        .withMessage(`El campo course debe ser uno de los siguientes: ${cursos.join(', ')}`),
    validateFields,
    deleteFileOnError,
    handleErrors
]

export const filerPublicationValidator = [
    param("course")
        .optional()
        .isIn(cursos)
        .withMessage(`El campo course debe ser uno de los siguientes: ${cursos.join(', ')}`),
    param("title")
        .optional()
        .isString()
        .withMessage('El campo title debe ser una cadena de texto'),
    param("sortyByDate")
        .optional()
        .isIn(['asc', 'desc'])
        .withMessage('El campo sortyByDate debe ser uno de los siguientes: asc, desc'),
        validateFields,
        handleErrors
]

export const createCommentValidator = [
    body('name')
        .notEmpty()
        .withMessage('El campo name es obligatorio')
        .isLength({ min: 3 })
        .withMessage('El campo name debe tener al menos 3 caracteres'),
    body('comment')
        .notEmpty()
        .withMessage('El campo comment es obligatorio')
        .isLength({ min: 5 })
        .withMessage('El campo comment debe tener al menos 5 caracteres'),
    validateFields,
    handleErrors
]