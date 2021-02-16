// Farbpalette nach Dan Shiffman

/*
#f05025 (240, 80, 37) 	
#f89e50 (248, 158, 80) 	
#f8ef22 (248, 239, 34) 	
#31c5f4 (49, 197, 244) 	
#f063a4 (240, 99, 164) 	
#9252a1 (146, 82, 161) 	
#817ac6 (129, 122, 198) 	
#62c777 (98, 199, 119) 
*/

let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d'); 
let wagen1, wagen2;
let m1, m2, v1, v2, v_schwerpunkt;
let dx = 0;
let start; 
let startVariable = 0; 
let zusammengehaengt = 0;
let requestID = undefined;
let positionMasse1 = [];
let positionMasse2 = [];
let puffer = 40; //Abstände der Puffer von den Rändern


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

function geschwindigkeiteinseinstellen() {
	 v1 = parseFloat(document.getElementById("geschwindigkeit_eins").value);
	 document.getElementById("v1").innerHTML = v1 + ' m/s';
	 return v1;
	 
}

function geschwindigkeitzweieinstellen() {
	 v2 = parseFloat(document.getElementById("geschwindigkeit_zwei").value);
	 document.getElementById("v2").innerHTML = v2 + ' m/s';
	 return v2;
	
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

function inelastischerStoss () {
  
}


function geschwindigkeitsVektor1() {
   context.save();      
   context.fillStyle = "#888888";
   context.strokeStyle = "#888888";  
   if (wagen1.vx > 0) {
     context.save();   
     context.lineWidth = 1;
	  context.beginPath();
	  context.moveTo(wagen1.x + wagen1.width / 2, wagen1.y + wagen1.height / 2 );
	  context.lineTo(wagen1.x + wagen1.width / 2 + wagen1.vx * 40, wagen1.y + wagen1.height / 2);
	  context.lineTo(wagen1.x + wagen1.width / 2 + wagen1.vx * 40 - 6, wagen1.y + wagen1.height / 2 - 2);
	  context.lineTo(wagen1.x + wagen1.width / 2 + wagen1.vx * 40 - 6, wagen1.y + wagen1.height / 2 + 2);
	  context.lineTo(wagen1.x + wagen1.width / 2 + wagen1.vx * 40, wagen1.y + wagen1.height / 2 );
	  	    
   } else if (wagen1.vx < 0) {
     context.save();   
     context.lineWidth = 1;
     context.beginPath();
	  context.moveTo(wagen1.x + wagen1.width / 2, wagen1.y + wagen1.height / 2 );
	  context.lineTo(wagen1.x + wagen1.width / 2 + wagen1.vx * 40, wagen1.y + wagen1.height / 2);
	  context.lineTo(wagen1.x + wagen1.width / 2 + wagen1.vx * 40 + 6, wagen1.y + wagen1.height / 2 - 2);
	  context.lineTo(wagen1.x + wagen1.width / 2 + wagen1.vx * 40 + 6, wagen1.y + wagen1.height / 2 + 2);
	  context.lineTo(wagen1.x + wagen1.width / 2 + wagen1.vx * 40, wagen1.y + wagen1.height / 2 );
   }
   context.stroke();   
   context.fill();   
   context.restore();  
}

function geschwindigkeitsVektor2() {
   context.save();      
   context.fillStyle = "#888888";
   context.strokeStyle = "#888888";  
   if (wagen2.vx > 0) {
     context.lineWidth = 1;
	  context.beginPath();
	  context.moveTo(wagen2.x + wagen2.width / 2, wagen2.y + wagen2.height / 2 );
	  context.lineTo(wagen2.x + wagen2.width / 2 + wagen2.vx * 40, wagen2.y + wagen2.height / 2);
	  context.lineTo(wagen2.x + wagen2.width / 2 + wagen2.vx * 40 - 6, wagen2.y + wagen2.height / 2 - 2);
	  context.lineTo(wagen2.x + wagen2.width / 2 + wagen2.vx * 40 - 6, wagen2.y + wagen2.height / 2 + 2);
	  context.lineTo(wagen2.x + wagen2.width / 2 + wagen2.vx * 40, wagen2.y + wagen2.height / 2 );
	  	    
   } else if (wagen2.vx < 0) {
     context.save();   
     context.lineWidth = 1;
     context.beginPath();
	  context.moveTo(wagen2.x + wagen2.width / 2, wagen2.y + wagen2.height / 2 );
	  context.lineTo(wagen2.x + wagen2.width / 2 + wagen2.vx * 40, wagen2.y + wagen2.height / 2);
	  context.lineTo(wagen2.x + wagen2.width / 2 + wagen2.vx * 40 + 6, wagen2.y + wagen2.height / 2 - 2);
	  context.lineTo(wagen2.x + wagen2.width / 2 + wagen2.vx * 40 + 6, wagen2.y + wagen2.height / 2 + 2);
	  context.lineTo(wagen2.x + wagen2.width / 2 + wagen2.vx * 40, wagen2.y + wagen2.height / 2 );
	}
   context.stroke();   
   context.fill();   
   context.restore();  
}

function beschriftung () {
  
  context.save();    
  context.font = "15px Comic Sans MS";
  context.textAlign = "left";
  context.textBaseline = "middle"; 
  context.fillStyle = "#f063a4";  
  context.fillText("m1 = " + m1.toFixed(1) + " kg", canvas.width - 140, 40); 
  context.fillText("v1 = " + wagen1.vx.toFixed(2) + " m/s", canvas.width - 140, 60); 
  context.fillStyle = "#9252a1";
  context.fillText("m2 = " + m2.toFixed(1) + " kg", canvas.width - 140, 80); 
  context.fillText("v2 = " + wagen2.vx.toFixed(2) + " m/s", canvas.width - 140, 100); 
  context.stroke();
  context.restore();  
    
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
  //context.fill();
  context.restore();  
}


function zeichnen () {
  context.save();
  context.strokeStyle = "#f063a4"; 
  context.beginPath();
  context.moveTo(50, 150 - positionMasse1[0] / 8);
  for (let i = 1; i < positionMasse1.length; i++) {
    context.lineTo(50 + i / 2, 150 - positionMasse1[i] / 8);
  }   
  context.stroke();
  context.restore(); 
  	
  context.save(); 	
  context.strokeStyle = "#9252a1"; 
  context.beginPath();
  context.moveTo(50, 150 - positionMasse2[0] / 8);
  for (let i = 1; i < positionMasse2.length; i++) {
    context.lineTo(50 + i / 2, 150 - positionMasse2[i] / 8);
  }  
  context.stroke();
  context.restore(); 	
}

function leereFunktion() {
	
}


function animFrame(){
  onEachStep();
}  



 
function onEachStep() {
  
  canvas.clear;  
  
  if (!document.getElementById("inelastisch").checked || (document.getElementById("inelastisch").checked && (wagen2.x > wagen1.x + wagen1.width))) {
 
     zusammengehaengt = 0; 	  
     
	  if (wagen1.x < puffer) {
	    wagen1.x = puffer;    
	    wagen1.vx = wagen1.vx * (-1);
	  } else if (wagen2.x + wagen2.width > canvas.width - puffer) {
	    wagen2.x = canvas.width - puffer - wagen2.width;    
	    wagen2.vx = wagen2.vx * (-1);
	  } else if (wagen2.x - wagen1.x < wagen1.width) {
	  	 wagen2.x = wagen1.x + wagen1.width; 
	  	 v_schwerpunkt = (m1 * wagen1.vx + m2 * wagen2.vx) / (m1 + m2); 
	    wagen1.vx = wagen1.vx * (-1) + 2 * v_schwerpunkt;
	    wagen2.vx = wagen2.vx * (-1) + 2 * v_schwerpunkt; 
	  }
	  wagen1.x += wagen1.vx; 
	  wagen2.x += wagen2.vx; 
	  
  
  } else if (document.getElementById("inelastisch").checked && (zusammengehaengt == 0)) {
    if (wagen2.x < wagen1.x + wagen1.width) {
    	zusammengehaengt = 1; 
    	wagen2.x = wagen1.x + wagen1.width;	
    	v_schwerpunkt = (m1 * wagen1.vx + m2 * wagen2.vx) / (m1 + m2); 
	   wagen1.x += v_schwerpunkt;
	   wagen2.x += v_schwerpunkt;   
      } else {
      if (wagen1.x < puffer) {
	    wagen1.x = puffer;    
	    wagen1.vx = wagen1.vx * (-1);
	  } else if (wagen2.x + wagen2.width > canvas.width - puffer) {
	    wagen2.x = canvas.width - wagen2.width - puffer;    
	    wagen2.vx = wagen2.vx * (-1);
	  } else if (wagen2.x - wagen1.x < wagen1.width) {
	  	 wagen2.x = wagen1.x + wagen1.width; 
	  	 v_schwerpunkt = (m1 * wagen1.vx + m2 * wagen2.vx) / (m1 + m2); 
	    wagen1.vx = wagen1.vx * (-1) + 2 * v_schwerpunkt;
	    wagen2.vx = wagen2.vx * (-1) + 2 * v_schwerpunkt; 
	  }
	  wagen1.x += wagen1.vx; 
	  wagen2.x += wagen2.vx; 
      }
    }
    else if (document.getElementById("inelastisch").checked && (zusammengehaengt == 1)) {
    	if (wagen1.x < puffer) {
    	  wagen1.x = puffer;  
    	  wagen2.x = wagen1.x + wagen1.width;
    	  v_schwerpunkt = (m1 * wagen1.vx + m2 * wagen2.vx) / (m1 + m2); 
    	  v_schwerpunkt = v_schwerpunkt * (-1);  
    	  wagen1.vx = v_schwerpunkt;
    	  wagen2.vx = v_schwerpunkt;
        wagen1.x += wagen1.vx;
	     wagen2.x =wagen1.x + wagen1.width;
      } else if (wagen2.x + wagen2.width > canvas.width- puffer) {
	     wagen2.x = canvas.width - wagen2.width - puffer;    
	     wagen1.x = wagen2.x - wagen1.width; 
	     v_schwerpunkt = (m1 * wagen1.vx + m2 * wagen2.vx) / (m1 + m2); 
    	  v_schwerpunkt = v_schwerpunkt * (-1);
    	  wagen1.vx = v_schwerpunkt;
    	  wagen2.vx = v_schwerpunkt;
	     wagen1.x += wagen1.vx;
	     wagen2.x =wagen1.x + wagen1.width;
      } else {
        v_schwerpunkt = (m1 * wagen1.vx + m2 * wagen2.vx) / (m1 + m2); 
    	  wagen1.vx = v_schwerpunkt;
    	  wagen2.vx = v_schwerpunkt;
	     wagen1.x += wagen1.vx;
	     wagen2.x = wagen1.x + wagen1.width;
      }
    } 

    
    
    
  context.save();  
  context.clearRect(0, 0, canvas.width, canvas.height); 
  context.fillStyle = "#f8ef22"; 
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#f89e50";
  context.fillRect(0, canvas.height * 2 / 3 - 5, canvas.width, canvas.height * 2 / 30);
  
  
  wagen1.draw(context); 
  wagen2.draw(context); 
  context.restore();
  
  
  
  
  positionMasse1.push(wagen1.x);  
  if (positionMasse1.length > 1000) {
    positionMasse1.shift();
  }
  positionMasse2.push(wagen2.x);  
  if (positionMasse2.length > 1000) {
    positionMasse2.shift();
  }
 
  
  if (geschwindigkeitAnzeigen.checked) {
  	 diagramm();
  	 zeichnen();
  }
  
  if (document.getElementById("geschwindigkeitsvektor").checked) {
  	 geschwindigkeitsVektor1();
    geschwindigkeitsVektor2();
  }
  
  if (document.getElementById("massen").checked) {
  	 beschriftung();
  }
  
  context.save();  
  context.font = "15px Comic Sans MS";
  context.fillStyle = "lightgrey";
  context.textAlign = "center";
  context.textBaseline = "middle"; 
  context.fillText("1", wagen1.x + wagen1.width / 2, canvas.height * 2 / 3 - wagen1.height / 2); 
  context.fillText("2", wagen2.x + wagen2.width / 2, canvas.height * 2 / 3 - wagen2.height / 2); 
  context.restore();
  
  context.save();  
  context.fillStyle = " #31c5f4";
  context.fillRect(puffer/2, canvas.height * 2 / 3 - 30, puffer/2, canvas.height * 2 / 30);
  context.fillRect(canvas.width - puffer, canvas.height * 2 / 3 - 30, puffer/2, canvas.height * 2 / 30);
  context.restore();
   
};


function init() {
  canvas.clear;
  

  m1 = 1;
  m2 = 2;
  v1 = 2;
  v2 = 0;
  
  document.getElementById("masse_eins").addEventListener("change", masseeinseinstellen);
  document.getElementById("masse_zwei").addEventListener("change", massezweieinstellen);
  document.getElementById("geschwindigkeit_eins").addEventListener("change", geschwindigkeiteinseinstellen);
  document.getElementById("geschwindigkeit_zwei").addEventListener("change", geschwindigkeitzweieinstellen);  
  document.getElementById("start").addEventListener("click", startFunktion);  
  document.getElementById("stop").addEventListener('click', stopFunktion);
  document.getElementById("reset").addEventListener('click', resetFunktion);
  document.getElementById("inelastisch").addEventListener('onclick', inelastischerStoss);
  document.getElementById("geschwindigkeitsvektor").addEventListener('onclick', leereFunktion);
  document.getElementById("massen").addEventListener('onclick', leereFunktion);
  document.getElementById("geschwindigkeitAnzeigen").addEventListener('onclick', leereFunktion);
  document.getElementById("m1").innerHTML = m1 + ' kg';  
  document.getElementById("m2").innerHTML = m2 + ' kg';  
  document.getElementById("v1").innerHTML = v1 + ' m/s';  
  document.getElementById("v2").innerHTML = v2 + ' m/s'; 
  
 
  context.save();
  context.fillStyle = "#f063a4"; 
  context.strokeStyle = "#f063a4"; 
  wagen1 = new Box(20,"#f063a4");
  wagen1.x = puffer; wagen1.y = 250.5;
  wagen1.vx = v1; 
  wagen1.width = 50;
  wagen1.height = 20;
  wagen1.color = "#f063a4";
  wagen1.y = canvas.height * 2 / 3 - wagen1.height;
  
  wagen2 = new Box(20,"#9252a1");
  wagen2.x = 400; wagen2.y = 250.5;
  wagen2.vx = v2;
  wagen2.width = 50;
  wagen2.height = 20
  wagen2.color = "#9252a1";
  wagen2.y = canvas.height * 2 / 3 - wagen2.height;  
  context.restore();  
    
  
  context.clearRect(0, 0, canvas.width, canvas.height); 
  context.fillStyle = "#f8ef22"; 
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#f89e50";
  context.fillRect(0, canvas.height * 2 / 3 - 5, canvas.width, canvas.height * 2 / 30);
  wagen1.draw(context); 
  wagen2.draw(context); 
  
  
  context.save();  
  context.fillStyle = " #31c5f4";
  context.fillRect(puffer/2, canvas.height * 2 / 3 - 30, puffer/2, canvas.height * 2 / 30);
  context.fillRect(canvas.width - puffer, canvas.height * 2 / 3 - 30, puffer/2, canvas.height * 2 / 30);
  context.restore();
  
};

window.onload = init; 
  
animFrame();
