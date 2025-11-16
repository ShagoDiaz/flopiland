// Confetti simple sin dependencias
const Confetti = (() => {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");

  let confetti = [];
  const colors = ["#FFB6C1", "#FFD966", "#A4D8F0", "#C7A9E6", "#F7CAC9"];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  function createPiece() {
    return {
      x: Math.random() * canvas.width,
      y: -10,
      size: 6 + Math.random() * 6,
      speed: 1 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      spin: (Math.random() - 0.5) * 0.2
    };
  }

  function update() {
    if (confetti.length < 180) confetti.push(createPiece());
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach((p) => {
      p.y += p.speed;
      p.x += Math.sin(p.y * 0.02) * 1.5;

      ctx.fillStyle = p.color;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.spin);
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    confetti = confetti.filter((p) => p.y < canvas.height + 20);

    requestAnimationFrame(update);
  }

  update();
})();

