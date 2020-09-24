import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { getAuthorQuery, addBookMutation, getBookQuery } from '../queries/queries';
import { flowRight as compose } from 'lodash';





function AddBook(props) {

    console.log(props.getAuthorQuery)

    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [authorId, setAuthorId] = useState("");


    const submitForm = (e) => {

        e.preventDefault();

        console.log(name, genre, authorId);

        props.addBookMutation({
            variables: {
                name: name,
                genre: genre,
                authorId: authorId
            },
            refetchQueries: [{ query: getBookQuery }]
        });

    }



    if (props.getAuthorQuery.loading) {
        return (
            <div>Loading....</div>
        )
    }
    else {


        return (

            <div class="w-full max-w-xs">
                <br />
                <br />
                <br />

    Add New Book

                <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={submitForm}>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="bookName">
                            Book Name
      </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="bookName" type="text" placeholder="Enter BookName"
                            onChange={(e) => { setName(e.target.value) }} />
                    </div>

                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="genre">
                            Genre
      </label>
                        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="genre" type="text" placeholder="Enter Genre"
                            onChange={(e) => { setGenre(e.target.value) }} />
                    </div>


                    <select id="author" onChange={(e) => { setAuthorId(e.target.value) }}
                        class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" >

                        {props.getAuthorQuery.authors.map((author) =>
                            <option key={author.id}>{author.name}</option>
                        )}

                    </select>
                    <div class="flex items-center justify-between">
                        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            +Add
      </button>
                    </div>
                </form>
            </div>





        )

    }

}

export default compose(
    graphql(getAuthorQuery, { name: "getAuthorQuery" }),
    graphql(addBookMutation, { name: "addBookMutation" })


)(AddBook);

