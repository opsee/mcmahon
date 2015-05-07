var boidAnimation = {
	Particle: function(x, y, z, radius, color) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.geometry = new THREE.SphereGeometry(radius, 8, 8);
		this.material = new THREE.MeshBasicMaterial({ color: color });
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.rotSpeed = .0002;
		this.putInPlace = function() {
			this.mesh.position.set(this.x, this.y, this.z);
		};
	},
	init: function() {
		var boidsContainer = document.getElementById("boids");

		console.log(boidsContainer.clientHeight + ", " + window.innerWidth);
		boidAnimation.scene = new THREE.Scene();
		boidAnimation.W =  window.innerWidth;
		boidAnimation.H = boidsContainer.clientHeight;
		boidAnimation.camera = new THREE.PerspectiveCamera(20, boidAnimation.W / boidAnimation.H, 0.01, 1000);
		boidAnimation.renderer = new THREE.WebGLRenderer();
		boidAnimation.particles = [];

		boidAnimation.renderer.setClearColor(0x202020);
		boidAnimation.renderer.setSize(boidAnimation.W, boidAnimation.H);

		boidAnimation.mainSphere = new THREE.Mesh(new THREE.SphereGeometry(30, 20, 20), new THREE.MeshBasicMaterial({color: 0x202020}));
		boidAnimation.mainSphere.position.set(0, 0, 0);
		boidAnimation.scene.add(boidAnimation.mainSphere);

		boidAnimation.camera.position.set(0, 50, 100);
		boidAnimation.camera.lookAt(boidAnimation.scene.position);

		document.getElementById("boids").appendChild(boidAnimation.renderer.domElement);

		boidAnimation.makeParticles(500);

		boidAnimation.render();
	},
	makeParticles: function(num) {
		var radius = boidAnimation.mainSphere.geometry.boundingSphere.radius,
			particle;
		for (var i = 0; i <= num; i++) {
			if (i % 3 === 0) {
				particle = new boidAnimation.Particle(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random()*0.4 + 0.2, 0x352424);
			} else if (i % 3 === 1) {
				particle = new boidAnimation.Particle(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random()*0.4 + 0.2, 0x4c3535);
			} else {
				particle = new boidAnimation.Particle(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random()*0.4 + 0.2, 0x604343);
			}
			particle.putInPlace();
			particle.mesh.position.normalize();
			particle.mesh.position.multiplyScalar(radius);
			boidAnimation.scene.add(particle.mesh);
			boidAnimation.particles.push(particle);
		}
	},
	updateParticles: function(p) {
		var x = p.mesh.position.x,
			y = p.mesh.position.y,
			z = p.mesh.position.z;
		p.mesh.position.x = x * Math.cos(p.rotSpeed) + z * Math.sin(p.rotSpeed);
		p.mesh.position.z = z * Math.cos(p.rotSpeed) - x * Math.sin(p.rotSpeed);
	},
	render: function() {
		requestAnimationFrame(boidAnimation.render);
		boidAnimation.particles.forEach(boidAnimation.updateParticles);
		boidAnimation.renderer.render(boidAnimation.scene, boidAnimation.camera);
	}
};

window.onload = boidAnimation.init;