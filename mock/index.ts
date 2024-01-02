import { login } from './login'
import { system } from './system'
import { mortgage } from './mortgageRelease'
import { express } from './expressmanagement'
export default [...login, ...system, ...mortgage, ...express]
