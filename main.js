import * as THREE from 'three';

import io from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
    console.log('Conectado al servidor');
  });


let movOnX = 0;
let movOnY = 0;


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

socket.on('outputs', (data) => {
    movOnX = data.inputX;
    movOnY = data.inputY;
    console.log(data)
});

document.addEventListener('keydown', (event) => {
    if(event.key == 'ArrowLeft'){
        socket.emit('arrowleft')
    }
    if(event.key == 'ArrowRight'){
        socket.emit('arrowright')
    }
    if(event.key == 'ArrowUp'){
       socket.emit('arrowup')
    }
    if(event.key == 'ArrowDown'){
        socket.emit('arrowdown')
    }
});


function animate() {
    requestAnimationFrame(animate);

    circle.position.x += movOnX;
    circle.position.y += movOnY;

    renderer.render(scene, camera);
    movOnX = 0;
    movOnY = 0;
}


animate();