//////// pop up window set up ////////

// window.addEventListener("load", function(){
//     setTimeout(
//         function open(event) {
//             document.querySelector(".popup").style.display = "block";
//         },
//         1000
//     )
// });

// document.querySelector("#close").addEventListener("click", function(){
//     document.querySelector(".popup").style.display = "none";
// });


//////// main app set up //////////

const $searchForm = $("form");

$searchForm.on("submit", event => {
    event.preventDefault();
    console.log(event.target);
    const formData = new FormData(event.target);
    // generate data from the target object
    console.log(formData);
    // get the value from the generated data where the name value is "breweries" (on the form)
    // toLowerCase allows items to be searched regardless of alphabet casing
    const breweries = formData.get("breweries").toLowerCase();
    console.log(formData.get('breweries'));
    
    const url = `https://api.openbrewerydb.org/v1/breweries/?by_city=${breweries}`

    console.log(url)

    const $mainResult = $(".mainResult")

    $('[name="breweries"]')[0].value = "";

    ////// fetch using AJAX ///////
    $.ajax(url)
        .then((data) => {
            console.log(data.filter((item) => {
        $mainResult.html(
            `<div>
                <b>Name:&nbsp; </b> ${item.name}
            </div>
            <div>
                <b>Brewery Type:&nbsp; </b> ${item.brewery_type}
            <div>
                <b>City:&nbsp; </b> ${item.city}
            </div>
            <div>
                <b>State:&nbsp; </b> ${item.state}
            <div>
                <b>Website:&nbsp; </b> ${item.website_url}
            `
            )
            }))
        })
        .catch(() => {
            $mainResult.html(`<div> Unable to find the city...</div>`)
        })

    });
