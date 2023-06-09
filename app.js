//////// modal set up ////////

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

 //// fetch using AJAX //////
 //// The following code from line 39 to 50 were written in partnership with Susie Gordon. /////
  
    $.ajax({
        type: "GET",
        url: `https://api.openbrewerydb.org/v1/breweries?by_city=${city}&per_page=50`,
        })
        .then((data) => {
            console.log(data.length);          
       let list = ""; 
        for(let i = 0; i < data.length; i ++) {           
            const item = data[i];
            // console.log(item.name, item.brewery_type, item.city, item.state, item.website_url)
            
            list +=
            `<div class= "listContainer">
                <li>
                <div class= "breweryName">
                    <b>Name:&nbsp; </b> ${item.name}
                </div>
                <div class= "breweryType">
                    <b>Brewery Type:&nbsp; </b> ${item.brewery_type}
                </div>
                <div class= "breweryCity">
                    <b>City:&nbsp; </b> ${item.city}
                </div>
                <div class= "breweryState">
                    <b>State:&nbsp; </b> ${item.state}
                </div>
                <div class= "breweryWebsite">
                    <b>Website:&nbsp; </b> ${item.website_url}
                        <a href=${item.website_url}>
                            <span class="link"></span>
                </div>
                </li>
            </div>
            `;
        };    
        $ul.html(list)

  
    //   .catch(() => {
    //         $ul.html(`<div> Unable to find results in the city...</div>`)
    //     console.log(list);      
    //     })

    
    })
    })
        
    

    /// next steps 
    /// 1. figure out how to display more than 1 brewery at a time DONE 
    /// 2. use a scroll down function to display all results with a load more button DITCH
    /// 3. maybe try displaying the names only, enable click and once clicked the space on the right shows the details, (like having two columns) including the map DITCH
    /// 4. figure out how to further filter the result by brewery type with a drop-down menu next to the main search bar; All, micro, nano, regional, brewpub WILL TRY
    /// 5. make the website url clickable DONE