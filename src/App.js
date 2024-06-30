import './App.css';
import axios from 'axios';
import {useState} from 'react';

function App() {

  const [serverURL, setServerURL] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserId, setNewUserId] = useState('');
  const [value, setValue] = useState('');
  const [response, setResponse] = useState('');

  const options = [
    {value: 'get-post-by-id', text: 'GET Post by ID'},
    {value: 'post-new-post', text: 'POST New Post'},
  ];

  const getPostById = async () => {
    try {
      const response = await axios.get(serverURL);
      setResponse('Пост получен успешно: ' + JSON.stringify(response.data));
    } catch (error) {
      setResponse('Ошибка при получении поста: ' + JSON.stringify(error));
    }
  };

  const postNewPost = async () => {
    axios.post(serverURL, {
      userName: newUserName,
      Id: newUserId,
    })
      .then(function(response) {
        setResponse('Пост успешно создан: ' + JSON.stringify(response));
      })
      .catch(function(error) {
        setResponse(
          'Ошибка при создании поста: ' + JSON.stringify(error.message));
      });
  };

  const handeSelect = (e) => {
    setValue(e.target.value);
  };

  const handlePaste = () => {
    setServerURL(
      value === 'post-new-post' ?
        'https://jsonplaceholder.typicode.com/posts' :
        'https://jsonplaceholder.typicode.com/posts?id=1',
    );
  };

  return (
    <div className="app">
      <div className="wrapper">
        <div className="inputs">
          <label>
            <p>URL запроса:</p>
            <input className="url-input" type="text" value={serverURL}
                   onChange={(e) => setServerURL(e.target.value)}/>
          </label>
          <p className="hint" onClick={handlePaste}>
            {value === 'post-new-post' ?
              'https://jsonplaceholder.typicode.com/posts'
              : 'https://jsonplaceholder.typicode.com/posts?id=1'}
          </p>
        </div>

        <div>
          <label>
            <p>Тип запроса:</p>
            <select onChange={handeSelect}>
              {options.map(option => (
                <option value={option.value}
                        key={option.value}>{option.text}</option>
              ))}
            </select>
          </label>
        </div>

        {value === 'post-new-post' ?
          <>
            <label>
              <p>Имя:</p>
              <input type="text" value={newUserName}
                     onChange={(e) => setNewUserName(e.target.value)}/>
            </label>

            <label>
              <p>ID:</p>
              <input type="text" value={newUserId}
                     onChange={(e) => setNewUserId(e.target.value)}/>
            </label>
          </> : ''
        }

        <button onClick={value === 'post-new-post' ? postNewPost : getPostById}>
          Отправить запрос
        </button>

        <div className="response">
          <p>Ответ:</p>
          <p className="response-text">
            {response}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
