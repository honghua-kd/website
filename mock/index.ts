import { login } from './login'
import { system } from './system'
import { mortgage } from './mortgageRelease'
import { express } from './expressmanagement'
import { channel } from './channel'
export default [...login, ...system, ...mortgage, ...express, ...channel]
