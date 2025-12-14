const url='https://lumor-backend.onrender.com';
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
const avatar= document.getElementById("avatar");
const ava= async() => {
    const pfp = await fetch(url + "/pfp",{
        method: "POST",
        headers: {'Content-Type' : 'application/json', "Authorization" : `Bearer ${localStorage.getItem('token')}`},
    })
    if (!pfp.ok){
        avatar.src = 'https://wallpaperaccess.com/full/1854458.jpg';
        return;
    }
    const json = await pfp.json();
    const pfpUrl = (json.data && (json.data.pfp || (Array.isArray(json.data) ? json.data[0]?.pfp : null))) || json.pfp;
    avatar.src = pfpUrl || 'https://wallpaperaccess.com/full/1854458.jpg';
    localStorage.setItem("avatar", pfpUrl|| 'https://wallpaperaccess.com/full/1854458.jpg')
}
if (!localStorage.getItem("avatar")){ava();}
else{avatar.src = localStorage.getItem("avatar")};
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
const form = document.querySelector('.add-transaction-form');

form.addEventListener('submit', async(event) => {
    event.preventDefault(); // stop the page from reloading
    const btn = document.getElementById("submit");
    btn.disabled= true;
    // Grab values
    const name = document.getElementById('trans-name').value.trim();
    const amount = parseFloat(document.getElementById('trans-amount').value)  * (document.getElementById('trans-type').value == "expense" ? -1 : 1);
    const icon = document.querySelector('input[name="trans-icon"]:checked').value;
    const res = await fetch(url + "/add",{
        method: "POST",
        headers: {'Content-Type' : 'application/json', "Authorization" : `Bearer ${localStorage.getItem('token')}`},
        body : JSON.stringify({'price'  : amount *1.00, 'name' : name, 'icon': icon})
    })
    if (!res.ok){
        const err = await res.text()
        console.log(err);
    }
    else{
        alert("Transaction added!");
        btn.disabled = false;
        location.reload();
    }
})
const s = async() =>{
    console.log("sending: "  + mostRecentMonth + "" +mostRecentYear)
    const res = await fetch(url + "/stats",{
        method: "POST",
        headers : {"Content-type" : "application/json", "Authorization" : `Bearer ${localStorage.getItem('token')}`},
        body: JSON.stringify({month: mostRecentMonth, year: mostRecentYear})
    })
    if (!res.ok){
        const err = await res.text()
        console.error("Server Error",err);
        return;
    }
    const data= await res.json();
    console.log(data)
    document.getElementById("total").innerText = `$${data.balance.toFixed(2)}`;
    document.getElementById("income").innerText = `$${data.income.toFixed(2)}`;
    document.getElementById("expenses").innerText = `$${data.expense.toFixed(2)}`;
    document.getElementById("savings").innerText = `${data.savings.toFixed(2)}%`;
    if (data.savings<0){
        document.getElementById("savings").classList.add("negative");
    }
    else{
        document.getElementById("savings").classList.add("positive");
    }
}
(async()=>{await mostRecent(); await s()})()