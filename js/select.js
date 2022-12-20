var checkedm = [];

//SELECT CURRENCY

function selectMonnaie(e){
    let symnames = document.getElementsByClassName('symname');
    symnames[insearchon].parentElement.parentElement.classList.remove("searchon");
    if(e.target.checked){
        if(checkedm.length<5){
            checkedm.push([e.target.id,`${e.target.dataset.name} (${e.target.dataset.symbol})`]);
        }
        else{
            e.target.checked = false;
            alertOverM([e.target.id,`${e.target.dataset.name} (${e.target.dataset.symbol})`]);
        }
    }
    else{
        for(i=0;i<checkedm.length;i++){
            if(checkedm[i][0]===e.target.id){
                checkedm.splice(i,1);
                break;
            }
        }
    }
}

// ALERT IF MORE THAN 5 SELECTED

function alertOverM(currence){
    numselect=5;
    var elt = document.createElement('div');
    elt.id = "thealert";
    document.body.appendChild(elt, document.body);
    let butter = "";
    for(let i=0;i<checkedm.length;i++){
        butter += `<div class="divswi">
        <label class="switch">
            <input type="checkbox" class="swinputalert" onChange="disabledbtn(event)" checked>
            <span class="slider round"></span>
        </label>
        <div><strong>${checkedm[i][1]}</strong></div></div>`;
    }
    elt.innerHTML=`<div id="divalert">
        <h4>It's not possible to choose more than 5 currencies</h4>
        <h6>Deselect currencie(s) to replace with <strong>${currence[1]}</strong></h6>
        <div id="butters">${butter}</div>
        <div id="btnsalert">
            <button id="replace" onclick="replaceAlert('${currence[0]}','${currence[1]}')" disabled>replace</button>
            <button id="cancel" onclick="cancelAlert()">cancel</button>
        </div>
    </div>`
}

//DISABLED BUTTON REPLACE IN ALERT

function disabledbtn(e){
    (e.target.checked)? numselect++ : numselect--;
    if(numselect===5){
        document.getElementById("replace").disabled=true;
    }
    else{
        document.getElementById("replace").disabled=false;
    }
}

//REPLACE IN ALERT

function replaceAlert(currence0,currence1){
    if(numselect>=5){return}
    newcheckedm = [];
    let swinputalert = document.querySelectorAll(".swinputalert");
    for(i=0;i<5;i++){
        if(swinputalert[i].checked){
            newcheckedm.push(checkedm[i]);
        }
        else{
            document.querySelector('.swinput #'+checkedm[i][0]).checked = false;
        }
    }
    checkedm = newcheckedm;
    checkedm.push([currence0,currence1]);
    document.getElementById(currence0).checked = true;
    cancelAlert();
}

//BUTTON CANCEL IN ALERT

function cancelAlert(){
    document.body.removeChild(document.getElementById("thealert"));
    if(cancelsearch){
        $("#search").focus();
        cancelsearch = false;
    }
}