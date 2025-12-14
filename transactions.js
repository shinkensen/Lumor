const url='https://lumor-backend.onrender.com';
const dataRead = async() =>{
    const res= await fetch(url + "/data-filtered",{
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
        console.log(temp)
        pairs[i][0] = monthMake(parseInt(temp.substring(0,2))) + " " +parseInt(temp.substring(2,4)) ;
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
        data1.unshift({year: pairs[i][0], balance: pairs[i][1]})
    }
    console.log(data1);
    new Chart(
        document.getElementById('main'),
        {
        type: 'line',
        data: {
            labels: data1.map(row => row.year),
            datasets: [
            {
                label: 'Balance',
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


const transacts = async() =>{
    const res = await fetch(url + "/data",{
        method: "POST",
        headers: {"Content-Type": "application/json", "Authorization" :  `Bearer ${localStorage.getItem('token')}`}
    })
    if (!res.ok) return;
    const data = await res.json();
    console.log(data)
    const history = document.getElementById('transaction-history');
    data.data.forEach(t => {
        const item = document.createElement('div');
        item.className = 'transaction-item';
        item.innerHTML = `<div class="transaction-icon">${t.icon}</div><div class="transaction-details"><div class="transaction-name">${t.name}</div><div class="transaction-date">${date(t.time, true)}</div></div><div class="transaction-amount ${t.price > 0 ? 'positive' : 'negative'}">${t.price > 0 ? '+' : ''}$${t.price.toFixed(2)}</div>`;
        history.appendChild(item);
    });
    const iconTotals = {};
    data.data.forEach(t => {
    if (!iconTotals[t.icon]) {
        iconTotals[t.icon] = 0;
    }
    iconTotals[t.icon] += t.price<0? t.price: 0;
    });
    new Chart("pieChart",{
        type: "pie",
        data:{
            labels: Object.keys(iconTotals),
            datasets: [
                {
                label: Object.keys(iconTotals),
                data: Object.values(iconTotals), 
                borderColor: 'white',
                backgroundColor: [
                    'lightblue',
                    'lightgreen',
                    'lightpink',
                    'orange',
                    'purple'
                ]
        }]
        }
    })
}
transacts();
let mostRecentMonth ="", mostRecentYear= "";
const r1= [document.getElementById("transIcon1"), document.getElementById("name1"),document.getElementById("date1"),document.getElementById("price1")]
const r2= [document.getElementById("transIcon2"), document.getElementById("name2"),document.getElementById("date2"),document.getElementById("price2")]
const r3= [document.getElementById("transIcon3"), document.getElementById("name3"),document.getElementById("date3"),document.getElementById("price3")]
const rs= [r1,r2,r3];
const mostRecent = async()=>{
    const res = await fetch(url + "/most-recent",{
        method: "POST",
        headers: {'Content-Type' : 'application/json', "Authorization" : `Bearer ${localStorage.getItem('token')}`},
    })
    if (res.status !== 200){
        alert("Internal Server Error" + res.error)
    }
    else{
    const data = await res.json();
    console.log(data);
    const transactions= data.transactions || [];
    for (let i=0; i<transactions.length;i++){
        const trans = transactions[i];
        rs[i][0].innerText = trans.icon;
        rs[i][1].innerText = trans.name;
        rs[i][2].innerText = date(trans.time, true);
        if (trans.price >0){
            rs[i][3].innerText ="+$" + trans.price.toFixed(2);
            rs[i][3].classList.add("positive");
        }
        else{
            rs[i][3].innerText = "$" + trans.price.toFixed(2);
            rs[i][3].classList.add("negative");
        }
    }
    if (transactions.length>0){
    mostRecentMonth = parseInt(transactions[0].time.slice(5,7));
    mostRecentYear = parseInt(transactions[0].time.slice(0,4));
    }
    else {
        const now = new Date();
        mostRecentMonth = now.getMonth() + 1;
        mostRecentYear = now.getFullYear();
    }
}
}
mostRecent();

if (localStorage.getItem('token')==null){
    window.location.href = 'signin.html';
}
else{
    const f= async() =>{
        const res = await fetch(url + "/valid",{
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({token: localStorage.getItem('token')})
        })
        const data= await res.json();  
        if (res.status !== 200){
            window.location.href = 'signin.html';
        }
    }
    f();
}
