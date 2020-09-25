import React from 'react';
import { graphql } from 'react-apollo';
import { getBookQuery } from '../queries/queries';



function BookList(props) {


    if (props.data.loading) {
        return (
            <div>Loading....</div>
        )
    }
    else {


        return (
            <ul>
                List of Books : -
                {/* <>
                {props.data.books.map((item, index) =>
                    <li key={item.id}>Name:- {item.name}</li>
                )}
                </> */}
            </ul>
        )
    }

}

export default graphql(getBookQuery)(BookList);

