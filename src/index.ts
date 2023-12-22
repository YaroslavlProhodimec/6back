import {app} from './settings'
import {runDb} from "./db/db";
const port  = 80

app.listen(port, async ()=>{
  await  runDb()
    console.log(`Listen on port ${port}`)
})