const express = require('express');
const app = express();
const jsonfile = require('jsonfile');

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.listen(3001);
console.log('Listening on http://localhost:3001');

// POST method route
app.post('/', function (req, res) {
  console.log(req.body);

  var typePost = req.body.TypePost;
  
  var file = 'SavePosts.json';
  jsonfile.readFile(file, function(err, obj) {
    console.log(obj);

console.log(typePost);
  if(typePost=="addPost")
  {
  console.log("Je suis un post")
    var id = req.body.id;
    var author = req.body.author;
    var text = req.body.text;
  obj.posts.push({
        id,
        author,
        text,
        });
	}
   else if(typePost=="addComment")
   {
   console.log("Je suis un commentaire");
     var id = req.body.id;
     var idPost = req.body.idPost;
     var author = req.body.author;
     var text = req.body.text;

    obj.comments.push({
           id,
           idPost,
           author,
           text,
           });
   }
	jsonfile.writeFile(file, obj, function (err) {
	    console.error(err)
	    })
	
	console.log("--------------------");
	console.log(obj);
	})
	
	
});