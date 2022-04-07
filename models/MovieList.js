const { Schema, model } = require("mongoose");



// TODO: Please make sure you edit the user model to whatever makes sense in this case
const movieListSchema = new Schema({
    title: String,
  
    User: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAT: {
        type: Date,
        default: new Date()
    },
    movies: [
        {
            movie_Id: String,
            movie_title: String,
            tagline: String,
            tags: [String],
            description: String,
            posterUrl: String,
            ApiRating: Number,
            likeCount: Number,
            privacy: Boolean,
            
            //myRating: Number,
        }
    ]
});


const MovieList = model('MovieList', movieListSchema);

module.exports = MovieList;
