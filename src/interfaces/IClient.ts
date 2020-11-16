export interface IClient {
  user: string
  firstName: string
  lastName: string
  document: number
  birth: string
  email: string
  phones: { one: string; two: string }[]
  father: string
  mother: string
  place: { cep: number; street: string; neighborhood: string; number: string; complement: string; city: string; state: string }[]
}
