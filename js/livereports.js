let clearint; // to clear interval after close livereports
let dataPoints;

//LIVE REPORTS

function liveReportsFunc() {

    let curstr = "";
    for (i = 0; i < checkedm.length; i++) {
        if (i > 0) { curstr += "," };
        curstr += checkedm[i][0].slice(1);
    }
    let urlt = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${curstr.toUpperCase()}&tsyms=USD`;
    updateData();

    function updateData() {
        ajaxFetch('GET', urlt, addData);
    }

    let firstenter = true;
    function addData(xhr, error = null) {
        if (error) {
            alertError(`<h2>SORRY, problem with the live reports</h2><h2><strong>${error}</strong></h2>`);
            return
        }

        jsonobj = JSON.parse(xhr.responseText);

        if (jsonobj.Response === "Error") {
            alertError(`<h2>SORRY, problem with the live reports</h2><h2><strong>Error</strong></h2>`)
            return
        }

        let arrobj = Object.values(jsonobj);
        
        if(firstenter){
            let elt = document.createElement('div');
            elt.id = "divLiveReportsPage";
            elt.innerHTML = '<h1>Live Reports</h1><div id="chartContainer" style="height: 400px; width: 100%;"></div>';
            document.getElementById("root").appendChild(elt);
            
            let arrprop = Object.getOwnPropertyNames(jsonobj);
            dataPoints = [arrprop.length];

            //if problemes with some curencies 
            let strnotfound = ""
            if(arrprop.length != checkedm.length){
                let mnotfound = [];
                let positionmnf = 0;
                for(i=0;i<checkedm.length;i++){
                    if(!arrprop[i-positionmnf]||checkedm[i][0].slice(1).toUpperCase()!==arrprop[i-positionmnf].toUpperCase()){
                        mnotfound.push(checkedm[i][0].slice(1).toUpperCase());
                        positionmnf++;
                    }
                }
                strnotfound = `[${mnotfound.join(', ').toUpperCase()} Not Found]`;
            } 
        
            //options in live reports
            let options = {
                exportEnabled: true,
                animationEnabled: true,
                title: {
                    text: `${arrprop.join(', ').toUpperCase()} TO USD($) ${strnotfound}`
                },
                subtitles: [{
                    text: "Click Legend to Hide or Unhide Data Series"
                }],
                axisX: {
                    title: ""
                },
                axisY: {
                    // title: "Units Sold",
                    titleFontColor: "#4F81BC",
                    lineColor: "#4F81BC",
                    labelFontColor: "#4F81BC",
                    tickColor: "#4F81BC",
                    includeZero: false
                },
                toolTip: {
                    shared: true
                },
                legend: {
                    cursor: "pointer",
                    itemclick: toggleDataSeries
                },
                data: []
            };
        
            $("#chartContainer").CanvasJSChart(options);
        
            for (i = 0; i < arrobj.length; i++) {
                dataPoints[i] = [];
                options.data.push({
                    type: "spline",
                    name: arrprop[i],
                    showInLegend: true,
                    // xValueFormatString: "MMM YYYY",
                    // yValueFormatString: "",
                    dataPoints: dataPoints[i]
                })
            }
            firstenter = false;
        }

        for (i = 0; i < arrobj.length; i++) {
            dataPoints[i].push({ x: new Date(), y: arrobj[i].USD });
        }

        $("#chartContainer").CanvasJSChart().render();
        clearint = setTimeout(updateData, 2000);
    }

    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        e.chart.render();
    }
}

//STOP THE LIVE REPORTS
function stopSetT() {
    if (!clearint) { return }
    clearInterval(clearint);
    firstenter = true; 
}