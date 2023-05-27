const $searchForm = $("form");

$searchForm.on("submit", event => {
    event.preventDefault();
    console.log(event.target);
    const formData = new FormData(event.target);
    // generate data from the target object
    console.log(formData);
    // get the value from the generated data where the namevalue is "pokemon" (on the form)
    // toLowerCase allows items to be searched regardless of alphabet casing
    const breweries = formData.get("breweries").toLowerCase();
    console.log(formData.get('breweries'));
    
    const url = `https://api.openbrewerydb.org/v1/breweries/search?query={search}`

    ////// fetch using AJAX ///////
    $.ajax(url)
        .then((data) => {
            console.log(data);
            console.log(data.filter((item, index) => {
                console.log(index, item);
                console.log({name: item.name, city: item.city, state: item.state, type: item.brewery_type, website: item.website_url})
            }))
        })
    ///// fetch using JSON ///////
//     const $result = $(".result")

//     // empty out the input field
//     $('[name="breweries"]')[0].value = "";
//     $result.html('<div>Loading...</div>') // loading comment 

//     fetch(url)
//         .then(response => {
//             return response.json();
//         })
//         .then(data => {
//             $result.html(
//                 `<div>
//                     <b>name:&nbsp; </b> ${data.name}
//                 </div>
//                 <div>
//                     <b>brewery_type :&nbsp; </b> ${data.brewery_type}
//                 </div>
//                 <div>
//                     <b>city:&nbsp; </b> ${data.city}
//                 </div>
//                 <div>
//                     <b>state:&nbsp; </b> ${data.state}
//                 </div>
//                 <div>
//                     <b>website_url:&nbsp; </b> ${data.website_url}
//                 </div>
//             `)
//         })
//         .catch(() => {
//             $result.html(`<div> there was an error...</div>`)
//         })
});