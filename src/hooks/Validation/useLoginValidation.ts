import { loginValidationSchema } from 'services/validations'

import { ILoginValues } from './types'

export const useLoginValidation = () => {
  const schema = loginValidationSchema
  return async (data: ILoginValues): Promise<string[]> => {
    return schema
      .validate(data, { abortEarly: false })
      .then(() => [])
      .catch((err) => {
        return err.errors
      })
  }
}
