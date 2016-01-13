var keystone = require('keystone'),
	async = require('async'),
	User = keystone.list('User');

var admins = [
	{ email: 'bas.zurburg@xs4all.nl', password: 'delicionu', isProtected: false, name: { first: 'Bas', last: 'Zurburg' } }
];

function createAdmin(admin, done) {
	User.model.findOne({ email: admin.email }).exec(function(err, user) {
		admin.isAdmin = true;
		new User.model(admin).save(function(err) {
			if (err) {
				console.error("Error adding admin " + admin.email + " to the database:");
				console.error(err);
			} else {
				console.log("Added admin " + admin.email + " to the database.");
			}
			done();
		});
	});
}

exports = module.exports = function(done) {
	async.forEach(admins, createAdmin, done);
};
