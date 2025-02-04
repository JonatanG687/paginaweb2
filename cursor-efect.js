

    
        const canvas = 
              document.getElementById("spiralCanvas");
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const maxParticles = 150; // Máximo número de partículas en pantalla
        let mouseX = canvas.width / 2;
        let mouseY = canvas.height / 2;

        class Particle {
            constructor(x, y, angle) {
                this.x = x;
                this.y = y;
                this.angle = angle;
                this.radius = Math.random() * 50 + 30; // Radio inicial aleatorio
                this.size = Math.random() * 3 + 1; // Tamaño de las partículas
                this.color = `hsl(${Math.random() * 360}, 100%, 70%)`; // Colores vivos y aleatorios
                this.speed = Math.random() * 0.05 + 0.01; // Velocidad angular
            }

            update() {
                this.angle += this.speed;
                this.x = mouseX + Math.cos(this.angle) * this.radius;
                this.y = mouseY + Math.sin(this.angle) * this.radius;
                this.radius -= 0.3; // Las partículas se mueven hacia el centro con el tiempo
                if (this.radius <= 0) {
                    this.radius = Math.random() * 50 + 30; // Reinicia el radio
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        function createParticles() {
            if (particles.length < maxParticles) {
                particles.push(new Particle(mouseX, mouseY, Math.random() * Math.PI * 2));
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle, index) => {
                particle.update();
                particle.draw();
                if (particle.radius <= 0) {
                    particles.splice(index, 1); // Elimina partículas fuera de rango
                }
            });
            requestAnimationFrame(animateParticles);
        }

        // Actualiza las coordenadas del mouse
        window.addEventListener("mousemove", (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
            createParticles();
        });

        // Ajusta el tamaño del canvas si la ventana se redimensiona
        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // Animación inicial
        animateParticles();
    
