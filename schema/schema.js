const graphql = require('graphql');

const {
        GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema, 
        GraphQLID, 
        GraphQLInt, 
        GraphQLList,
    } = graphql;

const Movie = require('../models/movie');
const Director = require('../models/director');

const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        director: {
            type: DirectorType,
            resolve(parent, args) {
                return Director.findById(parent.directorId)
            }
        }
    })
})

const DirectorType = new GraphQLObjectType({
    name: 'Director',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return Movies.find({directorId: parent.id})
            }
        }
    })
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addDirector: {
            type: DirectorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args){
                const director = new Director({         //mongoose schema form '../models/director'
                    name: args.name,
                    age: args.age
                });
                return director.save()         //mongoose method 'save'
            }
        },
        addMovie: {
            type: MovieType,
            args: {
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                directorId: {type: GraphQLID}
            },
            resolve(parent, args){
                const movie = new Movie({
                    name: args.name,
                    genre: args.genre,
                    directorId: args.directorId
                })
                return movie.save()
            }
        },
        deleteDirector: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Director.findByIdAndRemove(args.id)
            }
        },
        deleteMovie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Movie.findByIdAndRemove(args.id)
            }
        },
        updateDirector: {
            type: DirectorType,
            args: {
                id: {type: GraphQLID},
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args){
                return Director.findByIdAndUpdate(
                    args.id,
                    {$set: {name: args.name, age: args.age}},
                    {new: true}
                );
            }
        },
        updateMovie: {
            type: MovieType,
            args: {
                id: {type: GraphQLID},
                name: {type: GraphQLString},
                genre: {type: GraphQLString},
                directorId: {type: GraphQLID}
            },
            resolve(parent, args){
                return Movie.findByIdAndUpdate(
                    args.id,
                    {$set: {name: args.name, genre: args.genre, directorId: args.directorId}},
                    {new: true}
                )
            }
        }
    }
})

const Query = new GraphQLObjectType({
    name: 'Query',
    fields:  {
        movie: {
            type: MovieType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Movie.findById(args.id)
            }
        },
        director: {
            type: DirectorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Director.findById(args.id)
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return Movie.find({})
            }
        },
        directors: {
            type: new GraphQLList(DirectorType),
            resolve(parent, args) {
                return Director.find({})
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: Query,
    mutation: Mutation
})