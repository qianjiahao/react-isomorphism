import path from 'path'
import nconf from 'nconf'

let nconfPath = path.resolve(__dirname, '../', 'config/default.json')

nconf.argv().env()
.file({ file: nconfPath })
.defaults({ ENV: 'development' })
