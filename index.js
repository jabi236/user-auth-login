const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
var bodyParser = require('body-parser');
const Conf = require('conf');

const app = express();
const store = new Conf();


//res.redirect for url. url has userid in it.
app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

const handlebars_inst = handlebars.create({
    extname: '.handlebars',
    compilerOptions:{
        preventIndent: true
    },
    layoutsDir: path.join(__dirname, 'views', 'layouts'),
    partialsDir: path.join(__dirname, 'views', 'partials')
});
app.engine('handlebars', handlebars_inst.engine)
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views', 'pages'))

app.get('/',(req,res)=>{
  res.send('it at least started!');
});

//TODO add back in user routes
app.use('/', require('./routes/user'));
//app.use('/', require('./models/User'));

// 404
app.use((req, res)=>{
    res.render('404',{
        alert:{
            type:'warning',
            title: '404 Page Not Found',
            message: 'wut?'
        }
    })
})

const port = 3000;
app.listen(port, () =>{
    console.log('it worked!');
});