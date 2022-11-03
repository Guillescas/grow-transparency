import * as yup from 'yup'

export const loginValidationSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
})

export const registerValidationSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  lastName: yup.string().required('Sobrenome obrigatório'),
  email: yup.string().email('Email inválido').required('Email obrigatório'),
  password: yup
    .string()
    .required('Senha obrigatória')
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
})
