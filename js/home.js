let insearchon = 0;

//IN FIRST ONLOAD

function getAll() {

    let url = "https://api.coingecko.com/api/v3/coins";
    ajaxFetch('GET', url, cardCrypt);
}

function cardCrypt(xhr, error = null) {
    if (error) {
        $("#root").html(``);
        alertError(`<h2>SORRY, There was a problem</h2><h2><strong>${error}</strong></h2>`);
        return
    }
    jsonobj = JSON.parse(xhr.responseText);
    $("#root").html("");
    $("#root").append(`<div id="divHomePage"></div>`)
    for (var i = 0; i < jsonobj.length; i++) {
        $("#divHomePage").append(`<div class="cardcrypt">
            <div class="imgsymname">
                <div><img src="${jsonobj[i].image.small}"></div>
                <div class="symname">
                    <div class="symbolcrypt">${jsonobj[i].symbol}</div>
                    <div class="namecrypt">${jsonobj[i].name}</div>
                </div>
                <label class="switch swinput">
                    <input onChange="selectMonnaie(event)" id="i${(jsonobj[i].symbol)}" data-symbol="${(jsonobj[i].symbol)}" data-name="${jsonobj[i].name}" type="checkbox">
                    <span class="slider round"></span>
                </label>
            </div>
            
            <div><div class="moreinfo" onclick="moreInfo(event)" id="${jsonobj[i].id}">
                <div class="triangle"></div>more info</div></div>
        </div>
        `);
    }
    let btnsd = $("nav button");
    for (i = 0; i < 3; i++) {
        btnsd[i].disabled = false;
    }
    $("#formsearch button")[0].disabled = false;
}

//MORE INFO

function moreInfo(e) {
    let symnames = document.getElementsByClassName('symname');
    symnames[insearchon].parentElement.parentElement.classList.remove("searchon");
    if (e.target.className === "moreinfo") {
        e.target.innerHTML = `<div class="triangle"></div>please wait ...`;
        e.target.onclick = null;
        let strg_eui = JSON.parse(localStorage.getItem(e.target.id));
        let boolstrg = true;
        if (strg_eui !== null) {
            if (strg_eui.date + 120000 >= (new Date()).getTime()) {
                let objeui = strg_eui;
                boolstrg = false;
                e.target.parentElement.innerHTML = `<div class="lessinfo" onclick="moreInfo(event)" id="${e.target.id}">
                    <div class='trianglebas'></div>
                    <div class="infowp24">
                        <div >
                            ${objeui.eur} €<br>
                            ${objeui.usd} $<br>
                            ${objeui.ils} ₪
                        </div>
                        <div class="${objeui.perc24>=0?"p24p":"p24m"}" title="variation 24h">
                            ${objeui.perc24>=0?"+"+objeui.perc24:objeui.perc24}%
                        </div>
                    </div>
                </div>`;
            }
        }
        if (boolstrg) {
            let urlmi = "https://api.coingecko.com/api/v3/coins/" + e.target.id;
            ajaxFetch('GET', urlmi, cryptActual);
        }
        function cryptActual(xhr, error = null) {
            if (error) {
                e.target.innerHTML = '<div>' + error + '</div>';
                return
            }
            let jsonobj = JSON.parse(xhr.responseText);
            let objeui = {
                date: (new Date()).getTime(),
                eur: jsonobj.market_data.current_price.eur,
                usd: jsonobj.market_data.current_price.usd,
                ils: jsonobj.market_data.current_price.ils,
                perc24: jsonobj.market_data.price_change_percentage_24h.toFixed(2)
            };

            e.target.parentElement.innerHTML = `<div class="lessinfo" onclick="moreInfo(event)" id="${e.target.id}">
                <div class='trianglebas'></div>
                <div class="infowp24">
                    <div >
                        ${objeui.eur} €<br>
                        ${objeui.usd} $<br>
                        ${objeui.ils} ₪
                    </div>
                    <div class="${objeui.perc24>=0?"p24p":"p24m"}" title="variation 24h">
                        ${objeui.perc24>=0?"+"+objeui.perc24:objeui.perc24}%
                    </div>
                </div>
            </div>`;

            let savelocalstorage = JSON.stringify(objeui);
            localStorage.setItem(e.target.id, savelocalstorage);
        }
    }
    else if (e.target.className === "lessinfo") {
        e.target.parentElement.innerHTML = `<div class="moreinfo" onclick="moreInfo(event)" id="${e.target.id}">
            <div class="triangle"></div>more info</div>`;
    }
    else if(e.target.parentElement.className=== "lessinfo"){
        e.target.parentElement.parentElement.innerHTML = `<div class="moreinfo" onclick="moreInfo(event)" id="${e.target.parentElement.id}">
            <div class="triangle"></div>more info</div>`;
    }
    else if(e.target.parentElement.parentElement.className=== "lessinfo"){
        e.target.parentElement.parentElement.parentElement.innerHTML = `<div class="moreinfo" onclick="moreInfo(event)" id="${e.target.parentElement.parentElement.id}">
            <div class="triangle"></div>more info</div>`;
    }
}

//SEARCH CRYPTOCURRENCY NAME OR SYMBOL

$("#formsearch button").on('click', searchCrypt);
let cancelsearch = false;

function searchCrypt() {
    stopSetT();
    $("#divLiveReportsPage").remove();
    $("#divAboutPage").remove();
    changeBtnColor("#Home");
    HomePage();
    let target = $('#search').val().toLowerCase();
    $('#search').val("");
    let symnames = document.getElementsByClassName('symname');
    symnames[insearchon].parentElement.parentElement.classList.remove("searchon");
    let notfound = true;
    for (i = 0; i < symnames.length; i++) {
        if (target === symnames[i].children[0].innerText.toLowerCase() || target === symnames[i].children[1].innerText.toLowerCase()) {
            window.scrollTo(0, symnames[i].parentElement.parentElement.offsetTop -220);
            symnames[i].parentElement.parentElement.classList.add("searchon");
            insearchon = i;
            notfound = false;
            break;
        }
    }
    if (notfound) {
        alertError("<h2>CURRENCY NOT FOUND</h2>");
        cancelsearch = true;
    }
    $("#formsearch button").blur();
}