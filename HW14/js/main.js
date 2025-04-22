var scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 20, 100);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


var pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(20, 50, 20);
scene.add(pointLight);

var ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

var redCube, colorfulCube, skull;

redCube = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshStandardMaterial({ color: 0xff0000 }) 
);
redCube.position.x = -20;
scene.add(redCube);

colorfulCube = new THREE.Mesh(
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.MeshNormalMaterial() 
);
colorfulCube.position.x = 20;
scene.add(colorfulCube);

var loader = new THREE.OBJLoader();
loader.load('./models/Skull.obj', function (object) {
  skull = object;
  skull.scale.set(0.2, 0.2, 0.2);
  skull.rotation.x = -Math.PI / 2; 
  skull.position.set(0, 0, 0); 
  scene.add(skull);
});

function animate() {
  requestAnimationFrame(animate);

  redCube.rotation.x += 0.01;
  redCube.rotation.y += 0.01;

  colorfulCube.rotation.x += 0.01;
  colorfulCube.rotation.y += 0.01;

  if (skull) {
    skull.rotation.y += 0.01; 
  }

  renderer.render(scene, camera);
}
animate();
