// variables

const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");

const apiURL = "https://api.lyrics.ovh";

// get input value

form.addEventListener("submit", e => {
    e.preventDefault();
    let searchValue = search.value.trim();

    if(!searchValue){
        alert("Nothing to search");
    }
    else{
        beginSearch(searchValue);
    }
})

// create search function

async function beginSearch(searchValue){
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
    const data = await searchResult.json();
    //console.log(data);
    displayData(data);
}

//display search result

function displayData(data){
    result.innerHTML = `
    <table class="songs" cellspacing="20px">
        ${data.data.map(song => `   
                                    <tr>
                                        <td> <strong> ${song.artist.name}</strong> </td>
                                        <td> ${song.title} </td>
                                        <td> <span data-artist="${song.artist.name}"
                                            data-songtitle="${song.title}">Get Lyrics </span>
                                        </td>
                                    </tr>
                                    
                                    
                                    `
                        )
            .join('')}
    </table>
    `;
}

// get lyrics function

result.addEventListener("click", e => {
    const clickedElement = e.target;

    // check get lyrics button

    if(clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songtitle');

        getLyrics(artist, songTitle);
    }
})

async function getLyrics(artist, songTitle){
    const response = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);

    const data = await response.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');

    result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
    <p>${lyrics}</p>`

}

// 
// <li>
                                    //     <div>
                                    //     <strong> ${song.artist.name}</strong> - ${song.title}
                                    //     </div>
                                    //     <span data-artist="${song.artist.name}"
                                    //     data-songtitle="${song.title}">Get Lyrics </span>
                                    // </li>