import * as Three from "./libraries/three.module.js";

const main = document.querySelector("main");

// scene setup
const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(75, 720 / 720, .1, 1000);
const renderer = new Three.WebGLRenderer();

const light = new Three.DirectionalLight(0x777777, 1);
light.position.z = 5;
scene.add(light);

const ambientLight = new Three.AmbientLight(0x777777, 1);
scene.add(ambientLight);

renderer.setClearColor(0x777777, 1);
renderer.setSize(720, 720);

main.appendChild(renderer.domElement);


// starting animation
const startTime = Date.now();

let i = -1;

const shapes = [];

// let floorObject = null;

// temp
const functions = [
	() => {
		const point = createPointMesh();
		shapes.push(point);

		camera.position.z = 1;
	},

	() => {
		const group = new Three.Group();

		const axis = new Three.Mesh(new Three.CylinderGeometry(.015, .015, .3), new Three.MeshLambertMaterial({color: 0xFF0000, transparent: true}));
		axis.position.set(0, .15, 0);
		group.add(axis);

		const point1 = createPointMesh(.03, 0xFF0000);
		point1.position.set(0, 0, 0);
		group.add(point1);

		const point2 = createPointMesh(.03, 0xFF0000);
		point2.position.set(0, .3, 0);
		group.add(point2);

		shapes.push(group);

		camera.position.y = .15;
	},

	() => {
		shapes[0].visible = false;

		const group = new Three.Group();

		const axis = new Three.Mesh(new Three.CylinderGeometry(.015, .015, 1), new Three.MeshLambertMaterial({color: 0xFFFF00, transparent: true}));
		axis.rotateZ(Math.PI / 2);
		axis.position.set(.5, 0, 0);
		group.add(axis);

		shapes.push(group);

		camera.position.set(.5, .15, 1.25);
	},

	() => {
		shapes[1].rotateZ(-Math.PI / 2);
		// shapes[1].position.set(.15, 0, 0);
	},

	() => {
		const group = new Three.Group();

		const point1 = createPointMesh(.03, 0xFF7700);
		point1.position.set(.6, 0, 0);
		group.add(point1);

		const point2 = createPointMesh(.03, 0xFF7700);
		point2.position.set(.9, 0, 0);
		group.add(point2);

		shapes.push(group);
	},

	() => {
		const axis = new Three.Mesh(new Three.CylinderGeometry(.025, .025, .3), new Three.MeshLambertMaterial({color: 0x333333, transparent: true}));
		axis.rotateZ(Math.PI / 2);
		axis.position.set(.75, 0, 0);
		shapes.push(axis);
	},

	() => {
		shapes[4].visible = false;
		
		const axis = new Three.Mesh(new Three.CylinderGeometry(.025, .025, .3), new Three.MeshLambertMaterial({color: 0x333333, transparent: true}));
		axis.position.set(.75, .15, 0);
		shapes.push(axis);

		const point = createPointMesh(.03, 0xFF7700);
		point.position.set(.75, .3, 0);
		shapes[3].add(point);
	},

	() => {
		shapes[5].visible = false;
		
		const angle = Math.PI / 2 - Math.atan2(.3, .15);
		const hypot = Math.sqrt(.3 ** 2 + .15 ** 2);
		const axis1 = new Three.Mesh(new Three.CylinderGeometry(.015, .015, hypot), new Three.MeshLambertMaterial({color: 0xFF7700, transparent: true}));
		const axis2 = axis1.clone();

		axis1.rotateZ(-angle);
		axis1.position.set(.675, .15, 0);

		axis2.rotateZ(angle);
		axis2.position.set(.825, .15, 0);

		shapes[3].add(axis1);
		shapes[3].add(axis2);
	},

	() => {
		shapes[1].visible = false;

		const axis1 = shapes[2].children[0].clone();
		const axis2 = axis1.clone();
		axis2.rotateX(-Math.PI / 2);

		const axis3 = axis2.clone();

		axis1.position.z = -1;
		shapes[2].add(axis1);

		axis2.position.set(0, 0, -.5);
		shapes[2].add(axis2);

		axis3.position.set(1, 0, -.5);
		shapes[2].add(axis3);

		camera.position.set(1.25, .75, .75);
		camera.lookAt(.5, .15, -.5);
	},

	() => {
		shapes[3].rotateX(-Math.PI / 2);

		const center = new Three.Vector2(.25, -.75);
		let angle = .4;

		const group = new Three.Group();

		for (let i = 0; i < 3; i++) {
			const point = createPointMesh(.03, 0x77FF00);
			point.position.set(center.x + .15 * Math.cos(angle), 0, center.y + .15 * Math.sin(angle));
			group.add(point);
			
			angle += Math.PI * 2 / 3;
		}

		shapes.push(group);
	},
];

animationLoop();

function animationLoop() {
	// floorObject.material.opacity = ((Date.now() - startTime) / 3000) ** 2;

	if (Date.now() - i * 1000 - startTime > 1000) {
		i++;

		scene.remove(...shapes);

		if (functions[i]) {
			functions[i]();
		} else {
			return;
		}

		scene.add(...shapes);

		renderer.render(scene, camera);
	}

	requestAnimationFrame(animationLoop);
}

function createPointMesh(radius=.05, color=0xFFFFFF) {
	return new Three.Mesh(new Three.SphereGeometry(radius), new Three.MeshLambertMaterial({color, transparent: true}));
}
/* 
function setDimensionViewer(d) {
	switch (d) {
		case 1: {
			floorObject = createPointMesh();
			scene.add(floorObject);
			break;
		}

		default:
			throw new RangeError();
	}
} */