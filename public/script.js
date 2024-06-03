
const form = document.querySelector('#searchForm')
form.addEventListener('submit', function(e){
    e.preventDefault();
    console.log("by enter");
    search();
})

function search(){
    console.log("searching");
    document.querySelector("#items").innerHTML = ''
    let value =  document.querySelector('#searchField')
    console.log(value.value);

    axios.get(`https://api.tvmaze.com/search/shows?q=${value.value}`)
    .then((res)=>{
        console.log("res",res);
        const result = res;
        createItems(res.data)
        
    })
    

}

function createItems(res){
    for(let item of res){
        const div = document.createElement('div')
        const name = document.createElement('p')
        name.innerText = item.show.name
        const image = document.createElement('img')
        if(item.show.image)
        image.src = item.show.image.medium
        else
        image.src = 'assets/imageNotFound.jpg'
        div.appendChild(image)
        div.appendChild(name)
        document.querySelector("#items").appendChild(div)

    }
    

}

