
window.addEventListener('load', start)

// function othername() {
//     var input = document.getElementById("userInput").value;
//     alert(input);
// }
async function start(){
    //try catch testa
    const result = await fetch('/users')
    const users =  await result.json()
    let contant = document.getElementById("outPUt");
    for (let i = 0; i < users.length; i++) {
        console.log(users)
        let name = (users[i].name)
        let div = document.createElement("div")
        let p = document.createElement("p")
        p.innerText = name
        div.appendChild(p)
        contant.appendChild(div)
    } 
 };

async function createTodo(event){
    event.preventDefuault()

    event.target
};

function getAll(){
    console.log("getAll")
    makeRequest("/users/" + 0, "get")
    location.reload()
//  let coloectUsers = makeRequest("/users", "get") 
    
}

function getSpecific(id){
    console.log("getSpecific", id)
    makeRequest("/users/" + 0, "get")
}
function addNew(){
    var inputName = document.getElementById("userInput").value;
    let body = {
        id:"",
        name: inputName,
        isStudent: false
    }
    makeRequest("/users/", "post", JSON.stringify(body))
}
function update(id){
    let body = {
        id:"_l7otr0fg5",
        name: "Yassen",
        isStudent: true   
    }
    makeRequest("/users/_l7otr0fg5", "put", JSON.stringify(body))
}

function remove(id){
    console.log("remove", id)
    makeRequest("/users/_l7otr0fg5" , "delete")
}

async function makeRequest(url, reqMethod, body ){
    const response = await fetch(url, {
        headers: {"content-type": "application/json"}, 
        method : reqMethod,
        body: body
    })
    console.log(response)
    // location.reload()
    const data = await response.json()
    console.log(data)
    return data
}
oppenCalenderPage = () =>{
    location.href = "../calendar.html"
}