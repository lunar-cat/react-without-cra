import axios from 'axios';
import React, { useState, useEffect } from 'react'; // we need to import React now also in component files

const useNotes = (url) => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    axios.get(url).then(response => setNotes(response.data));
  }, [url]);
  return notes;
};

const App = () => {
  const [counter, setCounter] = useState(0);
  const [values, setValues] = useState([]);
  const notes = useNotes(BACKEND_URL);

  const handleClick = () => {
    setCounter(counter => counter + 1);
    setValues(values.concat(counter));
  };
  return (
    <div className="container">
      hello webpack {counter} clicks
      <button onClick={handleClick}>press</button>
      <div>
        {notes.length} notes on the server {BACKEND_URL}
      </div>
    </div>
  );
};

export default App;