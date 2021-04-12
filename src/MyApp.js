import React, {useState, useEffect} from 'react';
import Table from './Table';
import Form from './Form';
import axios from 'axios';

function MyApp() { 
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetchAll().then( result => {
      if (result)
        setCharacters(result);
    });
  }, []);


  async function makePostCall(person) {
    try {
      const response = await axios.post('http://localhost:5000/users', person);
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }

  }

  async function makeDeleteCall(id) {
    try {
      const response = await axios.delete('http://localhost:5000/users/' + id);
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  function updateList(person) {
    makePostCall(person).then( result => {
        if (result)
          person['id'] = result.data; 
          console.log(person)
          setCharacters([...characters, person]);
      });
  }


  async function fetchAll()
  {
    try {
      const response = await axios.get('http://localhost:5000/users');
      return response.data.users_list;
    }
    catch (error){
      console.log(error);
      return false;
    }
  }



  function removeOneCharacter (id) {
    makeDeleteCall(id).then( result => {
        if (result)
        {
          const updated = characters.filter((characters) => {
            return characters.id !== id
          });
          setCharacters(updated);
        }
      });
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList}/>
    </div>
  );
}   

export default MyApp;