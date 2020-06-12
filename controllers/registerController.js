const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;  
const bcrypt = require('bcrypt');

const User = require('../models/UserModel').User;
 
 
router.get('/', (req, res) => {
   
    res.render("employee/register", {
        
        viewTitle: "Register"
    });
});  

router.post('/', (req, res) => {
    
    var user = new User();

    let errors = [];

    if (!req.body.firstName) {
        errors.push({message: 'First name is mandatory'});
    }
    if (!req.body.lastName) {
        errors.push({message: 'Last name is mandatory'});
    }
    if (!req.body.email) {
        errors.push({message: 'Email field is mandatory'});
    }
    if (!req.body.password || !req.body.cpassword) {
        errors.push({message: 'Password field is mandatory'});
    }
    if (req.body.password !== req.body.cpassword) {
        errors.push({message: 'Passwords do not match'});
    }
    if (errors.length > 0) {
        res.render('employee/register', {
            errors: errors,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        });
    } 
     
    else {
        User.findOne({email: req.body.email}).then(user => {
            if (user) {
                req.flash('error-message', 'Email already exists, try to login.');
                res.redirect('/employee/list');
            } else {
                const newUser = new User(req.body);

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        newUser.password = hash;
                        newUser.save().then(user => {
                            req.flash('success-message', 'You are now registered');
                            res.redirect('/register');
                        });
                    });
                });
            }
        });
    }




});


// defining local strategy 

passport.use(new LocalStrategy({ 
    usernameField: 'email',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({email: email}).then(user => {
        if (!user) { 
            return done(null, false, req.flash('error-message', 'Invalid Email'));
        }

        bcrypt.compare(password, user.password, (err, passwordMatched) => {
            if (err) {
                return err;
            }

            if (!passwordMatched) {
                return done(null, false, req.flash('error-message', 'Invalid Username or Password'));
            }

            return done(null, user, req.flash('success-message', 'Login Successful'));
            //res.redirect('/employee/list');
           
        });
         
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});



// passport.use(new LocalStrategy(function(username, password, done) {
//     User.findOne({
//         username: username
//     }, function(err, user) {
//         // This is how you handle error
//         if (err) return done(err);
//         // When user is not found
//         if (!user) return done(null, false);
//         // When password is not correct
//         if (!user.authenticate(password)) return done(null, false);
//         // When all things are good, we return the user
//         return done(null, user);
//      });
// }));
// 


router.get('/login', (req, res)=>{
    res.render('employee/login')
})
router.post('/login', passport.authenticate('local', {
    successRedirect: '/register/login',
    failureRedirect: '/register/login',
    failureFlash: true,
    successFlash: true,
    session: true
}), (req, res) => {
    res.render('POsted')
})

router.get('/list', (req, res)=>{
    res.redirect('/employee/list')
})

router.get('/logout', (req, res) => {
    req.logOut();
   
    req.flash('success-message', 'Logout was successful');
   res.redirect('/register/login');
})

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}








module.exports = router;