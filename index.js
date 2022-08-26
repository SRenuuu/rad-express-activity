const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const tasks = require('./Tasks')
const logger = require('./middleware/logger');

const app = express();

// Use logger middleware
app.use(logger);

// Use handlebars middleware
app.engine('handlebars', hbs.engine());
app.set('view engine', 'handlebars');
hbs.cache = false;

// Use middleware to parse request data
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.disable('view cache');

app.use('/api/tasks', require('./routes/api/tasks'));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'To do App',
        tasks: tasks
    });
})

// app.get('/', (req, res)=>{
//     res.sendFile(path.join(__dirname, 'public', 'main.html'));
// })

const PORT = process.env.port || 8080

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
