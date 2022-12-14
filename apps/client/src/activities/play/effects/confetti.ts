
var maxParticleCount = 300;
var particleSpeed = 1;
var colors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"]
var streamingConfetti = false;
var animationTimer: number | null = null;
var particles: any[] = [];
var waveAngle = 0;

function resetParticle(particle: { color?: any; x?: any; y?: any; diameter?: any; tilt?: any; tiltAngleIncrement?: any; tiltAngle?: any; }, width: number, height: number) {
    particle.color = colors[(Math.random() * colors.length) | 0];
    particle.x = Math.random() * width;
    particle.y = Math.random() * height - height;
    particle.diameter = Math.random() * 10 + 5;
    particle.tilt = Math.random() * 10 - 10;
    particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
    particle.tiltAngle = 0;
    return particle;
}

export function startConfetti() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var canvas = document.getElementById("confetti-canvas") as HTMLCanvasElement;

    if (canvas === null) {
        canvas = document.createElement("canvas");
        canvas.setAttribute("id", "confetti-canvas");
        canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none;position:fixed;top:0;left:0;width:100%;height:100%;");
        document.body.prepend(canvas);
        canvas.width = width;
        canvas.height = height;
        window.addEventListener("resize", function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }, true);
    }
    var context = canvas.getContext("2d");

    while (particles.length < maxParticleCount)
        particles.push(resetParticle({}, width, height));
    streamingConfetti = true;
    if (animationTimer === null) {
        (function runAnimation() {
            context!.clearRect(0, 0, canvas.width, canvas.height);
            if (particles.length === 0)
                animationTimer = null;
            else {
                updateParticles();
                drawParticles(context);
                animationTimer = requestAnimationFrame(runAnimation);
            }
        })();
    }
}

export function stopConfetti() {
    streamingConfetti = false;
}

export function removeConfetti() {
    stopConfetti();
    particles = [];
}

export function toggleConfetti() {
    if (streamingConfetti)
        stopConfetti();
    else
        startConfetti();
}

function drawParticles(context: CanvasRenderingContext2D | null) {
    var particle;
    var x;
    if (!context) return;
    for (var i = 0; i < particles.length; i++) {
        particle = particles[i];
        context.beginPath();
        context.lineWidth = particle.diameter;
        context.strokeStyle = particle.color;
        x = particle.x + particle.tilt;
        context.moveTo(x + particle.diameter / 2, particle.y);
        context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
        context.stroke();
    }
}

function updateParticles() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    var particle;
    waveAngle += 0.01;
    for (var i = 0; i < particles.length; i++) {
        particle = particles[i];
        if (!streamingConfetti && particle.y < -15)
            particle.y = height + 100;
        else {
            particle.tiltAngle += particle.tiltAngleIncrement;
            particle.y += (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5;
            particle.tilt = Math.sin(particle.tiltAngle) * 15;
        }
        if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
            if (streamingConfetti && particles.length <= maxParticleCount)
                resetParticle(particle, width, height);
            else {
                particles.splice(i, 1);
                i--;
            }
        }
    }
}
