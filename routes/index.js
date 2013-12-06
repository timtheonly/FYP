

module.exports.setup = function(app){
	/*
	* GET home page.
	*/
	app.get('/', function(req, res){
		res.render('index', { title: 'Login' });
	});

	app.get('/index', function(req, res){
		res.render('index', { title: 'Login' });
	});

}
