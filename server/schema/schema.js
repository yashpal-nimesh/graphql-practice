const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType, GraphQLString, GraphQLSchema,
    GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull } = graphql;
const Book = require('../models/book');
const Author = require('../models/author');


// dummy data

// var books = [

//     { name: "Harry Potter", genre: "Magic", id: "1" ,authorId:"1"},
//     { name: "The Long Earth", genre: "Science", id: "2" ,authorId:"2"},
//     { name: "The Memory of Human", genre: "Curous", id: "3" ,authorId:"3"},
//     { name: "The Coder", genre: "coding", id: "4" ,authorId:"2"},
//     { name: "The Nature", genre: "environment", id: "5" ,authorId:"3"},
//     { name: "Invisible Man", genre: "Magic", id: "6" ,authorId:"1"}


// ]


// var author = [

// { name: "Patrik Rothfus", age: 25, id: "1" },
// { name: "Richard Jamson", age: 45, id: "2" },
// { name: "Telson John", age: 65, id: "3" }

// ]


const BookType = new GraphQLObjectType({    // define book schema
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {

                // return _.find(author, { id: parent.id });

                return Author.findById(parent.authorId)




            }
        }
    })
});

const AuthorType = new GraphQLObjectType({    // define book schema
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return _.filter(books, { authorId: parent.id });

                return Book.find({ authorId: parent.id })


            }
        }
    })
});


const RootQuery = new GraphQLObjectType({    // define root query
    name: 'RootQueryType',
    fields: {
        book: {

            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {

                // return _.find(books, { id: args.id });
                return Book.findById(args.id);

            }
        },
        author: {

            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {

                // return _.find(author, { id: args.id });

                return Author.findById(args.id);
            }

        },

        authors: {

            type: new GraphQLList(AuthorType),
            resolve(parent, args) {

                // return _.find(author, { id: args.id });

                return Author.find({});

            }
        }
        ,

        books: {

            type: new GraphQLList(AuthorType),
            resolve(parent, args) {

                // return _.find(author, { id: args.id });

                return Book.find({});

            }



        }
    }
});



const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: { name: { type: new GraphQLNonNull(GraphQLString) }, age: { type: new GraphQLNonNull(GraphQLInt) } },
            resolve(parent, args) {
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save();

            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GraphQLString) }, authorId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let book = new Book({
                    name: args.name,
                    genre: args.genre,
                    authorId: args.authorId
                });
                return book.save();

            }
        }
    }
})



module.exports = new GraphQLSchema({   // export root query
    query: RootQuery,
    mutation: Mutation
});



