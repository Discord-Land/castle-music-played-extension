window.addEventListener ("load", getCurrent, false); //run function on page finish loading to avoid undifined
let data = [] //array that store current played song
function getCurrent () {
   const title = document.querySelectorAll('.expand-options .info span'); //get played song value
   title.forEach(item =>{ //add current song data to our array
    data.push(item.textContent)
   })
   const response =  axios.post('http://localhost:37583/current',{
    data:{
        song_name:'idling',
        song_artist:'idling'
    }
    }).catch(err=>{
        console.log(err)
    })
   setInterval(async()=>{ //each 5seconds we gonna check if the current played song equal the song we have on our array 
    if(title[0].textContent == data[0] && title[1].textContent == data[1]){ //if true (don't do anything )
        return
    }
    else{ //else (upload our array to get the current played song)
    data = []; //reset our array
    title.forEach(item =>{ //set new song data
        data.push(item.textContent)
    })
   try{
    const response = await axios.post('http://localhost:37583/current',{
        data:{
            song_name:data[0],
            song_artist:data[1]
        }
        })
   }
   catch(err){
       console.log(err)
    }  
    }
   } , 5000)
}
