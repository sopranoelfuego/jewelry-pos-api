import * as dotenv from 'dotenv'
import { join } from 'path'

dotenv.config({ path: join(process.cwd(), `.env`) })

export const env = {
 get(name: string): string | undefined {
  return process.env[name.toUpperCase()]
 },
}
