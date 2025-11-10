
const url='https://lumor-backend.onrender.com';
const dataRead = async() =>{
    const res= await fetch(url + "/data",{
        method: 'POST',
        headers: {'Content-Type' : 'application/json', "Authorization" : `Bearer ${localStorage.getItem('token')}`},
    })
    if (res.status == 500){
        alert("Internal Server Error");
        console.log(res.error);
    }
    const res1 = await res.json();
    // I need a way to take this data, and sort it by date... Fine we will use a 2-3 dimensional array, 
    const data = res1.data;
    let pairs = [];
    for (let i=0; i < data.length ; i++){
        pairs.push([date(data[i].time,false),data[i].total]);
    }
    pairs.sort((a,b) => b[0] - a[0]);
    for (let i=0; i< data.length; i++){
        let temp = ("" +pairs[i][0]).substring(4);
        pairs[i][0] = monthMake(parseInt(temp.substring(0,2)));
    }
    // this was just sorted in descending order and therefore, we
    if (pairs.length > 12){
        pairs.splice(12,pairs.length -11);
        //this should remove the extra ones im pretty sure
    }
    // for the pie chart lets use trove transaction api!
    //we will be using chart.js with this!
/*
    (async function() {
    const data = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
    ];
    */
    let data1 = []
    for (let i = 0; i<pairs.length; i++){
        data1.push({year: pairs[i][0], balance: pairs[i][1]})
    }
    new Chart(
        document.getElementById('main'),
        {
        type: 'line',
        data: {
            labels: data1.map(row => row.year),
            datasets: [
            {
                label: 'Balance This year',
                data: data1.map(row => row.balance), 
                borderColor: 'blue',
                backgroundColor: 'lightblue',
            }
            ]
        }
        }
    )
}
dataRead();


const date= (date, mode) => {
    const year = parseInt(date.slice(0,4));
    let month = parseInt(date.slice(5,7));
    const month2 = (parseInt(date.slice(5,7))<10 ? "0" : 0) + parseInt(date.slice(5,7));
    const day = parseInt(date.slice(8,10));
    if (!mode){
        return parseInt("" + year + month2 + day);
    }
    month = monthMake(month);
    return day + " " + month +" "+ year;
}
const monthMake = (month) =>{
    switch(month){
        case 1:
            month ="Jan";
            break;
        case 2:
            month ="Feb";
            break;
        case 3:
            month ="Mar";
            break;
        case 4:
            month ="Apr";
            break;
        case 5:
            month ="May";
            break;
        case 6:
            month ="Jun";
            break;
        case 7:
            month ="Jul";
            break;
        case 8:
            month ="Aug";
            break;
        case 9:
            month ="Sep";
            break;
        case 10:
            month ="Oct";
            break;
        case 11:
            month ="Nov";
            break;
        case 12:
            month ="Dec";
            break;
    }
    return month;
}