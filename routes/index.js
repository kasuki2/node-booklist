const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const BookUser = require('../models/BookUser');


// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>

BookUser.findOne({ email: req.user.email }).then(user => {
  if(user){
    var sess = req.session;
    sess.username = req.user.name;

    res.render('dashboard', {
      user: req.user,
      
    })
  }
  else{
    res.render('dashboard', {
      user: req.user
    })
  }
}

)

  
);



router.post('/starring', (req, res) => {
  var sess=req.session;
  var bookid = req.body.bookid;
  var stars = req.body.stars;
  var usernev = sess.username;
  var userid = sess.passport.user;

    BookUser.findById(userid)
        .then(bookuser => {

          var megvan = "nincs";
            var aho = bookuser.books.length;
            for(var i = 0;i<aho;i++){
              if(bookuser.books[i]._id.toString() == bookid){
                if(stars == 1 && bookuser.books[i].stars == 1){
                  stars = 0;
                }
                bookuser.books[i].stars = stars;
                megvan = "megvan";
                break;
              }
            }

            bookuser.save(function (err, updatedBook) {
              if(err){
                  res.send({error:"zz"})

              } else {
                  res.send({stars:stars})
              }
                
            })


        });
  // {name:bookuser.name, books:bookuser.books.length}
 // res.send("successfully got round " + bookid + " n: " + usernev + " id: " + userid);
});

router.post('/delete', (req, res) => {

    var sess=req.session;
    var bookid = req.body.bookid;
    var userid = sess.passport.user;

    BookUser.findById(userid)
        .then(bookuser => {
            var aho = bookuser.books.length;
            for(var i = 0;i<aho;i++){
                if(bookuser.books[i]._id.toString() == bookid){

                    bookuser.books.splice(i,1);

                    break;
                }
            }

            bookuser.save(function (err) {
                if(err){
                    res.send({result:"error"})

                } else {
                    res.send({result:"ok"})
                }

            })


        });

});

router.post('/dashboard', (req, res) => {
  const { title, author, email} = req.body;
 // console.log("user " + req.user.name)
  let errors = [];

  if (!title || !author) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (errors.length > 0) {
    res.render('dashboard', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    BookUser.findOne({ email: email }).then(user => {
      if (!user) {
        errors.push({ msg: 'Email already exists' });
        res.render('dashboard', {
          errors,
          author,
          title
        });
      } else {
        user.books.push({author: author, title: title})
        user.save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
       
      }
    });
  }
});






router.get('/freelist/:id', function (req, res) {
  const id = req.params.id

  BookUser.findById(id)
  .then(bookuser => {
    res.render('freelist', {name:bookuser.name, books:bookuser.books})
  });


});



module.exports = router;
