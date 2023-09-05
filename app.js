const express = require("express");
const fs = require("fs");

const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
let userName;
console.log("userName", userName, "zzzzzzzzzzzzzzzzzzzzzzzzzz");
app.get("/login", (req, res, next) => {
  res.send(`
      <form id="loginForm"   action="/" method = "GET" >
        <input type="text" id="username" name="username" placeholder="username">
        <input type="text" name="password" placeholder="password">
        <button type="submit">Submit</button>
      </form>
      <script>
        document.getElementById("loginForm").addEventListener("submit", function(event) {
          const username = document.getElementById("username").value;
          if(username.trim().length>0){
            localStorage.setItem("username", username);
          }
        });
      </script>
    `);
  return;
});

app.get("/", (req, res, next) => {
  const { username } = req.query;
  if (username) {
    userName = username;
  }
  fs.readFile("./message.text", "utf-8", (err, allmessage) => {
    res.send(`
        <p>${allmessage ? allmessage : ""}</p>
      <form action = "/add-message" method = "POST" id = messageForm >
        <input type="text" id="messageInput"  name = "message">
        <button  type="submit">SEND</button>
    </form>
    <script>
    const messageInput = document.getElementById("messageInput");
    const messageForm = document.getElementById("messageForm");
    messageForm.addEventListener('submit',(e)=>{
    const message = messageInput.value;
    const userName = localStorage.getItem('username')
    if(!userName&&!userName.trim().length>0)return
    if(!message&&!message.trim().length>0)return
    localStorage.setItem(userName,message)
    console.log(message)
    })
    </script>`);
    return;
  });
});

app.post("/add-message", (req, res) => {
  const { message } = req.body;
  const data = `${userName}:${message}`;
  fs.readFile("./message.text", "utf-8", (err, text) => {
    fs.writeFile("./message.text", text + data, () => {
      console.log(req.query, req.body);
      res.redirect("/");
      res.end();
      return;
    });
  });
});

// app.get("/", (req, res) => {
//   res.send(
//     `<form action = "/add-product" method = "POST" ><input type = "text" name="product" ><input type = "text" name="size" ><button type = "submit" >send</button></form>`
//   );
//   return;
// });

const port = 4000;
app.listen(port, () => {
  console.log(`app running on ${port}`);
});
