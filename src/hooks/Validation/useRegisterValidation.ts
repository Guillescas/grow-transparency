import { registerValidationSchema } from 'services/validations'

import { IRegisterFormData } from './types'

export const useRegisterValidation = () => {
  return async (data: IRegisterFormData) => {
    const schema = registerValidationSchema
    return schema
      .validate(data, { abortEarly: false })
      .then(() => [])
      .catch((err) => {
        return err.errors
      })
  }
}
