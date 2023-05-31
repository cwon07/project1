//////// pop up window set up ////////

window.addEventListener("load", function(){
    setTimeout(
        function open(event) {
            document.querySelector(".popup").style.display = "block";
        },
        500
    )
});

document.querySelector("#close").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
});


//////// main app set up //////////

const $searchForm = $("form");

$searchForm.on("submit", event => {
    // prevents the site from refreshing
    event.preventDefault();
  
    // generates data from the target object
    const formData = new FormData(event.target);
  
    // get the value from the generated data where the name value is "breweries" (on the form)
    // toLowerCase allows items to be searched regardless of alphabet casing
    const city = formData.get("city").toLowerCase();

    const $ul = $("ul.list")
   
    // clears the search bar
    $('[name="city"]')[0].value = "";

    ////// fetch using AJAX //////
    // const addSquare = () => {
    //     const square = document.createElement("div")
    //     square.classList.add("square")
    //     square.innerHTML =  `<li>
    //     <div class = "brewery-list">
    //         <div>
    //             <b>Name:&nbsp; </b> ${item.name}
    //         </div>
    //         <div>
    //             <b>Brewery Type:&nbsp; </b> ${item.brewery_type}
    //         </div>
    //         <div>
    //             <b>City:&nbsp; </b> ${item.city}
    //         </div>
    //         <div>
    //             <b>State:&nbsp; </b> ${item.state}
    //         </div>
    //         <div>
    //             <b>Website:&nbsp; </b> ${item.website_url}
    //         </div>
    //     </div>
    //     </li>`;
    //     const container = document.querySelector(".list-container")
    //     container.append(square)
    // }
    
    $.ajax({
        type: "GET",
        url: `https://api.openbrewerydb.org/v1/breweries?by_city=${city}&per_page=50`,
        })
        .then((data) => {
            console.log(data.length)
            // addSquare(data.length)
       let list = ""; 
        for(let i = 0; i < data.length; i ++) {
            const item = data[i]
            console.log(item.name, item.brewery_type, item.city, item.state, item.website_url)
            list +=

            `<li>
            <div class = "brewery-list">
                <div>
                    <b>Name:&nbsp; </b> ${item.name}
                </div>
                <div>
                    <b>Brewery Type:&nbsp; </b> ${item.brewery_type}
                </div>
                <div>
                    <b>City:&nbsp; </b> ${item.city}
                </div>
                <div>
                    <b>State:&nbsp; </b> ${item.state}
                </div>
                <div>
                    <b>Website:&nbsp; </b> ${item.website_url}
                </div>
            </div>
            </li>`;
        };          

        $ul.html(list)
        
        
        .catch(() => {
            $ul.html(`<div> Unable to find results in the city...</div>`)
        console.log(list);
      
        })
    })
    });
        
    

     //// next steps - 1. figure out how to display more than 1 brewery at a time; use a scroll down function to display all results with a load more button
    //// maybe try displaying the names only, enable click and once clicked the space on the right shows the details, (like having two columns) including the map 
    /// figure out how to further filter the result by brewery type with a drop-down menu next to the main search bar; All, micro, nano, regional, brewpub