const cl=console.log;

const addMovie = document.getElementById('addMovie')
const Moviebtnadd = document.getElementById('moviebtnAdd')
const Moviebtnupdate = document.getElementById('Moviebtnupdate')
const movieName = document.getElementById('movieName')
const movieImg = document.getElementById('movieImg')
const movieDesciption = document.getElementById('movieDesciption')
const movieRating = document.getElementById('movieRating')
const backDrop = document.getElementById('backDrop')
const MovieForm = document.getElementById('MovieForm')
const ModelClose = document.querySelectorAll('.ModelClose')
const movieContainer = document.getElementById
('movieContainer')
const closeForm = document.querySelectorAll('.closeForm')

// let movieArr=[
//     {
//     movieName: "Avengers: Endgame",
//     movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmHCyPBcZ1OGh_lbJoQT62XPein4DJZ2BNQi5dQ167zkFl4rtMskBjpPpO&s=10",
//     movieRating: 8,
//     movieDesciption: "The Avengers unite to reverse the damage caused by Thanos.",
//     movieId:"01"
//   },
//   {
//     movieName: "Interstellar",
//     movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOPgidvYUNpyHJ_NnDVSAJXILZ-AfmaS4jP17lVzN5JH-Wk1AbKbDfkNsd&s=10",
//     movieRating: 7,
//     movieDesciption: "A team of astronauts travels through space to find a new home for humanity.",
//     movieId:"02"
//   },
//   {
//     movieName: "Inception",
//     movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6R0GGk5xWkNW5Yr8ZB5gu8rfB3GFYRJEQr0iLrgSpD3LSZeTM2Jj-Kr0&s=10",
//     movieRating: 9,
//     movieDesciption: "A skilled thief enters people's dreams to steal valuable information.",
//     movieId:"03"
//   },
//   {
//     movieName: "The Lion King",
//     movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJJ3yjTZxJAbLl-58jmxRKDRJO2vhIt0D3atR46HlYW-H9awvgjq1AT1FF&s=10",
//     movieRating: 6,
//     movieDesciption: "A young lion learns to accept his responsibility as the future king.",
//     movieId:"04"
//   },
//   {
//     movieName: "3 Idiots",
//     movieImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6KCRFzEkS_bx91fbxqnzCtkz5YDEcgnvrvlFGvnGE_aWzEaDDPSDZM7M&s=10",
//     movieRating: 5,
//     movieDesciption: "Three friends experience friendship, education, and the challenges of college life.",
//     movieId:"05"
//   }
// ];

// localStorage.setItem('movieArr', JSON.stringify(movieArr))
let movieArr = JSON.parse(localStorage.getItem('movieArr')) || []

function setRating(rating){
    if(rating >5 && rating <=10){
        return "badge-success"
    }else if(rating >=3 && rating <=5){
        return "badge-warning"
    }else{
        return "badge-danger"
    }
}

//read

function oncreateMovie(arr){
    let result = "";
    arr.forEach(ele=>{
        result +=`<div class="col-md-3 mb-3" id="${ele.movieId}">
                <div class="card movieCard">
                    <div class="card-header d-flex justify-content-between">
                        <h4 class="movieTitle">${ele.movieName}</h4>
                        <h5><span class="badge ${setRating(ele.movieRating)}">${ele.movieRating}</span></h5>
                    </div>
                    <div class="card-body pt-0">
                        <figure>
                            <img src="${ele.movieImg}" alt="movie">
                            <figcaption>
                                <h5>${ele.movieName}</h5>
                                <p>${ele.movieDesciption}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button onclick="editMovie(this)" class="btn btn-sm net-sec-btn" id="editMovibtn">Edit</button>
                        <button onclick="deleteMovie(this)" class="btn btn-sm net-pri-btn" id="deleteMovibtn">Remove</button>
                    </div>
                </div>
            </div>`
    });
    movieContainer.innerHTML = result;
}
oncreateMovie(movieArr)

//create

function onAddMovie(eve){
    eve.preventDefault()
    let MovieObj={
        movieName:movieName.value,
        movieImg:movieImg.value,
        movieRating:movieRating.value,
        movieDesciption:movieDesciption.value,
        movieId:Date.now().toString(),
    }
    movieArr.push(MovieObj)
    localStorage.setItem('movieArr', JSON.stringify(movieArr))
    MovieForm.reset()
    onMovietoggle()

    let newCard = document.createElement('div')
    newCard.className = 'col-md-3 mb-3'
    newCard.innerHTML = 
               `<div class="card movieCard" id="${MovieObj.movieId}">
                    <div class="card-header d-flex justify-content-between">
                        <h4 class="movieTitle">${MovieObj.movieName}</h4>
                        <h5><span class="badge badge-success">${MovieObj.movieRating}</span></h5>
                    </div>
                    <div class="card-body pt-0">
                        <figure>
                            <img src="${MovieObj.movieImg}" alt="movie">
                            <figcaption>
                                <h5>${MovieObj.movieName}</h5>
                                <p>${MovieObj.movieDesciption}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button onclick="editMovie(this)" class="btn btn-sm net-sec-btn" id="editMovibtn">Edit</button>
                        <button onclick="deleteMovie(this)" class="btn btn-sm net-pri-btn" id="deleteMovibtn">Remove</button>
                    </div>
            </div>`

            movieContainer.append(newCard);

        Swal .fire({
        title:"card created successfully !!!",
        icon:"success",
        timer:3000
    })
}

//edit

function editMovie(ele){
    let editId = ele.closest('.movieCard').id;
    cl(editId);
    let editObj = movieArr.find(r=>r.movieId === editId)
    localStorage.setItem('editId', editId)
    onMovietoggle()
    movieName.value = editObj.movieName;
    movieImg.value = editObj.movieImg;
    movieDesciption.value = editObj.movieDesciption;
    movieRating.value = editObj.movieRating;

    Moviebtnadd.classList.add('d-none')
    Moviebtnupdate.classList.remove('d-none')

}

//update

function onupdateMovie(){
    let updateId = localStorage.getItem('editId');
    let updateObj={
        movieName:movieName.value,
        movieImg:movieImg.value,
        movieDesciption:movieDesciption.value,
        movieRating:movieRating.value,
        movieId:updateId
    };
    let getIndex = movieArr.findIndex(i=>i.movieId === updateId)
    movieArr[getIndex]=updateObj;
    localStorage.setItem('movieArr', JSON.stringify(movieArr))
    let movieCard = document.getElementById(updateId);
    movieCard.innerHTML = `<div class="card movieCard" id="${updateId}">
                    <div class="card-header d-flex justify-content-between">
                        <h4 class="movieTitle">${updateObj.movieName}</h4>
                        <h5><span class="badge ${setRating(updateObj.movieRating)}">${updateObj.movieRating}</span></h5>
                    </div>
                    <div class="card-body pt-0">
                        <figure>
                            <img src="${updateObj.movieImg}" alt="movie">
                            <figcaption>
                                <h5>${updateObj.movieName}</h5>
                                <p>${updateObj.movieDesciption}</p>
                            </figcaption>
                        </figure>
                    </div>
                    <div class="card-footer d-flex justify-content-between">
                        <button onclick="editMovie(this)" class="btn btn-sm net-sec-btn" id="editMovibtn">Edit</button>
                        <button onclick="deleteMovie(this)" class="btn btn-sm net-pri-btn" id="deleteMovibtn">Remove</button>
                    </div>
                </div>`
                onMovietoggle();
                Moviebtnadd.classList.remove('d-none');
                Moviebtnupdate.classList.add('d-none');

        Swal .fire({
        title:"card updated successfully !!!",
        icon:"success",
        timer:3000
    })

}

function onMovietoggle(){
    backDrop.classList.toggle('active');
    MovieForm.classList.toggle('active');
    MovieForm.reset()
}

addMovie.addEventListener('click', onMovietoggle)
ModelClose.forEach(ele=>{
    ele.addEventListener('click', onMovietoggle)


})

//delete

function deleteMovie(ele){
    let removeId = ele.closest('.movieCard').id;
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    let getIndex = movieArr.findIndex(d=>d.movieId === removeId)
        movieArr.splice(getIndex, 1)
        localStorage.setItem('movieArr', JSON.stringify(movieArr));
        ele.closest('.movieCard').parentElement.remove();
    Swal.fire({
    title: "Deleted!",
    text: "Your file has been deleted.",
    icon: "success"
  });
  }

});

    }


MovieForm.addEventListener('submit', onAddMovie)
Moviebtnupdate.addEventListener('click', onupdateMovie)
