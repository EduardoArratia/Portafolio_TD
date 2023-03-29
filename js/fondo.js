const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Generate wave pattern
const waveHeight = 100;
const waveWidth = 20;
const waveSpacing = 30;
const amplitude = 10;
const frequency = 0.05;

function generateWavePattern(offset) {
  ctx.beginPath();
  ctx.moveTo(0, height / 2);

  for (let x = 0; x < width; x += waveWidth) {
    ctx.lineTo(x, (height / 2) + (waveHeight * Math.sin(x * frequency + offset) * amplitude));
  }

  ctx.lineTo(width, height);
  ctx.lineTo(0, height);
  ctx.closePath();
}

// Animation loop
let offset = 0;
function animate() {
  requestAnimationFrame(animate);

  // Clear canvas
  ctx.clearRect(0, 0, width, height);

  // Generate and draw wave pattern
  generateWavePattern(offset);
  ctx.fillStyle = '#000';
  ctx.fill();

  // Apply blur effect
  const blurRadius = 10;
  ctx.filter = `blur(${blurRadius}px)`;

  // Convert canvas to grayscale
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  for (let i = 0; i < data.length; i += 4) {
    const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = brightness;
    data[i + 1] = brightness;
    data[i + 2] = brightness;
  }

  ctx.putImageData(imageData, 0, 0);

  // Update wave offset for animation
  offset += 0.1;
}

animate();