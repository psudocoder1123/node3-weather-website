
console.log('client Side Javascript file is loaded')
//fetch json data from url and save it to object..
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })



const weatherForm =document.querySelector('form')
const searchElement=document.querySelector('input')
const msg1=document.querySelector('#p1')
const msg2=document.querySelector('#p2')


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=searchElement.value

    msg1.textContent='Loading...'
    msg2.textContent=''

    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
          if(data.error)
          {
              msg1.textContent=(data.error)
          }
          else{
            msg1.textContent=(data.location)
            msg2.textContent=( "It is currently  "+data.forecast.temperature+" degress out. There is a "+data.forecast.precipProbability+'% chance of rain')
          }
    
        })
    
    })
})