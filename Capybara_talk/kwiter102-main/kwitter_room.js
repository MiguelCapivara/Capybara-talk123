const firebaseConfig = {
  apiKey: "AIzaSyD10bR0KKAK-yvZXe_oYZAv3_L9S8nqeQg",
  authDomain: "projeto-c73d4.firebaseapp.com",
  databaseURL: "https://projeto-c73d4-default-rtdb.firebaseio.com",
  projectId: "projeto-c73d4",
  storageBucket: "projeto-c73d4.appspot.com",
  messagingSenderId: "1019949226462",
  appId: "1:1019949226462:web:221ccc4810834366ffe54f",
  measurementId: "G-6696PW2CWK"
};

// Initialize Firebase
// no  firebase vai  estar const  app, nos  vamos trocar para firebase.
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML =
  "Bem-vindo(a), " + user_name + "!";

function addRoom() {
  room_name = document.getElementById("room_name").value;

  firebase.database().ref("/").child(room_name).update({
    purpose: "adicionando nome da sala",
  });

  localStorage.setItem("room_name", room_name);

  window.location = "kwitter_page.html";
}

function getData() {
  firebase
    .database()
    .ref("/")
    .on("value", function (snapshot) {
      document.getElementById("output").innerHTML = "";
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        Room_names = childKey;
        console.log("Nome da sala: " + Room_names);
        row =
          "<div class='room_name' id=" +
          Room_names +
          " onclick='redirectToRoomName(this.id)' >#" +
          Room_names +
          "</div><hr>";
        document.getElementById("output").innerHTML += row;
      });
    });
}

getData();

function redirectToRoomName(name) {
  console.log(name);
  localStorage.setItem("room_name", name);
  window.location = "kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location = "index.html";
}
