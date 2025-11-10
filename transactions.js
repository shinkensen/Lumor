
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
        pairs.push([date(data.time,false),data.total]);
    }
    pairs.sort((a,b) => b[0] - a[0]);
    for (let i=0; i< data.length; i++){
        let temp = ("" +pairs[i][0]).substring(4);
        pairs[i][0] = makeMonth(parseInt(temp.substring(0,2)));
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