var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Photo = require('../models/photos');
var Users = require('../models/users');

var mongoUrl = 'mongodb://localhost:27017/Galant';
mongoose.connect(mongoUrl);
var db;


router.get('/photos/get', function(req, res, next) {
	Photo.find(function(err, photosResult){
		if(err){
			console.log(err);
		}else{
			res.json(photosResult);
		};
	});
});

router.post('/photos/post', function (req, res, next){
	var photo = new Photo();
	photo.image = req.body.image;
	photo.totalVotes = 0;

	photo.save(function(err){
		if(err){
			console.log(err);
		}else{
			res.json({message: 'Photo added!'});
		};
	});
});

router.put('/photos/update', function(req, res, next){
	photo.findById(req.params.photo_id, function (err, photosResult){
		if(err){
			console.log(err);
		}else{
			photosResult.image = req.params.photo; //Changes the property of the object we got from Mongo
			photosResult.save(funcion(err){
				if(err){
					console.log(err);
				}else{
					res.json({message:'Photo was updated!'});
				}
			});
		}

	});
});

router.delete('/photos/delete', function(req, res, next){
	Photo.remove({
		_id: req.params.photo_id
	}, function(err, photo){
		if(err){
			console.log(err);
		}else{
			res.json({message: "Successfully deleted!"});
		};
	});
});

router.get('/users/get', function(req, res, next) {
	Users.find(function(err, usersResult){
		if(err){
			console.log(err);
		}else{
			res.json(usersResult);
		}
	});
});


module.exports = router;


