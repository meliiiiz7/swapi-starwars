const openLoadingBox = () => document.querySelector(".load-section").style.display = "flex" 
const closeLoadingBox = () => document.querySelector(".load-section").style.display = "none"


const modal = document.querySelector(".modal-section")
const boxes = document.querySelectorAll(".movie-box")
let posts = []; 
let post = {};


const getMovies = async () => {
    openLoadingBox()

    const res = await fetch(`https://swapi.dev/api/films/`)//fetch the link and makes it into javascript by using json 
    const data = await res.json()
    posts = data.results//keeps the respond from the link 
    document.querySelector("#movies").innerHTML = posts.map((post, index) => //the respond is kept in an new array through the method. 
        `<div onclick=" getTitle(${index});" class="movie-box"><h1>${post.title}</h1>
        <h1>${post.release_date}</h1>
        </div>`).join(""); //each objekt is saved in a div. for example title, that gives us every title from the link

        closeLoadingBox()

};


const getTitle = async (index) => {

    modal.style.display = "flex";
    console.log(index)


    openLoadingBox()

    // gets the title
    document.querySelector(".modal-title")
    .innerHTML = `<h1>${posts[index].title}</h1>`

            /* each box gets an clickevent.
            .sort to make in alphapetic order
            .join makes array to string
            */


            const fetchcaracters = posts[index].characters.map(post => {
                return fetch(post).then(res => res.json())
            })

            const result = await Promise.all(fetchcaracters);      
        
    closeLoadingBox()

            document.querySelector(".modal-cracters").innerHTML = result.map((post) =>  
            `<p>${post.name}</p>`
            ).sort().join("")
           


    //-----------------Next movie-------------------//

            document.querySelector("#next-film-btn").addEventListener("click", async () => {
                openLoadingBox()
                // gets title
                index += 1

                if(index < posts.length) {
                    console.log(index)
                    document.querySelector(".modal-title")
                    .innerHTML = `<h1>${posts[index].title}</h1>`
    
                    // next caracter
                    const fetchcaracters = posts[index].characters.map(post => {
                        return fetch(post).then(res => res.json())
                    })
        
                    const result = await Promise.all(fetchcaracters);      
        
                    document.querySelector(".modal-cracters").innerHTML = result.map((post) =>  
                    `<p>${post.name}</p>`
                    ).sort().join("")
                }else{
                    index = 0
                    document.querySelector(".modal-title")
                    .innerHTML = `<h1>${posts[index].title}</h1>`
    
                    // gets caracter for next
                  
                    const fetchcaracters = posts[index].characters.map(post => {
                        return fetch(post).then(res => res.json())
                    })
        
                    const result = await Promise.all(fetchcaracters);      
        
                    document.querySelector(".modal-cracters").innerHTML = result.map((post) =>  
                    `<p>${post.name}</p>`
                    ).sort().join("")
            console.log(index)

                }
                closeLoadingBox()
            })
            


    document.querySelector("#previos-film-btn").addEventListener("click", async () => {
        openLoadingBox()
        
        // gets title
        index -= 1

        if(index < posts.length && index != -1) {
            document.querySelector(".modal-title")
            .innerHTML = `<h1>${posts[index].title}</h1>`

            // gets caracters from next
            const fetchcaracters = posts[index].characters.map(post => {
                return fetch(post).then(res => res.json())
            })

            const result = await Promise.all(fetchcaracters);      

            document.querySelector(".modal-cracters").innerHTML = result.map((post) =>  
            `<p>${post.name}</p>`
            ).sort().join("")
            console.log(index)

        }else{
            index = posts.length -1
            document.querySelector(".modal-title")
            .innerHTML = `<h1>${posts[index].title}</h1>`
            console.log(index)


          
            const fetchcaracters = posts[index].characters.map(post => {
                return fetch(post).then(res => res.json())

            })

            const result = await Promise.all(fetchcaracters);      

            document.querySelector(".modal-cracters").innerHTML = result.map((post) =>  
            `<p>${post.name}</p>`
            ).sort().join("")
        }
        closeLoadingBox()
    })
               

           
            
            
        closeLoadingBox()
} 


const closeModal = () => {
    document.querySelector("#cross").addEventListener("click", () => {
        modal.style.display="none"
    })
}

window.addEventListener("load", () => {
    getMovies()
    closeModal()
})

