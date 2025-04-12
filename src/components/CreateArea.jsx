import React, { useState } from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  const [isExpanded, setIsExpanded] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {

    if (!note.title.trim() || !note.content.trim()) {
      alert("Title and content cannot be empty!");
      return;
    }
    
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  function expandTexterea(){
    setIsExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && 
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        }
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded? 3: 1}
          onFocus={expandTexterea}
        />
      
        <Zoom in={isExpanded}>
        <Fab onClick={submitNote}>
          <AddCircleIcon />
        </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
