

// router.get("/", (req, res, next) => {
//   res.json("All good in here");
// });

// You put the next routes here 👇
// example: router.use("/auth", authRoutes)
const MovieList = require("../models/MovieList");
const mongoose = require('mongoose');
const router = require("express").Router();

// Middleware to check if the user is logged in
const loginCheck = () => {
  return (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/login');
    }
  }
}


//get all movieLists
router.get('/', (req, res, next) => {    78                                                     
  console.log(req.session.user)
  MovieList.find()
    .then(movieLists => {
      res.status(200).json(movieLists);
    })
    .catch(err => next(err));
});

// get public movieLists
router.get("/public", (req, res, next) => {
  MovieList.find({ privacy: false })
  .then(movieLists => {
    console.log(movieLists);
    res.status(200).json(movieLists)
  })
  .catch((err) => next(err));
});

// get user's movieLists
router.get("/user/:id", (req, res, next) => {
  MovieList.find({ User: req.params.id })
  .then(movieLists => {
    console.log(movieLists);
    res.status(200).json(movieLists)
  })
  .catch((err) => next(err));
});



//create a  movieList
router.post('/add', (req, res, next) => {
  const { title, description, pic, tagline, radius, latitude, longitude, privacy} = req.body;
  console.log('This is the session from post route: ', req.session.user)

  MovieList.create({
    title: title,
    description: description,
    pic: '',
    tagline: tagline,
    tags: '',
   // User: req.session.user._id,
    createdAt: null,
    likeCount: 0,
    privacy: privacy

  })
    .then(movieList => {
      res.status(201).json(movieList);
    })
    .catch(err => {
      next(err);
    })
})


//get a specific movieList

router.get('/:id', (req, res, next) => {
  MovieList.findById(req.params.id)
    .then(movieList => {
      //check for valid id
      //if (!mongoose.Types.ObjectId.isValid(req.params.id)){}

      if (!movieList) {
        res.status(404).json(movieList);
      } else {
        res.status(200).json(movieList);
      }

    })
    .catch(err => {
      next(err);
    })
});


//update a movieList
router.put('/:id', (req, res, next) => {
  const { title, description, pic, tagline, tags, privacy } = req.body;
  MovieList.findByIdAndUpdate(
    {movieList: req.params.id}, 
    {$push: {'movies': {
            title: title, 
            description: description, 
            pic: pic, 
            tagline: tagline, 
            privacy: privacy, 
            tags: tags 
    }}}, 
    { new: true }
    )

    .then(updatedMovieList => {
      res.status(200).json(updatedMovieList);
    })
    .catch(err => next(err));

});


/* Delete a movie from a MovieList */

router.get('/:id/delete', (req, res, next) => {
  List.findOneAndUpdate(
    {movieList: req.params.id},
    {$pull: {movies: {movie_Id: req.query.movie_id}}},
    { new: true }
    )
    then(updatedMovieList => {
      res.status(200).json(updatedMovieList);
    })
    .catch(err => next(err));
});


//delete a movieList
router.delete('/:id', (req, res, next) => {
  MovieList.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'movieList deleted' });
    })
    .catch(err => next(err));
});




module.exports = router;

