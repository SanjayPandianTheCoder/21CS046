async function getRequest(){
    await fetch("http://20.244.56.144/test/register", {
        method: "POST",
        body:{
            "name": "Sanjay Pandian M",
            "rollno" : "21cs046",
            "email" : "sanjaypandianthecoder@gmail.com",
        },
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
        .then((response) => response.json())
        .then((json) => console.log(json));
}