let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d'); 
let ball;
let m1, m2, v1, v2, v_schwerpunkt;
let dx = 0;

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



window.onload = init; 


 
function init() {
  
  
  
  document.getElementById("masse_eins").addEventListener("change", masseeinseinstellen);
  document.getElementById("masse_zwei").addEventListener("change", massezweieinstellen);

  m1 = 1;
  m2 = 1;
  v1 = 2;
  v2 = 0;
  
  document.getElementById("m1").innerHTML = m1 + ' kg';  
  document.getElementById("m2").innerHTML = m2 + ' kg';  
  
  
  ball1 = new Ball(20,"#0000ff");
  ball1.x = 50; ball1.y = 250;
  ball1.vx = v1;
  
  ball2 = new Ball(20,"#0000ff");
  ball2.x = 500; ball2.y = 250;
  ball2.vx = v2;
  
  ball1.draw(context);
  ball2.draw(context);
  animFrame();
};

function animFrame(){
  
  requestAnimationFrame(animFrame,canvas);
  onEachStep();
}
 
function onEachStep() {
  
  
  
  
  if (ball1.x + ball1.radius > canvas.width) {
    ball1.x = canvas.width - ball1.radius;    
    ball1.vx = ball1.vx * (-1);
  } else if (ball1.x - ball1.radius < 0) {
    ball1.x = 0 + ball1.radius;    
    ball1.vx = ball1.vx * (-1);
  }  
  
  if (ball2.x + ball2.radius > canvas.width) {
    ball2.x = canvas.width - ball2.radius;    
    ball2.vx = ball2.vx * (-1);
  } else if (ball2.x - ball2.radius < 0) {
    ball2.x = 0 + ball2.radius;    
    ball2.vx = ball2.vx * (-1);
  }
  
  if (ball2.x - ball1.x < ball1.radius + ball2.radius ) {
  	 
    dx = (ball1.x + ball1.radius) - (ball2.x - ball2.radius);    
    ball1.x = ball1.x - dx / 2 ;
    ball2.x = ball2.x + dx / 2 ; 
  	 v_schwerpunkt = (m1 * ball1.vx + m2 * ball2.vx) / (m1 + m2); 
    ball1.vx = ball1.vx * (-1) + 2 * v_schwerpunkt;
    ball2.vx = ball2.vx * (-1) + 2 * v_schwerpunkt; 
   
    
  }
	
  ball1.x += ball1.vx; 
  ball2.x += ball2.vx; 
  
  context.clearRect(0, 0, canvas.width, canvas.height); 
  
  ball1.draw(context); 
  ball2.draw(context); 
  
  
};
 