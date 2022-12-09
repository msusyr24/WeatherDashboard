var currentCityDisplayEl = document.getElementById("cityDisplay")
var textBeforeBottomContainer = document.getElementById("textBeforeBottomContainer")
var createBottomContainer = document.getElementById("fiveDayForecast")
var fiveDayForecastText = document.createElement("h3")
var leftPanelEl = document.getElementById("left-panel")
var block1 = document.createElement("h4")
var block2 = document.createElement("h4")
var block3 = document.createElement("h4")
var block4 = document.createElement("h4")
var block5 = document.createElement("h4")
var citySearch;
var buttonValue;
var blockTime;
var loadBTN;

const localStorageContent = localStorage.getItem('savedSearches')
var savedSearches;
        if (localStorageContent === null) {
            savedSearches = [];
        } else {
            savedSearches = JSON.parse(localStorageContent);
        }

loadHistory()

function loadHistory(){
    for(i=0; i<savedSearches.length;i++){
        loadBTN = document.createElement("button")
        leftPanelEl.append(loadBTN)
        loadBTN.style="height: 35px; width: 100%; background-color: gray; color: white; margin-top: 10px; border-radius:5px; border: none;"
        loadBTN.textContent=savedSearches[i]
        loadBTN.value=savedSearches[i]
        loadBTN.id="leftAddedButton"
        loadBTN.addEventListener("click", function(event){
            event.preventDefault()
            buttonValue = this.value;
            historicSearch()
        })
        
    }
}

//hits search button if "enter" is clicked while in the input field
document.getElementById("input")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("button").click();
    }
    });

    var BTN = document.getElementById("button")
    var citySearching = BTN.addEventListener("click", function (event) {
    event.preventDefault();
    citySearch = document.getElementById("input").value
    if(citySearch==""){
        return
    }
    document.getElementById("input").value=""
    
    fetch("https://api.openweathermap.org/data/2.5/forecast?appid=a6a3eda3ece3b97485d3f0cf27695443&q="+citySearch)
    .then(function (response){
            block1.textContent =""
            fiveDayForecastText.textContent =""
            return response.json();
            })
            .then(function (data){
                             
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                today = '(' + mm + '/' + dd + '/' + yyyy + ')' + '     '
                currentCityDisplayEl.textContent = data.city.name + " " + today
                currentCityDisplayEl.style = "font-weight: bold;"
                var weatherGraphic = document.createElement("img")
                weatherGraphic.src = "https://openweathermap.org/img/wn/"+data.list[0].weather[0].icon+"@2x.png"
                currentCityDisplayEl.append(weatherGraphic)
                var tempEl = document.createElement("h4");
                currentCityDisplayEl.appendChild(tempEl)
                tempEl.textContent = "Temp: " + (((data.list[0].main.temp)-273.15)*1.8+32).toFixed(2)+"°F"
                tempEl.style = "padding: 0px 0px 10px 0px;"
                var windEl = document.createElement("h4")
                currentCityDisplayEl.appendChild(windEl)
                windEl.textContent = "Wind: "+data.list[0].wind.speed+" MPH"
                var humidityEl = document.createElement("h4")
                currentCityDisplayEl.appendChild(humidityEl)
                humidityEl.textContent = "Humidity: "+data.list[0].main.humidity+" %"
                humidityEl.style = "padding: 10px 0px;"
                
                textBeforeBottomContainer.append(fiveDayForecastText)
                fiveDayForecastText.textContent="5-Day Forecast:"
                fiveDayForecastText.style="font-weight:bold; padding-top: 20px; padding-left: 5px;"
                createBottomContainer.style = "display: flex; display: row; margin-top: 20px;"
                
                newDT=data.list[0].dt_txt.split('')
                currentTime=newDT[11]+newDT[12]
                console.log(currentTime)
                console.log(data)
                
                textBeforeBottomContainer.append(fiveDayForecastText)
                fiveDayForecastText.textContent="5-Day Forecast:"
                fiveDayForecastText.style="font-weight:bold; padding-top: 20px; padding-left: 5px;"
                createBottomContainer.style = "display: flex; display: row; margin-top: 20px;"
                

                createBottomContainer.append(block1)
                if(currentTime==0){
                    blockTime=5
                } else if(currentTime==3){
                    blockTime=4
                } else if(currentTime==6){
                    blockTime=3
                } else if(currentTime==9){
                    blockTime=2
                } else if(currentTime==12){
                    blockTime=1
                } else if(currentTime==15){
                    blockTime=8
                } else if(currentTime==18){
                    blockTime=7
                } else if(currentTime==21){
                    blockTime=6
                }
                var block1Date = data.list[blockTime].dt_txt
                var block1Mo = block1Date.slice(5,7)
                var block1Da = block1Date.slice(8,10)
                var block1Yr = block1Date.slice(0,4)
                block1.textContent=block1Mo+"/"+block1Da+"/"+block1Yr
                var weatherGraphicBlock1 = document.createElement("img")
                weatherGraphicBlock1.src = "https://openweathermap.org/img/wn/"+data.list[blockTime].weather[0].icon+"@2x.png"
                weatherGraphicBlock1.style="display: block;"
                block1.append(weatherGraphicBlock1)
                var block1Temp = document.createElement("h4")
                block1.append(block1Temp)
                block1Temp.textContent="Temp: "+ (((data.list[blockTime].main.temp)-273.15)*1.8+32).toFixed(2)+"°F"
                block1.style = "flex: 1 0 auto; display: block; background-color: var(--coolBlue); color: white; padding: 10px; margin-right: 20px;"
                block1Temp.style = "padding-top: 15px;"
                var block1Wind = document.createElement("h4")
                block1Wind.style = "padding-top: 10px;"
                block1.append(block1Wind)
                block1Wind.textContent="Wind: "+data.list[blockTime].wind.speed+" MPH"
                var block1Humidity = document.createElement("h4")
                block1Humidity.style = "padding-top: 10px;"
                block1.append(block1Humidity)
                block1Humidity.textContent = "Humidity: "+data.list[blockTime].main.humidity+" %"


                createBottomContainer.append(block2)
                blockTime = blockTime+8
                var block2Date = data.list[blockTime].dt_txt
                var block2Mo = block2Date.slice(5,7)
                var block2Da = block2Date.slice(8,10)
                var block2Yr = block2Date.slice(0,4)
                block2.textContent=block2Mo+"/"+block2Da+"/"+block2Yr
                var weatherGraphicBlock2 = document.createElement("img")
                weatherGraphicBlock2.src = "https://openweathermap.org/img/wn/"+data.list[blockTime].weather[0].icon+"@2x.png"
                weatherGraphicBlock2.style="display: block;"
                block2.append(weatherGraphicBlock2)
                var block2Temp = document.createElement("h4")
                block2.append(block2Temp)
                block2Temp.textContent="Temp: "+ (((data.list[blockTime].main.temp)-273.15)*1.8+32).toFixed(2)+"°F"
                block2.style = "flex: 1 0 auto; display: block; background-color: var(--coolBlue); color: white; padding: 10px; margin-right: 20px;"
                block2Temp.style = "padding-top: 15px;"
                var block2Wind = document.createElement("h4")
                block2Wind.style = "padding-top: 10px;"
                block2.append(block2Wind)
                block2Wind.textContent="Wind: "+data.list[blockTime].wind.speed+" MPH"
                var block2Humidity = document.createElement("h4")
                block2Humidity.style = "padding-top: 10px;"
                block2.append(block2Humidity)
                block2Humidity.textContent = "Humidity: "+data.list[blockTime].main.humidity+" %"


                blockTime = blockTime+8
                createBottomContainer.append(block3)
                var block3Date = data.list[blockTime].dt_txt
                var block3Mo = block3Date.slice(5,7)
                var block3Da = block3Date.slice(8,10)
                var block3Yr = block3Date.slice(0,4)
                block3.textContent=block3Mo+"/"+block3Da+"/"+block3Yr
                var weatherGraphicBlock3 = document.createElement("img")
                weatherGraphicBlock3.src = "https://openweathermap.org/img/wn/"+data.list[blockTime].weather[0].icon+"@2x.png"
                weatherGraphicBlock3.style="display: block;"
                block3.append(weatherGraphicBlock3)
                var block3Temp = document.createElement("h4")
                block3.append(block3Temp)
                block3Temp.textContent="Temp: "+ (((data.list[blockTime].main.temp)-273.15)*1.8+32).toFixed(2)+"°F"
                block3.style = "flex: 1 0 auto; display: block; background-color: var(--coolBlue); color: white; padding: 10px; margin-right: 20px;"
                block3Temp.style = "padding-top: 15px;"
                var block3Wind = document.createElement("h4")
                block3Wind.style = "padding-top: 10px;"
                block3.append(block3Wind)
                block3Wind.textContent="Wind: "+data.list[blockTime].wind.speed+" MPH"
                var block3Humidity = document.createElement("h4")
                block3Humidity.style = "padding-top: 10px;"
                block3.append(block3Humidity)
                block3Humidity.textContent = "Humidity: "+data.list[blockTime].main.humidity+" %"



                blockTime = blockTime+8
                createBottomContainer.append(block4)
                var block4Date = data.list[blockTime].dt_txt
                var block4Mo = block4Date.slice(5,7)
                var block4Da = block4Date.slice(8,10)
                var block4Yr = block4Date.slice(0,4)
                block4.textContent=block4Mo+"/"+block4Da+"/"+block4Yr
                var weatherGraphicBlock4 = document.createElement("img")
                weatherGraphicBlock4.src = "https://openweathermap.org/img/wn/"+data.list[blockTime].weather[0].icon+"@2x.png"
                weatherGraphicBlock4.style="display: block;"
                block4.append(weatherGraphicBlock4)
                var block4Temp = document.createElement("h4")
                block4.append(block4Temp)
                block4Temp.textContent="Temp: "+ (((data.list[blockTime].main.temp)-273.15)*1.8+32).toFixed(2)+"°F"
                block4.style = "flex: 1 0 auto; display: block; background-color: var(--coolBlue); color: white; padding: 10px; margin-right: 20px;"
                block4Temp.style = "padding-top: 15px;"
                var block4Wind = document.createElement("h4")
                block4Wind.style = "padding-top: 10px;"
                block4.append(block4Wind)
                block4Wind.textContent="Wind: "+data.list[blockTime].wind.speed+" MPH"
                var block4Humidity = document.createElement("h4")
                block4Humidity.style = "padding-top: 10px;"
                block4.append(block4Humidity)
                block4Humidity.textContent = "Humidity: "+data.list[blockTime].main.humidity+" %"
               


                createBottomContainer.append(block5)
                var block5Date = data.list[39].dt_txt
                var block5Mo = block5Date.slice(5,7)
                var block5Da = block5Date.slice(8,10)
                var block5Yr = block5Date.slice(0,4)
                block5.textContent=block5Mo+"/"+block5Da+"/"+block5Yr
                var weatherGraphicBlock5 = document.createElement("img")
                weatherGraphicBlock5.src = "https://openweathermap.org/img/wn/"+data.list[39].weather[0].icon+"@2x.png"
                weatherGraphicBlock5.style="display: block;"
                block5.append(weatherGraphicBlock5)
                var block5Temp = document.createElement("h4")
                block5.append(block5Temp)
                block5Temp.textContent="Temp: "+ (((data.list[39].main.temp)-273.15)*1.8+32).toFixed(2)+"°F"
                block5.style = "flex: 1 0 auto; display: block; background-color: var(--coolBlue); color: white; padding: 10px; margin-right: 20px;"
                block5Temp.style = "padding-top: 15px;"
                var block5Wind = document.createElement("h4")
                block5Wind.style = "padding-top: 10px;"
                block5.append(block5Wind)
                block5Wind.textContent="Wind: "+data.list[39].wind.speed+" MPH"
                var block5Humidity = document.createElement("h4")
                block5Humidity.style = "padding-top: 10px;"
                block5.append(block5Humidity)
                block5Humidity.textContent = "Humidity: "+data.list[39].main.humidity+" %"
        
                var currentCityName = data.city.name
                if(savedSearches.indexOf(currentCityName) == -1){
                    var newBTN = document.createElement("button")
                    var newDiv = document.createElement("div")
                    newDiv.class = "d-grid gap-2"
                    leftPanelEl.append(newDiv)
                    newDiv.append(newBTN)
                    newBTN.style="width: 100%; background-color: gray; color: white; margin-top: 10px; border-radius:5px; padding: 5px 0px; border: none;"
                    newBTN.id="leftAddedButton2"
                    newBTN.textContent=data.city.name
                    newBTN.value=data.city.name
                    newBTN.addEventListener("click", function(event){
                    event.preventDefault()
                    buttonValue = newBTN.value;
                    historicSearch()
        })
                    }
                
                if(savedSearches.indexOf(currentCityName) == -1){
                    savedSearches.push(currentCityName);
                    localStorage.setItem('savedSearches', JSON.stringify(savedSearches)); 
                    }
                                
            })
})





function historicSearch(){
    citySearch = buttonValue
    fetch("https://api.openweathermap.org/data/2.5/forecast?appid=a6a3eda3ece3b97485d3f0cf27695443&q="+citySearch)
    .then(function (response){
            block1.textContent =""
            fiveDayForecastText.textContent =""
            return response.json();
            })
            .then(function (data){
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                today = '(' + mm + '/' + dd + '/' + yyyy + ')' + '     '
                currentCityDisplayEl.textContent = data.city.name + " " + today
                currentCityDisplayEl.style = "font-weight: bold;"
                var weatherGraphic = document.createElement("img")
                weatherGraphic.src = "https://openweathermap.org/img/wn/"+data.list[0].weather[0].icon+"@2x.png"
                currentCityDisplayEl.append(weatherGraphic)
                var tempEl = document.createElement("h4");
                currentCityDisplayEl.appendChild(tempEl)
                tempEl.textContent = "Temp: " + (((data.list[0].main.temp)-273.15)*1.8+32).toFixed(2)+"°F"
                tempEl.style = "padding: 0px 0px 10px 0px;"
                var windEl = document.createElement("h4")
                currentCityDisplayEl.appendChild(windEl)
                windEl.textContent = "Wind: "+data.list[0].wind.speed+" MPH"
                var humidityEl = document.createElement("h4")
                currentCityDisplayEl.appendChild(humidityEl)
                humidityEl.textContent = "Humidity: "+data.list[0].main.humidity+" %"
                humidityEl.style = "padding: 10px 0px;"

                //new array for date and time to grab hour
                newDT=data.list[0].dt_txt.split('')
                currentTime=newDT[11]+newDT[12]
            

                
                textBeforeBottomContainer.append(fiveDayForecastText)
                fiveDayForecastText.textContent="5-Day Forecast:"
                fiveDayForecastText.style="font-weight:bold; padding-top: 20px; padding-left: 5px;"
                createBottomContainer.style = "display: flex; display: row; margin-top: 20px;"
                




                createBottomContainer.append(block1)
                if(currentTime==0){
                    blockTime=13
                } else if(currentTime==3){
                    blockTime=12
                } else if(currentTime==6){
                    blockTime=11
                } else if(currentTime==9){
                    blockTime=10
                } else if(currentTime==12){
                    blockTime=9
                } else if(currentTime==15){
                    blockTime=8
                } else if(currentTime==18){
                    blockTime=7
                } else if(currentTime==21){
                    blockTime=6
                }
                var block1Date = data.list[blockTime].dt_txt
                var block1Mo = block1Date.slice(5,7)
                var block1Da = block1Date.slice(8,10)
                var block1Yr = block1Date.slice(0,4)
                block1.textContent=block1Mo+"/"+block1Da+"/"+block1Yr
                var weatherGraphicBlock1 = document.createElement("img")
                weatherGraphicBlock1.src = "https://openweathermap.org/img/wn/"+data.list[blockTime].weather[0].icon+"@2x.png"
                weatherGraphicBlock1.style="display: block;"
                block1.append(weatherGraphicBlock1)
                var block1Temp = document.createElement("h4")
                block1.append(block1Temp)
                block1Temp.textContent="Temp: "+ (((data.list[blockTime].main.temp)-273.15)*1.8+32).toFixed(2)+"°F"
                block1.style = "flex: 1 0 auto; display: block; background-color: var(--coolBlue); color: white; padding: 10px; margin-right: 20px;"
                block1Temp.style = "padding-top: 15px;"
                var block1Wind = document.createElement("h4")
                block1Wind.style = "padding-top: 10px;"
                block1.append(block1Wind)
                block1Wind.textContent="Wind: "+data.list[blockTime].wind.speed+" MPH"
                var block1Humidity = document.createElement("h4")
                block1Humidity.style = "padding-top: 10px;"
                block1.append(block1Humidity)
                block1Humidity.textContent = "Humidity: "+data.list[blockTime].main.humidity+" %"


                createBottomContainer.append(block2)
                blockTime = blockTime+8
                var block2Date = data.list[blockTime].dt_txt
                var block2Mo = block2Date.slice(5,7)
                var block2Da = block2Date.slice(8,10)
                var block2Yr = block2Date.slice(0,4)
                block2.textContent=block2Mo+"/"+block2Da+"/"+block2Yr
                var weatherGraphicBlock2 = document.createElement("img")
                weatherGraphicBlock2.src = "https://openweathermap.org/img/wn/"+data.list[blockTime].weather[0].icon+"@2x.png"
                weatherGraphicBlock2.style="display: block;"
                block2.append(weatherGraphicBlock2)
                var block2Temp = document.createElement("h4")
                block2.append(block2Temp)
                block2Temp.textContent="Temp: "+ (((data.list[blockTime].main.temp)-273.15)*1.8+32).toFixed(2)+"°F"
                block2.style = "flex: 1 0 auto; display: block; background-color: var(--coolBlue); color: white; padding: 10px; margin-right: 20px;"
                block2Temp.style = "padding-top: 15px;"
                var block2Wind = document.createElement("h4")
                block2Wind.style = "padding-top: 10px;"
                block2.append(block2Wind)
                block2Wind.textContent="Wind: "+data.list[blockTime].wind.speed+" MPH"
                var block2Humidity = document.createElement("h4")
                block2Humidity.style = "padding-top: 10px;"
                block2.append(block2Humidity)
                block2Humidity.textContent = "Humidity: "+data.list[blockTime].main.humidity+" %"


                blockTime = blockTime+8
                createBottomContainer.append(block3)
                var block3Date = data.list[blockTime].dt_txt
                var block3Mo = block3Date.slice(5,7)
                var block3Da = block3Date.slice(8,10)
                var block3Yr = block3Date.slice(0,4)
                block3.textContent=block3Mo+"/"+block3Da+"/"+block3Yr
                var weatherGraphicBlock3 = document.createElement("img")
                weatherGraphicBlock3.src = "https://openweathermap.org/img/wn/"+data.list[blockTime].weather[0].icon+"@2x.png"
                weatherGraphicBlock3.style="display: block;"
                block3.append(weatherGraphicBlock3)
                var block3Temp = document.createElement("h4")
                block3.append(block3Temp)
                block3Temp.textContent="Temp: "+ (((data.list[blockTime].main.temp)-273.15)*1.8+32).toFixed(2)+"°F"
                block3.style = "flex: 1 0 auto; display: block; background-color: var(--coolBlue); color: white; padding: 10px; margin-right: 20px;"
                block3Temp.style = "padding-top: 15px;"
                var block3Wind = document.createElement("h4")
                block3Wind.style = "padding-top: 10px;"
                block3.append(block3Wind)
                block3Wind.textContent="Wind: "+data.list[blockTime].wind.speed+" MPH"
                var block3Humidity = document.createElement("h4")
                block3Humidity.style = "padding-top: 10px;"
                block3.append(block3Humidity)
                block3Humidity.textContent = "Humidity: "+data.list[blockTime].main.humidity+" %"



                blockTime = blockTime+8
                createBottomContainer.append(block4)
                var block4Date = data.list[blockTime].dt_txt
                var block4Mo = block4Date.slice(5,7)
                var block4Da = block4Date.slice(8,10)
                var block4Yr = block4Date.slice(0,4)
                block4.textContent=block4Mo+"/"+block4Da+"/"+block4Yr
                var weatherGraphicBlock4 = document.createElement("img")
                weatherGraphicBlock4.src = "https://openweathermap.org/img/wn/"+data.list[blockTime].weather[0].icon+"@2x.png"
                weatherGraphicBlock4.style="display: block;"
                block4.append(weatherGraphicBlock4)
                var block4Temp = document.createElement("h4")
                block4.append(block4Temp)
                block4Temp.textContent="Temp: "+ (((data.list[blockTime].main.temp)-273.15)*1.8+32).toFixed(2)+"°F"
                block4.style = "flex: 1 0 auto; display: block; background-color: var(--coolBlue); color: white; padding: 10px; margin-right: 20px;"
                block4Temp.style = "padding-top: 15px;"
                var block4Wind = document.createElement("h4")
                block4Wind.style = "padding-top: 10px;"
                block4.append(block4Wind)
                block4Wind.textContent="Wind: "+data.list[blockTime].wind.speed+" MPH"
                var block4Humidity = document.createElement("h4")
                block4Humidity.style = "padding-top: 10px;"
                block4.append(block4Humidity)
                block4Humidity.textContent = "Humidity: "+data.list[blockTime].main.humidity+" %"
               


                createBottomContainer.append(block5)
                var block5Date = data.list[39].dt_txt
                var block5Mo = block5Date.slice(5,7)
                var block5Da = block5Date.slice(8,10)
                var block5Yr = block5Date.slice(0,4)
                block5.textContent=block5Mo+"/"+block5Da+"/"+block5Yr
                var weatherGraphicBlock5 = document.createElement("img")
                weatherGraphicBlock5.src = "https://openweathermap.org/img/wn/"+data.list[39].weather[0].icon+"@2x.png"
                weatherGraphicBlock5.style="display: block;"
                block5.append(weatherGraphicBlock5)
                var block5Temp = document.createElement("h4")
                block5.append(block5Temp)
                block5Temp.textContent="Temp: "+ (((data.list[39].main.temp)-273.15)*1.8+32).toFixed(2)+"°F"
                block5.style = "flex: 1 0 auto; display: block; background-color: var(--coolBlue); color: white; padding: 10px; margin-right: 20px;"
                block5Temp.style = "padding-top: 15px;"
                var block5Wind = document.createElement("h4")
                block5Wind.style = "padding-top: 10px;"
                block5.append(block5Wind)
                block5Wind.textContent="Wind: "+data.list[39].wind.speed+" MPH"
                var block5Humidity = document.createElement("h4")
                block5Humidity.style = "padding-top: 10px;"
                block5.append(block5Humidity)
                block5Humidity.textContent = "Humidity: "+data.list[39].main.humidity+" %"

                
})           }