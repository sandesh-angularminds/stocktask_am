const app = require('./app')
// const {connectToDatabase } = require('./connection')
// connectToDatabase()
app.listen(process.env.PORT, ()=>{
    console.log('app is listening...', process.env.PORT)
})
