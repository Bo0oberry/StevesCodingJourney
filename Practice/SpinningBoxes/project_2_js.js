function randomColor(){
  const hue = Math.floor(Math.random() * 360);
  const hsl = `hsl(${hue}, 80%, 80%)`;
  return hsl;
}


function createSide(length = 300, width = 300) {
  const mainBox = document.querySelector('#project_2_boxMain');
  const newSide = document.createElement('div');
  newSide.classList.add("project_2_boxSide");
  newSide.style.width = `${width}px`;
  newSide.style.height = `${length}px`;
  newSide.style.backgroundColor = randomColor();
  mainBox.appendChild(newSide);
}

function createSquare(){
  
  
  for (var i = 0; i < 6; i++) {
    createSide();
  }
  
  const sideArray = document.querySelectorAll(".project_2_boxSide");
  if (sideArray[0]){
    // 1. Front face
    sideArray[0].style.transform = "translateZ(150px)";
    // 2. Back face
    sideArray[1].style.transform = "rotateY(180deg) translateZ(150px)";
    // 3. Top face
    sideArray[2].style.transform = "rotateX(90deg) translateZ(150px)";
    // 4. Bottom face
    sideArray[3].style.transform = "rotateX(-90deg) translateZ(150px)";
    // 5. Right face
    sideArray[4].style.transform = "rotateY(90deg) translateZ(150px)";
    // 6. Left face
    sideArray[5].style.transform = "rotateY(-90deg) translateZ(150px)";
  }
}

function createShape(){
  createSquare();
}

createShape();

function makeCubeDraggable() {
  const mainBox = document.querySelector('#project_2_boxMain');

  let isDragging = false;
  let previousPosition = { x: 0, y: 0 };
  let rotationX = -20; // Initial tilt angle
  let rotationY = 30;  // Initial turn angle

  // Set initial orientation
  mainBox.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

  // 1. Press / Touch start
  mainBox.addEventListener('pointerdown', (e) => {
    isDragging = true;
    previousPosition = { x: e.clientX, y: e.clientY };
    mainBox.setPointerCapture(e.pointerId); // Maintains tracking if drag leaves element bounds
  });

  // 2. Drag / Move
  mainBox.addEventListener('pointermove', (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - previousPosition.x;
    const deltaY = e.clientY - previousPosition.y;

    const sensitivity = 0.5; // Adjust rotation speed

    // Horizontal movement rotates around Y-axis; vertical movement rotates around X-axis
    rotationY += deltaX * sensitivity;
    rotationX -= deltaY * sensitivity;

    mainBox.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

    previousPosition = { x: e.clientX, y: e.clientY };
  });

  // 3. Release / Cancel
  const stopDragging = (e) => {
    if (isDragging) {
      isDragging = false;
      mainBox.releasePointerCapture(e.pointerId);
    }
  };

  mainBox.addEventListener('pointerup', stopDragging);
  mainBox.addEventListener('pointercancel', stopDragging);
}

// Execute setup
makeCubeDraggable();
