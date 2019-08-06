/**
* ERROR CHECKING FOR FETCH REQ IN QUERY INPUT. IMPORTED TO HANDLE QUERY FETCH
*
*/

import * as types from '../../Constants/actionTypes';
import * as errorMsg from '../../Constants/errors/errorStrings';
import * as dispatchObj from '../../Constants/errors/errorDispatchObjects';

const fetchErrorCheck = (error, dispatch, reject) => {
  // if Gql query does not start with 'query'
  if (error.message.slice(0, errorMsg.queryMethodError.length) === errorMsg.queryMethodError) {
    dispatch({
      type: types.GQL_ERROR,
      // line 1 is hardcoded in.
      gqlError: 'Query method is invalid. Please double check your query on line 1.',
    });
    reject(new Error('Query method is invalid. Please double check your query on line 1.'));
  } else if (error.message.slice(0, errorMsg.multipleQueriesError.length) === errorMsg.multipleQueriesError) {
    dispatch({
      type: types.GQL_ERROR,
      gqlError: 'Currently attempting to run multiple queries, but only one query, subscription, or mutation may be run at one time.',
    });
    reject(new Error('Currently attempting to run multiple queries, but only one query, subscription, or mutation may be run at one time.'));
    // if the variable before @rest does not exist
    // ! TODO: this doesn't look like it's firing.
  } else if (error.message === errorMsg.varBeforeRestError) {
    dispatch({
      type: types.GQL_ERROR,
      gqlError: 'Variable before "@rest" cannot be blank. Please click reset and check line 3 of the example for reference.',
    });
    reject(new Error('Variable before "@rest" cannot be blank. Please click reset and check line 3 of the example for reference.'));
    // if query does not have proper curly brackets
    // ! TODO: this didn't look like it fired for inner right bracket being closed. Or final right bracket
  } else if (error.message === errorMsg.curlyBracketError1 || error.message.slice(0, errorMsg.curlyBracketError2.length) === errorMsg.curlyBracketError2 || error.message.slice(0, errorMsg.curlyBracketError3.length) === errorMsg.curlyBracketError3) {
    dispatch({
      type: types.GQL_ERROR,
      gqlError: 'Query must be wrapped in curly brackets.',
    });
    reject(new Error('Query must be wrapped in curly brackets.'));
    // if the query fields are blank
    // ! TODO: this doesn't look like it's firing
  } else if (error.message === errorMsg.queryFieldBlankError) {
    dispatch({
      type: types.GQL_ERROR,
      gqlError: 'Query fields cannot be blank. Please click "Reset" and check line 4 of the example for reference.',
    });
    reject(new Error('Query fields cannot be blank. Please click "Reset" and check line 4 of the example for reference.'));
  } else if (error.message.slice(0, errorMsg.typeSyntaxError.length) === errorMsg.typeSyntaxError) {
    dispatch({
      type: types.GQL_ERROR,
      gqlError: 'Inside @rest, "type" must be followed by a colon (e.g. type:).',
    });
    reject(new Error('Inside @rest, "type" must be followed by a colon (e.g. type:).'));
    // TypeError: Cannot read property '0' of null
  } else if (error.message === errorMsg.noRestCallError) {
    dispatch({
      type: types.GQL_ERROR,
      gqlError: 'Query must have an @rest call.',
    });
    reject(new Error('Query must have an @rest call.'));
    // ! TODO: this needs work. There are several errors that come through with the same error name and we'll have to figure out how best to parse them
    // ! fires if string after "type" is empty
  } else if (error.message.slice(0, errorMsg.noPathOrTypeError.length) === errorMsg.noPathOrTypeError) {
    dispatch({
      type: types.GQL_ERROR,
      gqlError: '@rest must have a \'path\' and \'type\' property. Please click reset to check the example for reference.',
    });
    reject(new Error('@rest must have a \'path\' and \'type\' property. Please click reset to check the example for reference.'));
  } else {
    console.log('Error in fetch: ', error);
    reject(new Error('Error in fetch: ', error));
  }
};

export default fetchErrorCheck;
