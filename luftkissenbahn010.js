let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d'); 
let wagen1, wagen2;
let m1, m2, v1, v2, v_schwerpunkt;
let dx = 0;
let start; 
let startVariable = 0; 
let requestID = undefined;
let positionMasse1 = [];
let positionMasse2 = [];


/*
Farben:
#354B61


*/

function masseeinseinstellen() {
	 m1 = parseFloat(document.getElementById("masse_eins").value);
	 wagen1.width = Math.pow(m1, 1 / 3) * 50;
	 wagen1.height = Math.pow(m1, 1 / 3) * 20;
	 wagen1.y = canvas.height * 2 / 3 - wagen1.height;
	 document.getElementById("m1").innerHTML = parseFloat(document.getElementById("masse_eins").value) + ' kg';
	 return m1;
}

function massezweieinstellen() {
	 m2 = parseFloat(document.getElementById("masse_zwei").value);
	 wagen2.width = Math.pow(m2, 1 / 3) * 50;
	 wagen2.height = Math.pow(m2, 1 / 3) * 20;
	 wagen2.y = canvas.height * 2 / 3 - wagen2.height;
	 document.getElementById("m2").innerHTML = parseFloat(document.getElementById("masse_zwei").value) + ' kg';
	 return m2;
}

function startFunktion () {
  requestID = requestAnimationFrame(startFunktion,canvas);
  onEachStep();
}

function stopFunktion () {
  if (requestID) {
	 cancelAnimationFrame(requestID);
	 requestID = undefined;
  } 
}

function resetFunktion () {
  stopFunktion();
  init();
  
}

function checkboxFunktion () {
  if (wagen2.x <  wagen1.x + wagen1.width) {
    wagen2.x += 5;
  }    
}


function geschwindigkeitsVektor1() {
  
   context.save();   
   context.noStroke;
   context.fillStyle = 'rgb(A,A,A)';
   context.lineWidth = 1;
   if (wagen1.vx > 0) {
	  context.beginPath();
	  context.moveTo(wagen1.x + wagen1.width / 2, wagen1.y + wagen1.height / 2 );
	  context.lineTo(wagen1.x + wagen1.width / 2 + wagen1.vx * 40, wagen1.y + wagen1.height / 2);
	  context.lineTo(wagen1.x + wagen1.width / 2 + wagen1.vx * 40 - 6, wagen1.y + wagen1.height / 2 - 2);
	  context.lineTo(wagen1.x + wagen1.width / 2 + wagen1.vx * 40 - 6, wagen1.y + wagen1.height / 2 + 2);
	  context.lineTo(wagen1.x + wagen1.width / 2 + wagen1.vx * 40, wagen1.y + wagen1.height / 2 );
	  
	  context.font = "15px Comic Sans MS";
     context.fillStyle = "lightgrey";
     context.textAlign = "center";
     context.textBaseline = "middle"; 
     context.fillText("v1 = " + wagen1.vx.toFixed(2) + " m/s",  wagen1.x + wagen1.width / 2, canvas.height * 2 / 3 + 15); 
     context.fill();
	  context.stroke();
	  context.restore();  
   } else if (wagen1.vx < 0) {
   context.beginPath();
	  context.moveTo(wagen1.x + wagen1.width / 2, wagen1.y + wagen1.height / 2 );
	  context.lineTo(wagen1.x + wagen1.width / 2 + wagen1.vx * 40, wagen1.y + wagen1.height / 2);
	  context.lineTo(wagen1.x + wagen1.width / 2 + wagen1.vx * 40 + 6, wagen1.y + wagen1.height / 2 - 2);
	  context.lineTo(wagen1.x + wagen1.width / 2 + wagen1.vx * 40 + 6, wagen1.y + wagen1.height / 2 + 2);
	  context.lineTo(wagen1.x + wagen1.width / 2 + wagen1.vx * 40, wagen1.y + wagen1.height / 2 );
	  
	  context.font = "15px Comic Sans MS";
     context.fillStyle = "lightgrey";
     context.textAlign = "center";
     context.textBaseline = "middle"; 
     context.fillText("v1 = " + wagen1.vx.toFixed(2) + " m/s", wagen1.x + wagen1.width / 2, canvas.height * 2 / 3 + 15); 
     context.fill();
	  context.stroke();
	  context.restore();  
   }
}

function geschwindigkeitsVektor2() {
  
   context.save();   
   context.noStroke;
   context.fillStyle = 'rgb(A,A,A)';
   context.lineWidth = 1;
   if (wagen2.vx > 0) {
	  context.beginPath();
	  context.moveTo(wagen2.x + wagen2.width / 2, wagen2.y + wagen2.height / 2 );
	  context.lineTo(wagen2.x + wagen2.width / 2 + wagen2.vx * 40, wagen2.y + wagen2.height / 2);
	  context.lineTo(wagen2.x + wagen2.width / 2 + wagen2.vx * 40 - 6, wagen2.y + wagen2.height / 2 - 2);
	  context.lineTo(wagen2.x + wagen2.width / 2 + wagen2.vx * 40 - 6, wagen2.y + wagen2.height / 2 + 2);
	  context.lineTo(wagen2.x + wagen2.width / 2 + wagen2.vx * 40, wagen2.y + wagen2.height / 2 );
	  context.font = "15px Comic Sans MS";
     context.fillStyle = "lightgrey";
     context.textAlign = "center";
     context.textBaseline = "middle"; 
     context.fillText("v2 = " + wagen2.vx.toFixed(2) + " m/s", wagen2.x + wagen2.width / 2, canvas.height * 2 / 3 + 15); 
     context.fill();
	  context.stroke();
	  context.restore();   
   } else if (wagen2.vx < 0) {
     context.beginPath();
	  context.moveTo(wagen2.x + wagen2.width / 2, wagen2.y + wagen2.height / 2 );
	  context.lineTo(wagen2.x + wagen2.width / 2 + wagen2.vx * 40, wagen2.y + wagen2.height / 2);
	  context.lineTo(wagen2.x + wagen2.width / 2 + wagen2.vx * 40 + 6, wagen2.y + wagen2.height / 2 - 2);
	  context.lineTo(wagen2.x + wagen2.width / 2 + wagen2.vx * 40 + 6, wagen2.y + wagen2.height / 2 + 2);
	  context.lineTo(wagen2.x + wagen2.width / 2 + wagen2.vx * 40, wagen2.y + wagen2.height / 2 );
	  context.font = "15px Comic Sans MS";
     context.fillStyle = "lightgrey";
     context.textAlign = "center";
     context.textBaseline = "middle"; 
     context.fillText("v2 = " + wagen2.vx.toFixed(2) + " m/s", wagen2.x + wagen2.width / 2, canvas.height * 2 / 3 + 15); 
     context.fill();
	  context.stroke();
	  context.restore();  
   }
       
}

function beschriftung () {
  context.save();  
  context.font = "15px Comic Sans MS";
  context.fillStyle = "lightgrey";
  context.textAlign = "center";
  context.textBaseline = "middle"; 
  context.fillText("1", wagen1.x + wagen1.width / 2, canvas.height * 2 / 3 - wagen1.height / 2); 
  context.fillText("2", wagen2.x + wagen2.width / 2, canvas.height * 2 / 3 - wagen2.height / 2); 
  if (document.getElementById("massen").checked) {
    context.font = "15px Comic Sans MS";
    context.fillStyle = "lightgrey";
    context.textAlign = "center";
    context.textBaseline = "middle"; 
    context.fillText("m1 = " + m1.toFixed(1) + " kg", wagen1.x + wagen1.width / 2, wagen1.y - 15); 
    context.fillText("m2 = " + m2.toFixed(1) + " kg", wagen2.x + wagen2.width / 2, wagen2.y - 15); 
    context.fill();
	 context.stroke();
	 context.restore();  
  }
}


function diagramm () {
  context.save();  
    
  context.fillStyle = "lightgrey";
  context.strokeStyle = "lightgrey";
  for (let i = 0; i < 10; i++) {
  	 context.moveTo(50, 50.5 + 10 * i);
  	 context.lineTo(550, 50.5 + 10 * i);
  }
  context.lineWidth = 1;
  context.moveTo(49.5, 40.5 );
  context.lineTo(49.5, 150.5);
  context.moveTo(49.5, 150.5 );
  context.lineTo(549.5, 150.5);
  context.stroke();
  context.restore();  
	 
}


function zeichnen () {
  context.beginPath();
  context.moveTo(50, 150 - positionMasse1[0] / 8);
  for (let i = 1; i < positionMasse1.length; i++) {
    context.lineTo(50 + i / 2, 150 - positionMasse1[i] / 8);
  }  
  context.stroke();
  
  //console.log("positionMasse1 = ", positionMasse1);) {
  	
}


window.onload = init; 


 
function init() {
  canvas.clear;
  document.getElementById("masse_eins").addEventListener("change", masseeinseinstellen);
  document.getElementById("masse_zwei").addEventListener("change", massezweieinstellen);
  document.getElementById("start").addEventListener("click", startFunktion);  
  document.getElementById("stop").addEventListener('click', stopFunktion);
  document.getElementById("reset").addEventListener('click', resetFunktion);
  document.getElementById("myCheck").addEventListener('onclick', checkboxFunktion);
  document.getElementById("geschwindigkeitsvektor").addEventListener('onclick', checkboxFunktion);
  document.getElementById("massen").addEventListener('onclick', checkboxFunktion);
  document.getElementById("geschwindigkeitAnzeigen").addEventListener('onclick', checkboxFunktion);


  m1 = 1;
  m2 = 1;
  v1 = 5;
  v2 = -4;
 
  
  document.getElementById("m1").innerHTML = m1 + ' kg';  
  document.getElementById("m2").innerHTML = m2 + ' kg';  
  
  
  wagen1 = new Box(20,"#183C61");
  wagen1.x = 50; wagen1.y = 250.5;
  wagen1.vx = v1;
  wagen1.width = 50;
  wagen1.height = 20;
  wagen1.color = "#183C61";
  wagen1.y = canvas.height * 2 / 3 - wagen1.height;
  
  wagen2 = new Box(20,"#2B6CAD");
  wagen2.x = 500; wagen2.y = 250.5;
  wagen2.vx = v2;
  wagen2.width = 50;
  wagen2.height = 20
  wagen2.color = "#2B6CAD";
  wagen2.y = canvas.height * 2 / 3 - wagen2.height;  
    
    
  context.clearRect(0, 0, canvas.width, canvas.height); 
  context.fillStyle = "#7EB2E6"; 
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#388CE0";
  context.fillRect(0, canvas.height * 2 / 3 - 5, canvas.width, canvas.height * 2 / 30);
  wagen1.draw(context); 
  wagen2.draw(context); 
  
  if (document.getElementById("geschwindigkeitsvektor").checked) {
  	 geschwindigkeitsVektor1();
    geschwindigkeitsVektor2();
  }
  
  beschriftung();
  
  
};
 
  
  
  
  animFrame();


function animFrame(){
  onEachStep();
}  



 
function onEachStep() {
  
  canvas.clear;  
  
  if (!document.getElementById("myCheck").checked) {
	  if (wagen1.x + wagen1.width > canvas.width) {
	    wagen1.x = canvas.width - wagen1.width;    
	    wagen1.vx = wagen1.vx * (-1);
	  } else if (wagen1.x < 0) {
	    wagen1.x = 0;    
	    wagen1.vx = wagen1.vx * (-1);
	  }  
	  
	  if (wagen2.x + wagen2.width > canvas.width) {
	    wagen2.x = canvas.width - wagen2.width;    
	    wagen2.vx = wagen2.vx * (-1);
	  } else if (wagen2.x < 0) {
	    wagen2.x = 0 ;    
	    wagen2.vx = wagen2.vx * (-1);
	  }
	  
	  if (wagen2.x - wagen1.x < wagen1.width) {
	  	 
	    dx = wagen1.width - (wagen2.x - wagen1.x) ;    
	    wagen1.x = wagen1.x - dx / 2 ;
	    wagen2.x = wagen2.x + dx / 2 ; 
	  	 v_schwerpunkt = (m1 * wagen1.vx + m2 * wagen2.vx) / (m1 + m2); 
	    wagen1.vx = wagen1.vx * (-1) + 2 * v_schwerpunkt;
	    wagen2.vx = wagen2.vx * (-1) + 2 * v_schwerpunkt; 
	   
	    
	  }
		
	  wagen1.x += wagen1.vx; 
	  wagen2.x += wagen2.vx; 
	  
	  
	  
  } else {
    
    
    
    if (wagen1.x < 0) {
	    wagen1.x = 0;    
	    wagen1.vx = wagen1.vx * (-1);
	    wagen2.vx = wagen2.vx * (-1);
	  }  
	  
	  if (wagen2.x + wagen2.width > canvas.width) {
	    wagen2.x = canvas.width - wagen2.width + 1;    
	    wagen2.vx = wagen2.vx * (-1);
	    wagen1.vx = wagen1.vx * (-1);
	  }
	  
	  if (wagen2.x - wagen1.x < wagen1.width) {
	  	 
	    dx = wagen1.width - (wagen2.x - wagen1.x) ;    
	    wagen1.x = wagen1.x - dx / 2 ;
	    wagen2.x = wagen2.x + dx / 2 + 1; 
	  	 v_schwerpunkt = (m1 * wagen1.vx + m2 * wagen2.vx) / (m1 + m2); 
	    wagen1.vx = v_schwerpunkt;
	    wagen2.vx = v_schwerpunkt; 
	   
	    
	  }
		
	  wagen1.x += wagen1.vx; 
	  wagen2.x += wagen2.vx;   
	  
  }  
  
  
    
  context.clearRect(0, 0, canvas.width, canvas.height); 
  context.fillStyle = "#7EB2E6"; 
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#388CE0";
  context.fillRect(0, canvas.height * 2 / 3 - 5, canvas.width, canvas.height * 2 / 30);
  wagen1.draw(context); 
  wagen2.draw(context); 
  
  if (document.getElementById("geschwindigkeitsvektor").checked) {
  	 geschwindigkeitsVektor1();
    geschwindigkeitsVektor2();
  }
  
  
  
  positionMasse1.push(wagen1.x);  
  if (positionMasse1.length > 1000) {
    positionMasse1.shift();
  }
  
  positionMasse1.push(wagen1.x);  
  if (positionMasse1.length > 1000) {
    positionMasse1.shift();
  }
  
  
  
    
  wagen1.draw(context);
  wagen2.draw(context);
  beschriftung();
  
  if (geschwindigkeitAnzeigen.checked) {
  	 diagramm();
  	 zeichnen();
  }
  
   
};