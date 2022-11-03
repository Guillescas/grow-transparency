import { loginValidationSchema } from 'services/validations'

import { ILoginFormData } from './types'

export const useLoginValidation = () => {
  const schema = loginValidationSchema
  return async (data: ILoginFormData): Promise<string[]> => {
    return schema
      .validate(data, { abortEarly: false })
      .then(() => [])
      .catch((err) => {
        return err.errors
      })
  }
}
