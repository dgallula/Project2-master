window.onload = getAll;
window.onunload = function(){localStorage.clear();}

// NAVIGATION INTO THE PAGES

$('nav button').click(SetPage)

function SetPage(event) {
    const btn = event.target.id;
    if (btn==="LiveReports" && checkedm.length === 0) {
        alertError('<h2>NO CURRENCIES SELECTED</h2>');
        return
    }
    actions = { HomePage, LiveReportsPage, AboutPage };
    stopSetT();
    $("#divLiveReportsPage").remove();
    $("#divAboutPage").remove();
    actions[btn + "Page"]();
    changeBtnColor("#"+btn);
    let symnames = document.getElementsByClassName('symname');
    symnames[insearchon].parentElement.parentElement.classList.remove("searchon");
    window.scrollTo(0,0);
}

function HomePage() {
    $("#divHomePage").show();
}

function LiveReportsPage() {
    $("#divHomePage").hide();
    liveReportsFunc();
}

function AboutPage() {
    $("#divHomePage").hide();
    var elt = document.createElement('div');
    elt.id = "divAboutPage";
    elt.innerHTML = `<h1>About the project</h1>
    <div id="imgandauthor">
        <div class="imgiggg" style="background-image:url(imgs/imgs_gif/im1.gif)">
            <div class="imgif" style="background-image:url(imgs/imgs_gif/im1.gif)">
                <div class="imgiglobal" style="background-image:url(imgs/imgs_gif/im1.gif)"></div>
            </div>
        </div>
        <div id="theauthor">
            <div class="firstinfoaut">
                <div class="infoauthor"><div class="winfoauthor">Author</div><div class="xinfoauthor">David Gallula</div></div>
                <div class="infoauthor"><div class="winfoauthor">City</div><div class="xinfoauthor">Jerusalem</div></div>
            </div>
            <div class="secondinfoaut">
                <div class="infoauthor"><div class="winfoauthor">Tel</div><div class="xinfoauthor">+972 538478654</div></div>
                <div class="infoauthor"><div class="winfoauthor">Mail</div><div class="xinfoauthor">dgallula@gmail.com</div></div>
            </div>
        </div>
    </div>
    <div id="aboutproject">
        <div id="titleabpr">Project 2 - john bryce - full stack 2021-2022</div><br>
        <div id="lgsused">
            <div>Languages used:</div>
            <div class="langs">HTML</div>
            <div class="langs">CSS</div>
            <div class="langs">Java Script</div>
            <div class="langs">JQuery</div>
            <div class="langs">Json & Ajax</div>
            <div class="langs">Bootstrap</div>
            <div class="langs">Other</div>
        </div><br>
        <div>Website Responsive Design (computer/pad/mobile)</div><br>
        <div>Completed Project: 100%</div><br>
        <div>API: api.coingecko.com , www.cryptocompare.com</div><br><br>
        <div id="idforbtninabout">
            <button onclick="window.location.href='#'" class="btninabout">download project pdf</button>
            <button onclick="window.location.href='https://github.com/'" class="btninabout">view code in GitHub</button>
        </div>
    </div>
    `;
    document.getElementById("root").appendChild(elt);
    
    // img jpg
    for(i=0;i<5;i++){fmover()};
    setTimeout(function(){$('.imgiglobal').remove();},2000);
    $(".imgif").on({"mouseover" : fmover});
    function fmover(){
        $(".imgif").off({"mouseover" : fmover});
        let stint
        let j=1,i = 1;
        stint = setInterval(function(){
            $(".imgif").css({"background-image":`url(imgs/imgs_gif/im${j}.gif)`});
            i++;
            if(i<9){j=i}
            else if(i>=9){j=18-i}
            if(i===18){
                clearintgif();
                $(".imgif").on({"mouseover" : fmover});
            }
        },70)
        function clearintgif(){
            clearInterval(stint);
        }
    }
    /////////
}

function changeBtnColor(idbtn) {
    $('nav button').removeClass('btn-on');
    $(idbtn).addClass('btn-on');
    $(idbtn).blur();
}

//ALERT ERROR

function alertError(message){
    var elt = document.createElement('div');
    elt.id = "thealert";
    document.body.appendChild(elt, document.body);
    elt.innerHTML = `<div id="divalert">${message}
        <div id="btnsalert" class="btnalerterror"><button id="cancel" onclick="cancelAlert()">cancel</button></div>
    </div>`;
    document.getElementById("cancel").focus();
}

