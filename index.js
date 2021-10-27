const express = require('express');
const app = express();
const path = require('path');
const {
    v4: uuid
} = require('uuid');
const methodOverride = require('method-override');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({
    extended: true
}));
app.use(methodOverride('_method'))

let lists = [{
    id: uuid(),
    title: 'Pollution',
    username: 'Amrit Raj',
    blog: 'Pollution is the introduction of contaminants into the natural environment that cause adverse change. Pollution can take the form of chemical substances or energy, such as noise, heat, or light. Pollutants, the components of pollution, can be either foreign substances/energies or naturally occurring contaminants.'
}];



app.get('/', (req, res) => {
    res.redirect('/blog');
});

app.get('/blog', (req, res) => {
    res.render('index', {
        lists
    });
});

app.get('/blog/new', (req, res) => {

    res.render('new');
});



app.post('/blog', (req, res) => {

    const newBlog = {
        id: uuid(),
        ...req.body
    }

    lists.push(newBlog);

    res.redirect('/blog');
});


app.get('/blog/:id', (req, res) => {

    const {
        id
    } = req.params;

    const foundBlog = lists.find((c) => c.id === id);


    res.render('show', {
        foundBlog
    });
});

app.get('/blog/:id/edit', (req, res) => {

    const {
        id
    } = req.params;

    const foundBlog = lists.find((c) => c.id === id);

    res.render('edit', {
        foundBlog
    });
});

app.patch('/blog/:id', (req, res) => {

    const {
        id
    } = req.params;

    const updatedBlogText = req.body.blog;

    const foundBlog = lists.find((c) => c.id === id);

    foundBlog.blog = updatedBlogText;

    res.redirect('/blog');
});


app.delete('/blog/:id', (req, res) => {

    const {
        id
    } = req.params;

    const newBlogArray = lists.filter((c) => c.id !== id);

    lists = newBlogArray;

    res.redirect('/blog');
});

app.listen(3000, () => {
    console.log('server runnig at port 3000');
})