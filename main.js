import * as THREE from 'three';

let inputX = 0;
let inputY = 0;
const maxVel = 0.7;
const acceleration = 1.2;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const geometry = new THREE.CircleGeometry(5, 32);
const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const circle = new THREE.Mesh(geometry, material);

scene.add(circle);



document.addEventListener('keydown', (event) => {
    if(event.key == 'ArrowLeft'){
        inputX -= 0.2 * acceleration;
    }
    if(event.key == 'ArrowRight'){
        inputX += 0.2 * acceleration;
    }
    if(event.key == 'ArrowUp'){
        inputY += 0.2 * acceleration;
    }
    if(event.key == 'ArrowDown'){
        inputY -= 0.2 * acceleration;
    }
    if(inputX > maxVel){
        inputX = maxVel;
    }
    if(inputX < -maxVel){
        inputX = -maxVel;
    }
    if(inputY > maxVel){
        inputY = maxVel;
    }
    if(inputY < -maxVel){
        inputY = -maxVel;
    }
    console.log(inputX)
    console.log(inputY)
});

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
            inputX = 0;
            break;
        case 'ArrowUp':
        case 'ArrowDown':
            inputY = 0;
            break;
    }
});

function animate() {
    requestAnimationFrame(animate);

    circle.position.x += inputX;
    circle.position.y += inputY;

    renderer.render(scene, camera);
}


animate();