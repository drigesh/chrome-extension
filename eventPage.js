

var dcount;
var d0 = {} ,d1 = {} ,d2 = {} ,d3 = {} ,d4 = {} ,d5 = {} ,d6 = {};
var today;
var todaydate;


chrome.storage.sync.get(['today'],response=>{
    today = response.today;
    if(today === undefined){
        today = {};
    }
})

function mergeall(){
    var data = {};
    chrome.storage.sync.get(['ddata'],response=>{
        ddata = response.ddata;
        if(ddata === undefined) {
            ddata={
                d0:{},
                d1:{},
                d2:{},
                d3:{},
                d4:{},
                d5:{},
                d6:{},
            }
            chrome.storage.sync.set({'ddata':ddata},()=>{})
        }
        else{
            d0=ddata["d0"];
            d1=ddata["d1"];
            d2=ddata["d2"];
            d3=ddata["d3"];
            d4=ddata["d4"];
            d5=ddata["d5"];
            d6=ddata["d6"];
        }

        for(domain in d0){
            if(data[domain]){
                data[domain]=parseInt(d0[domain])+parseInt(data[domain]);
            }
            else{
                data[domain]=d0[domain];
            }
        }
        for(domain in d1){
            if(data[domain]){
                data[domain]=parseInt(d1[domain])+parseInt(data[domain]);
            }
            else{
                data[domain]=d1[domain];
            }
        }
        for(domain in d2){
            if(data[domain]){
                data[domain]=parseInt(d2[domain])+parseInt(data[domain]);
            }
            else{
                data[domain]=d2[domain];
            }
        }
        for(domain in d3){
            if(data[domain]){
                data[domain]=parseInt(d3[domain])+parseInt(data[domain]);
            }
            else{
                data[domain]=d3[domain];
            }
        }
        for(domain in d4){
            if(data[domain]){
                data[domain]=parseInt(d4[domain])+parseInt(data[domain]);
            }
            else{
                data[domain]=d4[domain];
            }
        }
        for(domain in d5){
            if(data[domain]){
                data[domain]=parseInt(d5[domain])+parseInt(data[domain]);
            }
            else{
                data[domain]=d5[domain];
            }
        }
        for(domain in d6){
            if(data[domain]){
                data[domain]=parseInt(d6[domain])+parseInt(data[domain]);
            }
            else{
                data[domain]=d6[domain];
            }
        }

        chrome.storage.sync.set({'data':data},()=>{});
    });

}

chrome.storage.sync.get(['data'],response=>{
    var data = response.data;
    if(data === undefined){
        data = {};
        mergeall();

    }
})

var ddata;
chrome.storage.sync.get(['ddata'],response=>{
    ddata = response.ddata;
    if(ddata === undefined) {
        ddata={
            d0:{},
            d1:{},
            d2:{},
            d3:{},
            d4:{},
            d5:{},
            d6:{},
        }
        chrome.storage.sync.set({'ddata':ddata},()=>{})
    }
    else{
        d0=ddata["d0"];
        d1=ddata["d1"];
        d2=ddata["d2"];
        d3=ddata["d3"];
        d4=ddata["d4"];
        d5=ddata["d5"];
        d6=ddata["d6"];
    }
});

function datechanged(){
    // console.log("date changed");
    dcount++;
    ddata["d"+dcount%7] = today;
    switch(dcount%7){
        case 0: d0 = today;
        case 1: d1 = today;
        case 2: d2 = today;
        case 3: d3 = today;
        case 4: d4 = today;
        case 5: d5 = today;
        case 6: d6 = today;
        default : ;
    }
    chrome.storage.sync.set({'ddata':ddata},()=>{
        today = {};
        chrome.storage.sync.set({'today':{}},()=>{});
        chrome.storage.sync.set({'dcount':dcount},()=>{});
        mergeall();
    });
}


setInterval(() => {
    var currdate = new Date();
    var currdate = currdate.getDate();
    var mypromise = new Promise((resolve,reject)=>{
            chrome.storage.sync.get(['dcount','todaydate'],response=>{
                
                dcount = response.dcount;
                if(dcount === undefined){
                    dcount = 6;
                    chrome.storage.sync.set({'dcount':dcount},()=>{});
                }
                todaydate = response.todaydate;
                if(todaydate === undefined){
                    todaydate = currdate;
                    chrome.storage.sync.set({'todaydate':todaydate},()=>{});
                }
                // console.log("middle"+dcount+"  "+todaydate);
                resolve();
            })
    })
    mypromise.then((element)=>{
        // console.log(currdate+"  "+todaydate+"  "+dcount);
        if(currdate != todaydate){
            todaydate = currdate;
            chrome.storage.sync.set({'todaydate':todaydate},()=>{});
            datechanged(dcount);
        }
        
    }).catch(element=>{
        // console.log(currdate+"  "+todaydate+"  "+dcount);

        // console.log("not changed");
    })
    
    
}, 10000);
// console.log(varinter);

var proto = ["https:", "http:"];
var url = "url";
var inter = 0;

function setBadge(txt,clr){

    chrome.browserAction.setBadgeText({"text":txt},function(){})
    chrome.browserAction.setBadgeBackgroundColor({"color":clr},function(){})

}

function increment(){
    var myPromise = new Promise((resolve,reject)=>{
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
        url = tabs[0].url;
        if (url == undefined) {
        }
        else {
            let arr = url.split('//');
            if (proto.includes(arr[0])) {
                setBadge("0","#008891");
                url = arr[1];
                arr = url.split('/');
                url = arr[0];
                for(let i = inter-5; i <= inter; i ++){
                    clearInterval(i);
                }

                if(today === undefined){
                    today = {};
                }
                // console.log("today"+today);
                inter = setInterval(()=>{
                if(url in today){
                    count = today[url];
                    today[url] = count+1;
                }
                else{
                    today[url] = 1;
                }
                let seconds = today[url];
                if(seconds >= 3600){
                    let hours = Math.floor(seconds/3600);
                    setBadge(hours+"h","#008891");
                }else if(seconds >= 60){
                    let minutes = Math.floor(seconds/60);
                    setBadge(minutes+"m","#008891");
                }
                else{
                    setBadge(seconds+"s","#008891");
                }
                
                },1000)
            }
            else{
                clearInterval(inter);
                setBadge("","#008891");
            }
        }
        preUrl = url;
        resolve("resolved");
    })})
    chrome.storage.sync.set({'today':today },()=>{});
    return myPromise;
}

chrome.tabs.onActivated.addListener(function(activeInfo){
    
    var myPromise = increment();
    myPromise.then((element)=>{
    }).catch(()=>{
    })
    
})


chrome.tabs.onUpdated.addListener((tabId,changeInfo,tab)=>{

        var myPromise = increment();
        myPromise.then((element)=>{
        }).catch(()=>{
    })
})


chrome.windows.onFocusChanged.addListener((windowId)=>{
    
    clearInterval(inter);
    if(windowId==-1){

        
    }
    else{
        var myPromise = increment();
        myPromise.then((element)=>{
        }).catch(()=>{
        })
    }
})

chrome.windows.onRemoved.addListener((windowId)=>{

    chrome.storage.sync.set({'today':today },()=>{});
})
