const users = "http://localhost:3000/users"
const movies = "http://localhost:3000/movies"
const series = "http://localhost:3000/series"
const main = document.querySelector('main')
const header = document.querySelector('header')
const userNumber = []
logIn()

function logIn() {
    console.log(userNumber)
    geekFlixImg()
    const loginPlease = document.createElement('h2')
    loginPlease.id = "loginplease"
    loginPlease.innerHTML = "Log in your Geekflix Account"
    const userName = document.createElement('input')
    userName.id = "username"
    userName.placeholder="Enter Username"
    const password = document.createElement('input')
    password.id = "password"
    password.type ="password"
    password.placeholder ="Enter password"
    const logIn = document.createElement('button')
    logIn.innerText = "Log in"
    logIn.id = "login"
    logIn.addEventListener('click', ()=>{printUsers()})
    main.appendChild(loginPlease)
    main.appendChild(userName)
    main.appendChild(password)
    main.appendChild(logIn)
}

function geekFlixImg(){
    const nav = document.createElement('nav')
    header.appendChild(nav)
    const imgnav = document.createElement('img')
    imgnav.src = "geekflix.png"
    nav.appendChild(imgnav)
}

function printUsers(){
    const who = document.createElement('h1')
    who.innerText = "Who is watching?"
    main.appendChild(who)
    fetch(users).then( users => users.json()).then( users=>{
        const divUsers = document.createElement('section')
        main.appendChild(divUsers)
        for(let i=0; users.length>i;i++){
            
            const divUser = document.createElement('div')
            const user = document.createElement('img')
            user.src= users[i].image
            user.height = 300;
            user.addEventListener('click', ()=>{
                loadPage()
                createUser([i])
            })
            user.id = "usersImg"
            
            const username = document.createElement('h2')
            username.innerHTML = users[i].name
            
            divUser.appendChild(user)
            divUser.appendChild(username)
            divUsers.appendChild(divUser)
            divUser.id = "user"
        }
        divUsers.id = "users"
    })

    const options = document.createElement('button')
    options.innerText = "Manage profiles"
    options.id = "options"
    main.appendChild(options)
}


function loadPage(){
    cleanPage()
    createUser()
    pageOutline()
}

function createUser(number){
    const userCorner = document.createElement('img')
    fetch(users).then( users => users.json()).then( users=>{
    userCorner.src = users[number].image
    userCorner.height = 50
    userCorner.id = "usercorner"
    header.appendChild(userCorner)
    userCorner.addEventListener('mouseover', ()=>{
        const miniMenu = document.createElement('div')
        miniMenu.id = "minimenu"
        const optionsMenu = document.createElement('p')
        optionsMenu.textContent = users[number].name
        const logOutMenu = document.createElement('p')
        logOutMenu.innerText = "Log Out"
        logOutMenu.addEventListener('click', ()=>{
            document.querySelector('header').remove()
            cleanPage()
            geekFlixImg()
            printUsers()
        })
        miniMenu.appendChild(optionsMenu)
        miniMenu.appendChild(logOutMenu)
        header.appendChild(miniMenu)
    })
})
}
function pageOutline(){
    navBar()
    /* recomendation()
     */
    homePage()
}
function cleanPage(){
    main.innerHTML = ""
}
function navReset(){
  const navs = document.querySelectorAll('li')
  for(let i=0; navs.length>i; i++){
      navs[i].remove()
  } 
}
function navBar(){
    const nav = document.querySelector('nav')
    const home = document.createElement('li')
    home.innerText = "Home"
    home.addEventListener("click", ()=>{
        navReset()
        loadPage()

    })
    const tv = document.createElement('li')
    tv.innerText= "Tv Series"
    tv.addEventListener("click", ()=>{
        navReset()
        cleanPage()
        navBar()
        homePageSeries()
        

    })
    const movies = document.createElement('li')
    movies.innerText= "Movies"
    movies.addEventListener("click", ()=>{
        navReset()
        loadPage()

    })
    const imgSearch = document.createElement('img')
    imgSearch.id = "imgSearch"
    imgSearch.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABRElEQVRIS72VYVXDQBCEZxSABFAAdQASUAAOACetA3CAA3BAHdA6AAXDG95e39Fmc+lL0vvXNLff3NzuhJh5ceb6SAGSLgA8ArgBcB1C1gA+AKxIboaI6wRIWkbxvhpLks8tyAFAklVexcZXAC7kZ5DkkzwBuC8nIrnog/wDVMp/bE0pvF8gQLbqLOwytHPtAOH5V7y1yIqXKgH5jN+X2Z3UgOK7LzBVVMuU9BJ2pXtqQPG+qb7jFOvsLmqAvJHkUbMhqXffSQFjLNqS9GAerJNeshXM16YxqaVVvwHcNgbtHcD54EGrWq+OCve5e7yOCgfgQ2W2/7MYi8rvYG+AhoTdKpLWuZVCWnHtiXZcl/DbAniLANxIskXOpBRy1FB1WdCCjAZEc9QnuSPpU/6tSQAVxBG/Kz4poPk9yF4Y+3wyizIhv0QaqBmi47TaAAAAAElFTkSuQmCC"
    const search = document.createElement('input')
    search.id = "movieSearch"
    search.addEventListener('input', ()=>{
        cleanPage()

        let movieSearch = search.value
       
        console.log(movieSearch)
        fetch("http://localhost:3000/movies").then( movies=> movies.json()).then( movies =>{
        let filteredMovies = movies.filter( movieList=> movieList.title.toLowerCase().includes(movieSearch.toLowerCase()))
        fetch("http://localhost:3000/series").then( series=> series.json()).then( series =>{
        let filteredSeries = series.filter( SeriesList=> SeriesList.title.toLowerCase().includes(movieSearch.toLowerCase()))
        console.log(filteredMovies)
        console.log(filteredSeries)
        let filteredTotal = [...filteredMovies, ...filteredSeries]
        if(movieSearch){
        const searchFor = document.createElement('p')
        searchFor.id = "results"
        searchFor.textContent = "Your search " + '"' + movieSearch +'"' + " returned " + (filteredTotal.length) + " result(s)."
        main.appendChild(searchFor)
        }
        const moviesSection = document.createElement('section')
        moviesSection.id = "moviesSection"
        for(let i=0; filteredTotal.length>i;i++){

            const row = document.createElement('div')
            const imageMovie = document.createElement('img')
            const title = document.createElement('h1')
            const plot = document.createElement('p')
            
            imageMovie.src = filteredTotal[i].image
            imageMovie.addEventListener('mouseover', ()=>{
                title.textContent = filteredTotal[i].title
                row.appendChild(title)
                plot.textContent = filteredTotal[i].plot
                row.appendChild(plot)
                
            })
            imageMovie.addEventListener('mouseout', ()=>{
                title.innerHTML = ""
                plot.innerText = ""
                
            })
            row.appendChild(imageMovie)
            
            moviesSection.appendChild(row)
            row.addEventListener("click", ()=>{
                cleanPage()
                playMovie()
            })

        }
        main.appendChild(moviesSection)
        })
    })
    })
    nav.appendChild(home)
    nav.appendChild(tv)
    nav.appendChild(movies)
    nav.appendChild(imgSearch)
    nav.appendChild(search)
}

function homePage(){
    fetch(movies).then( movies=> movies.json()).then( movies =>{
        const moviesSection = document.createElement('section')
        moviesSection.id = "moviesSection"
       
        for(let i = 0; movies.length>i; i++){
            const row = document.createElement('div')
            const imageMovie = document.createElement('img')
            const title = document.createElement('h1')
            const plot = document.createElement('p')
            
            imageMovie.src = movies[i].image
            imageMovie.addEventListener('mouseover', ()=>{
                title.textContent = movies[i].title
                row.appendChild(title)
                plot.textContent = movies[i].plot
                row.appendChild(plot)
                
            })
            imageMovie.addEventListener('mouseout', ()=>{
                title.innerHTML = ""
                plot.innerText = ""
                
            })
            row.appendChild(imageMovie)
            
            moviesSection.appendChild(row)
            row.addEventListener("click", ()=>{
                cleanPage()
                playMovie()
            })

        }
        main.appendChild(moviesSection)
        
    })
}

function playMovie(){
    const divPlay = document.createElement('article')
    main.appendChild(divPlay)
}

function homePageSeries(){
    fetch(series).then( movies=> movies.json()).then( movies =>{
        const moviesSection = document.createElement('section')
        moviesSection.id = "moviesSection"
       
        for(let i = 0; movies.length>i; i++){
            const row = document.createElement('div')
            const imageMovie = document.createElement('img')
            const title = document.createElement('h1')
            const plot = document.createElement('p')
            
            imageMovie.src = movies[i].image
            imageMovie.addEventListener('mouseover', ()=>{
                title.textContent = movies[i].title
                row.appendChild(title)
                plot.textContent = movies[i].plot
                row.appendChild(plot)
                
            })
            imageMovie.addEventListener('mouseout', ()=>{
                title.innerHTML = ""
                plot.innerText = ""
                
            })
            row.appendChild(imageMovie)
            
            moviesSection.appendChild(row)
            row.addEventListener("click", ()=>{
                cleanPage()
                playMovie()
            })

        }
        main.appendChild(moviesSection)
        
    })
}



