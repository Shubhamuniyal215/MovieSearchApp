
const form = document.querySelector('#searchForm')
form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log("by enter");
    search();
})

function search() {
    console.log("searching");
    document.querySelector("#items").innerHTML = ''
    let value = document.querySelector('#searchField')
    console.log(value.value);

    axios.get(`https://api.tvmaze.com/search/shows?q=${value.value}`)
        .then((res) => {
            console.log("res", res.data);
            if (res.data.length > 0)
                createItems(res.data)
            else
                noResultFound()

        })


}

function createItems(res) {
    for (let item of res) {
        const div = document.createElement('div')
        const div2 = document.createElement('div')

        div2.style.display = 'flex'
        div2.style.justifyContent = 'space-between'
        div.className = 'itemClass'
        div2.className = 'itemDetailsClass'
        const name = document.createElement('p')
        let premiered = item.show.premiered
        premiered = premiered.slice(0,premiered.indexOf('-'))
        console.log("premiered  ",premiered);
        // name = name + " ("+premiered + ") "


        const score = document.createElement('p')
        const scoreNew = (item.score * 10).toFixed(2)
        name.innerText = item.show.name + " ("+premiered + ") "
        score.innerText = scoreNew;
        score.style.color = 'white'
        if (scoreNew >= 7) {
            score.style.color = 'limegreen'
        }
        else if (scoreNew >= 4) {
            score.style.color = 'yellow'
        }
        else {
            score.style.color = 'red'
        }

        const image = document.createElement('img')
        // image.style.marginTop = '20px'
        image.style.borderRadius = '10px 10px 0px 0px'
        if (item.show.image)
            image.src = item.show.image.medium
        else
            image.src = 'assets/imageNotFound.jpg'
        div.appendChild(image)
        div2.appendChild(name)
        div2.appendChild(score)
        div.appendChild(div2)
        document.querySelector("#items").appendChild(div)

    }


}
function noResultFound() {
    console.log("noResultFound");
    const div = document.createElement('div')
    const name = document.createElement('p')
    name.innerText = 'No Results Found'
    div.appendChild(name)
    document.querySelector("#items").appendChild(div)




}

