const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
weatherForm.addEventListener('submit' , (e) =>{
    e.preventDefault();
    const location = search.value;

    messageTwo.textContent = 'Loading....'
    

    fetch('http://localhost:3000/weather?address='+location).then((response) =>{
      
        
        response.json().then((data) =>{
            console.log(data)
            if(data.error)
            {
                messageTwo.textContent = data.error;
            }
            else{
                console.log(data.forecast);
                forecastInfo = data.forecast;
                messageTwo.textContent = data.location +'  '+data.forecast;
            }
        })
    })


})