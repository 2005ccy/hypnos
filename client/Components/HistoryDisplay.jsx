import React, { useState, useEffect } from 'react';
import db from '../db';
import { useStateValue } from '../Context';
import * as types from '../Constants/actionTypes';



// const updateQueries = () => {
//   db.history
//     .toArray()
//     .then((queries) => {
//       console.log('retrieved from DB', queries);
//       setLocalQH(queries);
//       // dispatch({
//       //   type: types.UPDATE_HISTORY,
//       //   queriesHistory: queries,
//       // });
//     });
// }

const HistoryDisplay = () => {
  const [{ query, queryGQLError }, dispatch] = useStateValue();
  const [localQH, setLocalQH] = useState([]);

  const handleClickDelete = (event) => {
    event.preventDefault();
    //delete div
    const element = document.getElementById(event.target.id);
    element.parentNode.removeChild(element);
    //delete from DB by id
    const id = Number(event.target.id);
    db.history
      .delete(id)
      .then(console.log('deleted ', id));
  }

  const handleClickEdit = (event) => {
    event.preventDefault();
    const id = Number(event.target.id);
    db.history
      .get(id)
      .then((query) => {
        console.log('query in handleClickEdit ', query.query)
        dispatch({
          type: types.GET_QUERY,
          historyTextValue: query.query,
          endpoint: query.endpoint
        })
      })
      .then(() => {
        const inputField = document.querySelector('#endpoint-field input');
        inputField.value = '';
      })
  }

  useEffect(() => {
    // LOCALQH STILL NOT UPDATING AFTER DOM MANIPULATION
    db.history
      .toArray()
      .then((queries) => {
        console.log('retrieved from DB', queries);
        setLocalQH(queries);
        // dispatch({
        //   type: types.UPDATE_HISTORY,
        //   queriesHistory: queries,
        // });
      });
  }, [query, queryGQLError]);


  // console.log('queriesHistory, before render: ', queriesHistory);
  const historyList = localQH.map(el =>
    <li
      id={el.id}>{el.query}
      <button id={el.id}
        onClick={() => handleClickDelete(event)}
      >delete</button>
      <button id={el.id}
        onClick={() => handleClickEdit(event)}
      >edit</button>
      <br />
      <br />
    </li>);

  // console.log('historyList => list of queries as LIs ', historyList);
  return (
    <section id="history-display">
      <p id='history-header'>History</p>
      <ul id="history-list">
        {historyList}
      </ul>
    </section>
  );
};

export default HistoryDisplay;
