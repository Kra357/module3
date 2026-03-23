// зрачки
const pupil1 = document.querySelector(".pupil1");
const pupil2 = document.querySelector(".pupil2");
const pupil1Img = document.querySelector(".pupil1 img");
const pupil2Img = document.querySelector(".pupil2 img");

function movePupil(container, pupilImg, event) {
  const rect = container.getBoundingClientRect();

  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const mouseX = event.clientX;
  const mouseY = event.clientY;

  let deltaX = mouseX - centerX;
  let deltaY = mouseY - centerY;

  const pupilWidth = pupilImg.offsetWidth;
  const pupilHeight = pupilImg.offsetHeight;
  const maxX = rect.width / 3 - pupilWidth / 3;
  const maxY = rect.height / 3 - pupilHeight / 3;

  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  if (distance > 0) {
    deltaX = deltaX / distance;
    deltaY = deltaY / distance;
  }
  let moveX = deltaX * Math.min(distance, maxX);
  let moveY = deltaY * Math.min(distance, maxY);
  pupilImg.style.transform = `translate(${moveX}px, ${moveY}px)`;
}
document.addEventListener("mousemove", (event) => {
  movePupil(pupil1, pupil1Img, event);
  movePupil(pupil2, pupil2Img, event);
});

// рисование

// Получаем элементы
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const book = document.querySelector(".book");
const penBtn = document.querySelector(".pen");
const eraserBtn = document.querySelector(".eraser");

// Настройки рисования
let isDrawing = false;
let currentTool = "pen";
let lastX = 0;
let lastY = 0;

// Настройки размеров
const PEN_SIZE = 1;
const ERASER_SIZE = 3;
// Массив для хранения точек (для сглаживания)
let points = [];
// Устанавливаем размер canvas с учетом retina экранов
function resizeCanvas() {
  const rect = book.getBoundingClientRect();

  // Учитываем плотность пикселей для четкости
  const dpr = window.devicePixelRatio || 1;

  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;

  ctx.scale(dpr, dpr);
}

// Устанавливаем размер canvas
function resizeCanvas() {
  const rect = book.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;

  // Сохраняем существующий рисунок при изменении размера
  const existingDrawing = ctx.getImageData(0, 0, canvas.width, canvas.height);
  canvas.width = rect.width;
  canvas.height = rect.height;
  ctx.putImageData(existingDrawing, 0, 0);

  // Настройка кисти
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
}
// Функция для рисования гладкой линии
function drawSmoothLine(x1, y1, x2, y2) {
  if (currentTool === "pen") {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = PEN_SIZE;
  } else {
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = ERASER_SIZE;
  }
}
// Инициализация canvas
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Функция рисования
function draw(e) {
  if (!isDrawing) return;

  // Получаем координаты относительно canvas
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  let currentX = (e.clientX - rect.left) * scaleX;
  let currentY = (e.clientY - rect.top) * scaleY;
  // Ограничиваем координаты в пределах canvas
  currentX = Math.min(Math.max(currentX, 0), canvas.width);
  currentY = Math.min(Math.max(currentY, 0), canvas.height);

  // Настройка кисти в зависимости от инструмента
  if (currentTool === "pen") {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = "#000000"; // Черный цвет (можно изменить на любой)
    ctx.lineWidth = PEN_SIZE;
  } else {
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = ERASER_SIZE;
  }
  // Рисуем линию
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(currentX, currentY);
  ctx.stroke();

  // Обновляем последние координаты
  lastX = currentX;
  lastY = currentY;
}

// Начало рисования
function startDrawing(e) {
  isDrawing = true;
  // Получаем начальные координаты
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  lastX = (e.clientX - rect.left) * scaleX;
  lastY = (e.clientY - rect.top) * scaleY;

  // Ограничиваем координаты
  lastX = Math.min(Math.max(lastX, 0), canvas.width);
  lastY = Math.min(Math.max(lastY, 0), canvas.height);
  // Рисуем точку при клике
  if (currentTool === "pen") {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(lastX, lastY, PEN_SIZE / 2, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(lastX, lastY, ERASER_SIZE / 2, 0, Math.PI * 2);
    ctx.fill();
  }
}
// Конец рисования
function stopDrawing() {
  isDrawing = false;
}
// Обработчики событий для рисования
canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);
// Переключение инструментов
penBtn.addEventListener("click", () => {
  currentTool = "pen";
  penBtn.classList.add("active");
  eraserBtn.classList.remove("active");
  canvas.style.cursor = "crosshair";
});

eraserBtn.addEventListener("click", () => {
  currentTool = "eraser";
  eraserBtn.classList.add("active");
  penBtn.classList.remove("active");
  canvas.style.cursor = "cell";
});
// Активируем перо по умолчанию
penBtn.classList.add("active");

// Дополнительная функция: очистка всего canvas (опционально)
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Можно добавить сохранение по нажатию клавиши S
document.addEventListener("keydown", (e) => {
  if (e.key === "s" || e.key === "S") {
    e.preventDefault();
    saveDrawing();
  }
});
