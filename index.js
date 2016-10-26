let express = require('express'),
    morgan = require('morgan'),
    app = express();

let port = process.env.PORT || 3000;

if(process.env.NODE_ENV === 'production'){
  app.use(morgan('combined'));
}else{
  app.use(morgan('dev'));
}

//index/example of use route
app.get('/', (req, res) => {
  jHead = {}
  jHead.address = req.headers["x-forwarded-for"]
  jHead.languages = req.headers["accept-language"]
  jHead.system = req.headers["user-agent"]
  res.json(jHead);
  console.log(jHead);
});

app.listen(port, function () {
  console.log('Header app listening on port ' + port);
});
