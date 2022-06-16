const grafikZaman = [];

const paramAverage = (paramName) => {
    let arr = []
    for (let i = 0; i < creatures.length; i++){
        arr.push(eval("creatures[i]." + paramName))
    }
    return allFuncs.average(...arr)
}

var timePassed = 0;
var sec = 0;
var df = 1;

var timePopulationChart = new Chart(document.getElementById('graph1').getContext('2d'), {
type: 'line',
data: {
labels:[],
datasets: [{
    label: "Population",
    data:[],
    fill:false,
    backgroundColor: "rgba(255, 99, 132, 0.2)",
    borderColor: "rgba(255,99,132, 1)",
    borderWidth: 1
}]
},
options: {
responsive: false,
maintainAspectRatio: false
}
});

var timeIntelligenceChart = new Chart(document.getElementById("graph2").getContext("2d"), {
    type: 'line',
    data: {
    labels:[],
    datasets: [{
        label: "Intelligence",
        data:[],
        fill:false,
        backgroundColor: "rgba(150, 200, 150, 0.2)",
        borderColor: "rgba(150, 200, 150, 1)",
        borderWidth: 1
    }]
    },
    options: {
    responsive: false,
    maintainAspectRatio: false
    }
});


setInterval(()=>timePassed = Math.abs(Math.round((firstD - new Date())/1000/30)),10); 



document.getElementById("graph1").style = "position: absolute; top: 360px; left: 820px;"
document.getElementById("graph1").width = "400";
document.getElementById("graph1").height = "400";

document.getElementById("graph2").style = "position: absolute; top: 0px; left: 820px;"
document.getElementById("graph2").width = "400";
document.getElementById("graph2").height = "400";



var upChart = () => {
    !grafikZaman.includes("Minutes: " + timePassed.toString()) && grafikZaman.push("Minutes: " + timePassed.toString());
    if (df == grafikZaman.length){
    let secText= sec%1==0 ? "Minutes: " + sec.toString()+":00" : "Minutes: " + Math.floor(sec).toString()+":30"
    

        timePopulationChart.data.labels.push(secText)
        timePopulationChart.data.datasets[0].data.push(creatures.length);
        timePopulationChart.update();

        timeIntelligenceChart.data.labels.push(secText)
        
        timeIntelligenceChart.data.datasets[0].data.push(allFuncs.yzdo(paramAverage("DNA.intelligence"),0,30))
        
        timeIntelligenceChart.update();
        
        sec+=0.50;
 
        df++;
    }
    requestAnimationFrame(upChart);
}

requestAnimationFrame(upChart);