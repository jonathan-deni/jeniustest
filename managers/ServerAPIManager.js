import axios from 'axios'

export const getContactListAPI = () => {

  return (dispatch) => {
    axios({
          method: 'get',
          url: 'https://simple-contact-crud.herokuapp.com/contact',
        })
        .then((response) => {
            dispatch({
              type:'GET_CONTACT_LIST',
              payload: response.data.data[0]
            })
            // return response.data.data[0]
          });
  }

}
