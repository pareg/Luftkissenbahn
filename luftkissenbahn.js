let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d'); 
let wagen1, wagen2;
let m1, m2, v1, v2, v_schwerpunkt;
let dx = 0;
let start; 
let startVariable = 0; 




/*
Farben:
#53EAF5
#C463F5
#82EDF5
#F5A269
#D8F576


*/

function masseeinseinstellen() {
	 m1 = parseFloat(document.getElementById("masse_eins").value);
	 document.getElementById("m1").innerHTML = parseFloat(document.getElementById("masse_eins").value) + ' kg';
	 return m1;
}

function massezweieinstellen() {
	 m2 = parseFloat(document.getElementById("masse_zwei").value);
	 document.getElementById("m2").innerHTML = parseFloat(document.getElementById("masse_zwei").value) + ' kg';
	 return m2;
}

function startFunktion() {
 
}


window.onload = init; 


 
function init() {
  
  
  
  document.getElementById("masse_eins").addEventListener("change", masseeinseinstellen);
  document.getElementById("masse_zwei").addEventListener("change", massezweieinstellen);
  document.getElementById("start").addEventListener("onclick", startFunktion);  
  


  m1 = 1;
  m2 = 1;
  v1 = 2;
  v2 = 0;
 
  
  document.getElementById("m1").innerHTML = m1 + ' kg';  
  document.getElementById("m2").innerHTML = m2 + ' kg';  
  
  
  wagen1 = new Box(20,"#FF19D3");
  wagen1.x = 50; wagen1.y = 250;
  wagen1.vx = v1;
  wagen1.width = 30;
  wagen1.height = 15;
  wagen1.color = "#2514F5";
  wagen1.y = canvas.height * 2 / 3 - wagen1.height;
  
  wagen2 = new Box(20,"#74E660");
  wagen2.x = 500; wagen2.y = 250;
  wagen2.vx = v2;
  wagen2.width = 50;
  wagen2.height = 20
  wagen2.color = "#F551B1";
  wagen2.y = canvas.height * 2 / 3 - wagen2.height;
  
  wagen1.draw(context);
  wagen2.draw(context);
  
  animFrame();

};

function animFrame(){
  
  requestAnimationFrame(animFrame,canvas);
  onEachStep();
}
 
function onEachStep() {
    
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
  
  context.clearRect(0, 0, canvas.width, canvas.height); 
  context.fillStyle = "#51EDF5";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#AAAAAA";
  context.fillRect(0, canvas.height * 2 / 3 - 5, canvas.width, canvas.height * 2 / 30);
  wagen1.draw(context); 
  wagen2.draw(context); 
  
  
};
 