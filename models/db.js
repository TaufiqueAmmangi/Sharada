const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Saturday', { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});
module.exports = {
    
    globalVariables: (req, res, next) => {
        res.locals.success_message = req.flash('success-message');
        res.locals.error_message = req.flash('error-message');
        res.locals.user = req.user || null;
        next();
    },

    

    isUserAuthenticated: (req, res, next) => {

        if (req.isAuthenticated()) { next();   }
        else { res.redirect('/register/login') }

    }


}

require('./employee.model');
require('./register.model'); 