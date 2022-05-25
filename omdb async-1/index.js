//api----3ef2365ac4fc3ff6c01bbf688e2e701a

async function getMovie() {
    try {
      let movies = document.getElementById("Search").value;

      let res = await fetch(
        `https://www.omdbapi.com/?s=${movies}&apikey=143d98b0`
      );

      let data = await res.json();

      let movieData = data.Search;

      return movieData;

      console.log("data", movieData);

    } catch (error) {
      console.log("movie not found", error);
    }
  }

  function appendMovie(data) {
    document.getElementById("container").innerHTML = null;
    document.getElementById("error").innerHTML = null;

    data.forEach(function (el) {
      let box = document.createElement("div");
      box.setAttribute("class", "box");

      let img = document.createElement("img");
      img.setAttribute("class", "imgdiv");
      if (el.Poster === "N/A") {
        img.src ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXcQ6GPNqMq2fIf9BEZNn0BWx_JkBXeHEuOA&usqp=CAU";
      } 
      else {
        img.src = el.Poster;
      }
      let title = document.createElement("h2");
      title.innerText = el.Title;
      title.setAttribute("class", "title");

      let type = document.createElement("p");
      type.innerText = `Type: ${el.Type}`;
      type.setAttribute("class", "type");

      let year = document.createElement("p");
      year.innerText = `Year: ${el.Year}`;
      year.setAttribute("class", "year");

      let rate = Math.floor(Math.random() * (100 - 10) + 10) / 10;

      if (rate > 8.5) {

        let rating = document.createElement("p");
        rating.innerText = `IMDB Rateing ${rate}`;
        rating.setAttribute("class", "rating");

        let rec = document.createElement("label");
        rec.innerText = "Recommended";
        rec.setAttribute("class","rec");

        box.append(img, title, rating, rec, type, year);
        container.append(box);
      }
      else{
        let rating = document.createElement("p");
        rating.innerText = `IMDB Rateing ${rate}`;
        rating.setAttribute("class", "rating");
  
        box.append(img, title, rating, type, year);
        document.getElementById("container").append(box);
      }
     
    });
  }



let timerid;
function debounce(func,delay){
    if(timerid){
       clearTimeout() 
    }
    else{
     setTimeout(function(){
          
       func();
       
    },delay);
    }
}

async function main() {
    try {
      let data = await getMovie();

      console.log(data);

      if (data === undefined) {

        document.getElementById("container").innerHTML = null;

        document.getElementById("error").innerHTML = null;

        let err = document.createElement("h2");
        err.innerText = "Movie Not Found!";
        err.setAttribute("class","err")

        let img = document.createElement("img");
        img.src ="https://media.istockphoto.com/vectors/page-not-found-error-with-film-flap-design-vector-id1265221960?k=20&m=1265221960&s=170667a&w=0&h=jCITUlo5a7s5fue3XrX2WB8FOK9VnbaWeLCHB8Ovj-c=";
        
        document.getElementById("error").append(err, img);

        return false;
      }
       appendMovie(data);
      
    } catch (error) {
      console.log("error:", error);
    }
  }



 

