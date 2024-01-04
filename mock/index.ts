import { login } from './login'
import { system } from './system'
import { mortgage } from './mortgageRelease'
import { express } from './expressmanagement'
import { mortgageCity } from './mortgageCity'
export default [...login, ...system, ...mortgage, ...express, ...mortgageCity]
