// FROM 2-65 LINES OF CODE IS FOR INSERTING AND STORING NEW CARD IN LOCAL STORAGE

const taskContainer = document.querySelector(".task__container");
// TO SAVE THE DATA IN THE LOCAL STORAGE
let globalStore = [];   //ARRAY OF OBJECTS
console.log(taskContainer);

// CODE FOR NEW CARD DOM MANIPULATION 
const generateNewCard = (taskData) =>  
`
<div class="col-sm-12 col-md-6 col-lg-4  ">
<div class="card ms-2 me-2"> 
    <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt" ></i></button>
        <button type="button" class="btn btn-outline-danger"  id= ${taskData.id} onclick="deleteCard.apply(this,arguments)" ><i class="fas fa-trash-alt" id= ${taskData.id}   onclick="deleteCard.apply(this,arguments)"  ></i></button>    
    </div>
    <div class="card-body">
        <img src="${taskData.imageUrl}" class="card-img-top " alt=".....">
        <h5 class="card-title mt-2 fw-bold text-primary ">${taskData.taskTitle}</h5>
        <p class="card-text"> ${taskData.taskDescription}  </p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
</div>
</div>
`
;

const loadInitialCardData = () => {

// OBJECT TO STORE NEW CARD DATA IN LOCAL STORAGE 
const getCardData = localStorage.getItem("tasky");

// CONVERTING IT INTO NORMAL OBJECT
const {cards} = JSON.parse(getCardData);

// looping over the array of task objects to create HTML CARD
cards.map((cardObject) => {
    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject));

} 
)
};


// OBJECT FOR SAVING NEW CARD
const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdescription").value
    }


 

// NEW CARD INSERTION INDICATOR
taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData));


// STORING THE NEW CARD IN LOCAL STORAGE CODE
globalStore.push(taskData);
localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
};


// DELETE FUNCTION IMPLEMENTATION

const deleteCard = (event) => {
    event = window.event;
    const targetID = event.target.id;
    const tagname = event.target.tagName;

    globalStore = globalStore.filter((cardObject) => cardObject.id!==targetID);
    localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));

if(tagname === "BUTTON") {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
} else {
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
}
};