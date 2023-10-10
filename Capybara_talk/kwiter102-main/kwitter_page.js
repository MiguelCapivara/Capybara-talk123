
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


  user_name = localStorage.getItem("user_name")
  room_name = localStorage.getItem("room_name")


  function send(){
    msg = document.getElementById("msg").value;
firebase.database().ref(room_name).push({
    name:user_name,
 message:msg,
 like:0
});
}




function getData() {
  firebase
    firebase.database()
    .ref("/" + room_name)
    .on("value", function(snapshot) {
      document.getElementById("output").innerHTML = ""; 
      snapshot.forEach(function (childSnapshot) {
        childKey = childSnapshot.key;
        childData = childSnapshot.val();
        if (childKey != "purpose") {
          firebase_message_id = childKey;
          message_data = childData;
          console.log(firebase_message_id);
          console.log(message_data);
          name = message_data["name"];
          message = message_data["message"];
          like = message_data["like"];
          name_with_data =
 "<h4> " + name + "<img class='user_tick' src='tick.png'></h4>";
          message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
          like_button =
            "<button class='btn btn-warning' id=" +
            firebase_message_id +
            " value=" +
            like +
            " onclick='updateLike(this.id)'>";
           span_with_tag = "<i id='bi bi-hand-thumbs-up'> Curtidas: "+ like +"</i></button><hr>";
          row = name_with_tag + message_with_tag + like_button + span_with_tag;
          document.getElementById("output").innerHTML += row;
        }
      });
    });
}

getData();
 function updateLike(message_id) {
  console.log("clicou no botão curtir + " + message_id);
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;
  console.log(updated_likes);
  firebase.database().ref(room_name).child(message_id).update({
    like: updated_likes,
  });
}



document.getElementById("msg").value = "";
function logout() {
    localStorage.removeItem("user_name");
    localStorage.removeItem("room_name");
    window.location = "index.html";
  }