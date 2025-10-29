import {createClient} from 'https://esm.sh/@supabase/supabase-js';
const supabase= createClient("https://rsaquxvrhyudikhkviti.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzYXF1eHZyaHl1ZGlraGt2aXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNTM3MzMsImV4cCI6MjA3NjgyOTczM30.py5-5y8MO4foxXPHvwzgHKlW2Q0PIqQ2ktGwIPRwEWs")



async function signUp(email,pass) {
    const {data,error} = await supabase.auth.signInWithPassword({
        email: email, password: pass
    })
    if (error){
        return [false, error.message];
    }
    else{
    }
}


const go=document.getElementById("go");
const userInput= document.getElementById("user");
const passInput= document.getElementById("pass");

go.addEventListener("click", ()=>{
    if (!usernameCheck("" + userInput.value)[1]){
        alert(usernameCheck(userInput.value)[0]);
    }
    else{

    }
})








const usernameCheck = (name)=>{
    if (name.length < 6){
        return ["Username too short", false];
    }
    if (!isNaN(name.charAt(0) -0)){
        return ["Cannot start with number", false]
    }
    return ["valid",true];
}


const passCheck = (name)=>{
    const reqs= [false,false,false]
    const names= name.split("");
    for (const s of names){
        if (s - 0!=undefined){}
    }
}