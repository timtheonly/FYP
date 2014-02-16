module.exports.setup = function(app){
	/*
	* App routes
	*/
	var urlBase = '/app';
	app.get(urlBase, function(req, res){
		if(req.session.user)
		{
			res.render('app', {title:'Welcome'});

		}else{
			res.redirect('/');
		}
	});

};