//THIS FUNCTION GETS ALL NOTES AND APPENDS THEM TO THE DOM
fetch("http://localhost:3000/notes")
  .then(response => {
    return response.json();
  })
  .then(response => {
    console.log(response);

    response.map(el => {
      let newNote = document.createElement("div");
      console.log(el);
      newNote.innerHTML = `<div style="border:1px solid black" id=${
        el._id
      }><div><label>Title: </label>${el.title}</div><div><label>Text: </label>${
        el.text
      }</div><button onclick="deleteNote(this.parentNode)" id="delete">Delete</button><button onclick="triggerEdit(this.parentNode)" id="edit">Edit</button></div>`;
      document.getElementById("all").appendChild(newNote);
    });
  });

//**********************************************************************************************************************************
//THIS FUNCTION SENDS A POST REQUEST

document.getElementById("add").addEventListener("click", () => {
  //create and object to send
  let data = {
    title: document.getElementById("newTitle").value,
    text: document.getElementById("newText").value
  };
  console.log(JSON.stringify(data));

  fetch("http://localhost:3000/notes", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  }).catch(error => console.error("Error:", error));
});

//**********************************************************************************************************************************
//THIS FUNCTION TRIGGERS EDIT FIELD
function triggerEdit(container) {
  let editBox = document.createElement("div");
  editBox.innerHTML = `<input placeholder="Edited title..."></input><div><textarea placeholder="Edited text..."></textarea></div><button onclick="saveNote(this.parentNode)">Save</button>`;
  container.appendChild(editBox);
}

//THIS FUNCTION SAVES EDITED NOTE
function saveNote(note) {
  console.log(note.parentNode.id);
  let edited = {
    title: note.getElementsByTagName("input")[0].value,
    text: note.getElementsByTagName("textarea")[0].value
  };

  fetch("http://localhost:3000/notes/" + note.parentNode.id, {
    method: "PUT",
    body: JSON.stringify(edited),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => {
    note.remove();
  });
}

//**********************************************************************************************************************************
//DELETE

function deleteNote(note) {
  console.log(note);
  fetch(`http://localhost:3000/notes/${note.id}`, {
    method: "DELETE"
  }).then(response => {
    note.remove();
  });
}
