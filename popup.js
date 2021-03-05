
var third = document.getElementById('third');
var second = document.getElementById('second');

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

setInterval(function(){
  var dat = new Date();
  var date = " "+months[dat.getMonth()] +" "+ dat.getDate()+ "," + dat.getFullYear();
  
  var hour = dat.getHours();
  var ampm = hour > 11 ? "PM" : "AM";
  hour%=12;
  hour = hour < 10 ? "0"+hour : hour;
  var min = dat.getMinutes();
  min = min<10 ? "0"+min : min ;
  var secs = dat.getSeconds();
  secs = secs<10 ? "0"+secs : secs;
  var time = " " + hour + ":" + min + ":" + secs + " " + ampm;
  document.getElementById('date').innerText = date;
  document.getElementById('time').innerText = time;

},1000);

// '#fa1e0e','#7868e6','#383e56','#a4ebf3','#0a043c','#eb5e0b','#11698e','#f88f01','#00af91',
// '#6f9eaf','#df7861','#70af85','#da9ff9','#d1c145','#c05555','#16a596','#ea2c62','#495464',

const colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
'#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
'#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
'#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
'#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
'#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
'#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
'#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

var urls={};

function addlist(urls,callfrom){

  var size = Object.keys(urls).length;
  var sortable = Object.fromEntries(Object.entries(urls).sort(([,a],[,b]) => b-a));
  var key = Object.keys(sortable);
  var value = Object.values(sortable);
  var val = value;
  var sum = 0;
  if(size > 0){
    sum = val.reduce(function(total,num){
      return total+num;
    })
  }
  for(let i = 0;i < size; i++){
    var li = document.createElement('li');
    var span = document.createElement('span');
    var span2 = document.createElement('span');
    li.className = "ulitem"+i;
    span.className = "spanitem"+i;
    span2.className = "span2item"+i;
    var sec = value[i];
    var percent = (100*sec/sum).toFixed(2);
    var dd;
    if(callfrom === "past"){
      console.log("days");
      dd = Math.floor(sec/86400);
      sec%=(86400);
      dd = dd<10 ? "0"+dd : dd;
    }
    var hh = Math.floor(sec/3600);
    if(hh<10){
      hh = "0"+hh;
    }
    sec%=3600;
    var mm = Math.floor(sec/60);
    if(mm<10){
      mm = "0"+mm;
    }
    sec%=60;
    var ss= sec;
    if(ss<10){
      ss = "0"+ss;
    }
    // if(percent<10){
    //   percent = "0"+percent;
    // }
    if(callfrom === "past"){
    var spent = percent+"%   "+dd+"d:"+hh+"h:"+mm+"m:"+ss+"s ";
    }
    else{
      var spent = percent+"%   "+hh+"h:"+mm+"m:"+ss+"s ";
    }

    if(key[i].length >27){
      var contentkey = document.createTextNode(key[i].substr(0,26) + " ...");
    }
    else{
      var contentkey = document.createTextNode(key[i].substr(0,28));
    }

    var contenttime = document.createTextNode(spent +'\n');
    span.appendChild(contentkey);
    span2.appendChild(contenttime);
    li.appendChild(span);
    li.appendChild(span2);
    document.getElementById('mylist').append(li);
    let ulclass = 'ulitem'+i;
    let spanclass = 'spanitem'+i;
    let span2class = 'span2item'+i;
    if(percent<"01"){
    document.getElementsByClassName(ulclass)[0].style.cssText = "text-align:left;font-size:1.3rem;color:grey;";
    }
    else{
    document.getElementsByClassName(ulclass)[0].style.cssText = "text-align:left;font-size:1.3rem;color:"+colors[i]+";";
    }
    document.getElementsByClassName(spanclass)[0].style.cssText = "display:inline-block;padding-bottom:3px;margin-bottom:6px;padding:0;height:1%;font-size:0.9rem;color:#666666;font-weight:400;";
    document.getElementsByClassName(span2class)[0].style.cssText = "display:inline-block;padding-top:3px;margin-top:6px;padding:0;height:1%;position: absolute;right:10px;text-align:right;font-size:0.85rem;color:#666666;font-weight:400;";
  }
    var dd;
    if(callfrom === "past"){
      console.log("days");
      dd = Math.floor(sum/86400);
      sum%=(86400);
      dd = dd<10 ? "0"+dd : dd;
    }
    var hh = Math.floor(sum/3600);
    if(hh<10){
      hh = "0"+hh;
    }
    sum%=3600;
    var mm = Math.floor(sum/60);
    if(mm<10){
      mm = "0"+mm;
    }
    sum%=60;
    var ss= sum;
    if(ss<10){
      ss = "0"+ss;
    }
    if(callfrom === "past"){
      var spent = dd+"d:"+hh+"h:"+mm+"m:"+ss+"s ";
    }
    else{
      var spent = hh+"h:"+mm+"m:"+ss+"s ";
    }
    document.getElementById('totalspan').innerText = spent;

}

chrome.storage.sync.get(['today'],(response)=>{

  document.getElementById('today').style.color = 'black';
  urls = response.today;
  addlist(urls,"today");
  
})


// for past 7 days ------


document.getElementById('past').addEventListener('click',function(){
  document.getElementById('past').style.color = 'black';
  document.getElementById('today').style.color = 'rgb(129, 128, 128)';
  document.getElementById('today').style.cssText = 'today:hover{ color : black ;}';
  document.getElementById('hisday').innerText = "Past 7 Days";
  document.getElementById('listhead').style.cssText = "padding: 0 50px 0 55px;";
  document.querySelector('#listhead span').style.cssText = "right : 135px;";

  var ulist = document.getElementById('mylist');
  while(ulist.firstChild) ulist.removeChild(ulist.firstChild);

  chrome.storage.sync.get(['data'],(response)=>{
    urls = response.data;
    addlist(urls,"past");
  
  })
  // document.getElementById('past').removeEventListener('click',()=>{});
})

document.getElementById('today').addEventListener('click',function(){
  document.getElementById('today').style.color = 'black';
  document.getElementById('past').style.color = 'rgb(129, 128, 128)';
  document.getElementById('past').style.cssText = 'past:hover{ color : black ;}';
  document.getElementById('hisday').innerText = "Today";
  document.getElementById('listhead').style.cssText = "padding: 0 30px 0 55px;";
  document.querySelector('#listhead span').style.cssText = "right : 105px;";
  var ulist = document.getElementById('mylist');
  while(ulist.firstChild) ulist.removeChild(ulist.firstChild);

  chrome.storage.sync.get(['today'],(response)=>{

    urls = response.today;
    
    addlist(urls,"today");
  
  })
  // document.getElementById('past').removeEventListener('click',()=>{});
})

// ['#F44336','#FFEBEE',  '#FFCDD2',  '#EF9A9A',  '#E57373',  '#EF5350',  '#E53935',  '#D32F2F',  '#C62828',  '#B71C1C',  '#FF8A80',  '#FF5252',
//   '#FF1744',  '#D50000',  '#FCE4EC',  '#F8BBD0',  '#F48FB1',  '#F06292',  '#EC407A',  '#E91E63',  '#D81B60',  '#C2185B',  '#AD1457',  '#880E4F',
//     '#FF80AB',  '#FF4081',  '#F50057',  '#C51162',  '#3F51B5',  '#3949AB',  '#303F9F',  '#283593',  '#1A237E',  '#8C9EFF',  '#536DFE',  '#3D5AFE',
//     '#304FFE',  '#E3F2FD','#F3E5F5',  '#E1BEE7',  '#CE93D8',  '#BA68C8',  '#AB47BC',  '#9C27B0',  '#8E24AA',  '#7B1FA2',  '#6A1B9A',  '#4A148C', 
//      '#EA80FC',  '#E040FB','#D500F9',  '#AA00FF',  '#EDE7F6',  '#D1C4E9',  '#B39DDB',  '#9575CD',  '#7E57C2',  '#673AB7',  '#5E35B1',  '#512DA8',
//       '#4527A0',  '#311B92','#B388FF',  '#7C4DFF',  '#651FFF',  '#6200EA',  '#E8EAF6',  '#C5CAE9',  '#9FA8DA',  '#7986CB',  '#5C6BC0']



