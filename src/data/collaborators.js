



const fetchCollaborators = async () => {

  const content_body = {
    "username": "juanektbb",
    "password": "123456"
  }

  const settings = {
      method: 'POST',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(content_body)
  };


  const response = await fetch('https://api-collaap.herokuapp.com/api/users/login', settings);
  const data = await response.json();
  console.log(data)
  console.log(response.status)
}



const collaborators = {
  "juanektbb": {
    first_name: "Juan",
    last_name: "Diaz",
    image: require("Collaap/src/images/users/user-1.png"),
  },
  "ilonatuuart": {
    first_name: "Ilona",
    last_name: "Tuuder",
        image: require("Collaap/src/images/users/user-2.png"),
  },
  "another": {
    first_name: "Somebody",
    last_name: "Surname",
    image: require("Collaap/src/images/users/user-3.png"),
  }
}

export default collaborators
