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

// // рисование
// const canvas = document.getElementById("drawingCanvas");
// const ctx = canvas.getContext("2d");
// const book = document.querySelector(".book");
// const penBtn = document.querySelector(".pen");
// const eraserBtn = document.querySelector(".eraser");

// let isDrawing = false;
// let currentTool = "pen";
// let lastX = 0;
// let lastY = 0;

// const PEN_SIZE = 2;
// const ERASER_SIZE = 15;

// let points = [];

// const penCursorSvg = `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>`)}`;

// const eraserCursorSvg = `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>`)}`;

// function resizeCanvas() {
//   const rect = book.getBoundingClientRect();
//   const dpr = window.devicePixelRatio || 1;
//   let existingDrawing = null;
//   if (canvas.width > 0 && canvas.height > 0) {
//     existingDrawing = ctx.getImageData(0, 0, canvas.width, canvas.height);
//   }
//   canvas.width = rect.width * dpr;
//   canvas.height = rect.height * dpr;

//   ctx.scale(dpr, dpr);
//   if (existingDrawing) {
//     ctx.putImageData(existingDrawing, 0, 0);
//   }
//   canvas.style.width = rect.width + "px";
//   canvas.style.height = rect.height + "px";
//   ctx.lineCap = "round";
//   ctx.lineJoin = "round";
// }

// resizeCanvas();
// window.addEventListener("resize", () => {
//   clearTimeout(window.resizeTimer);
//   window.resizeTimer = setTimeout(resizeCanvas, 100);
// });

// function getCoordinates(e) {
//   const rect = canvas.getBoundingClientRect();
//   return {
//     x: e.clientX - rect.left,
//     y: e.clientY - rect.top,
//   };
// }

// function drawPencilLine(x1, y1, x2, y2) {
//   const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
//   const steps = Math.max(1, distance / 2); // Шаг каждые 2 пикселя

//   for (let i = 0; i < steps; i++) {
//     const t = i / steps;
//     const x = x1 + (x2 - x1) * t;
//     const y = y1 + (y2 - y1) * t;

//     for (let j = 0; j < 3; j++) {
//       const offsetX = (Math.random() - 0.5) * PEN_SIZE * 1.5;
//       const offsetY = (Math.random() - 0.5) * PEN_SIZE * 1.5;
//       const size = Math.random() * PEN_SIZE * 0.6 + PEN_SIZE * 0.4;
//       const opacity = Math.random() * 0.3 + 0.7;

//       ctx.globalAlpha = opacity;
//       ctx.fillStyle = "#2a2a2a";
//       ctx.beginPath();
//       ctx.arc(x + offsetX, y + offsetY, size / 2, 0, Math.PI * 2);
//       ctx.fill();
//     }
//   }

//   ctx.globalAlpha = 1;
// }

// function drawSmoothLine() {
//   if (points.length < 2) return;

//   ctx.beginPath();
//   ctx.moveTo(points[0].x, points[0].y);

//   for (let i = 1; i < points.length - 1; i++) {
//     const xc = (points[i].x + points[i + 1].x) / 2;
//     const yc = (points[i].y + points[i + 1].y) / 2;
//     ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
//   }

//   if (currentTool === "pen") {
//     const pathPoints = [];
//     for (let i = 0; i < points.length - 1; i++) {
//       drawPencilLine(
//         points[i].x,
//         points[i].y,
//         points[i + 1].x,
//         points[i + 1].y,
//       );
//     }
//   } else {
//     ctx.globalCompositeOperation = "destination-out";
//     ctx.lineWidth = ERASER_SIZE;
//     ctx.stroke();
//   }
// }

// function startDrawing(e) {
//   isDrawing = true;
//   const coords = getCoordinates(e);
//   lastX = coords.x;
//   lastY = coords.y;
//   points = [{ x: lastX, y: lastY }];

//   if (currentTool === "pen") {
//     ctx.globalCompositeOperation = "source-over";
//     drawPencilLine(lastX, lastY, lastX, lastY);
//   }
// }

// function draw(e) {
//   if (!isDrawing) return;

//   const coords = getCoordinates(e);
//   points.push({ x: coords.x, y: coords.y });

//   if (points.length > 5) {
//     points.shift();
//   }

//   if (currentTool === "pen") {
//     drawPencilLine(lastX, lastY, coords.x, coords.y);
//   } else {
//     ctx.globalCompositeOperation = "destination-out";
//     ctx.lineWidth = ERASER_SIZE;
//     ctx.beginPath();
//     ctx.moveTo(lastX, lastY);
//     ctx.lineTo(coords.x, coords.y);
//     ctx.stroke();
//   }

//   lastX = coords.x;
//   lastY = coords.y;
// }

// function stopDrawing() {
//   isDrawing = false;
//   points = [];
// }

// canvas.addEventListener("mousedown", startDrawing);
// canvas.addEventListener("mousemove", draw);
// canvas.addEventListener("mouseup", stopDrawing);
// canvas.addEventListener("mouseleave", stopDrawing);

// canvas.addEventListener("touchstart", (e) => {
//   e.preventDefault();
//   const touch = e.touches[0];
//   const mouseEvent = new MouseEvent("mousedown", {
//     clientX: touch.clientX,
//     clientY: touch.clientY,
//   });
//   canvas.dispatchEvent(mouseEvent);
// });

// canvas.addEventListener("touchmove", (e) => {
//   e.preventDefault();
//   const touch = e.touches[0];
//   const mouseEvent = new MouseEvent("mousemove", {
//     clientX: touch.clientX,
//     clientY: touch.clientY,
//   });
//   canvas.dispatchEvent(mouseEvent);
// });

// canvas.addEventListener("touchend", () => {
//   const mouseEvent = new MouseEvent("mouseup", {});
//   canvas.dispatchEvent(mouseEvent);
// });

// // Переключение инструментов
// penBtn.addEventListener("click", () => {
//   currentTool = "pen";
//   penBtn.classList.add("active");
//   eraserBtn.classList.remove("active");
//   canvas.style.cursor = `url('${penCursorSvg}') 0 24, auto`;
// });

// eraserBtn.addEventListener("click", () => {
//   currentTool = "eraser";
//   eraserBtn.classList.add("active");
//   penBtn.classList.remove("active");
//   canvas.style.cursor = `url('${eraserCursorSvg}') 0 24, auto`;
// });

// eraserBtn.addEventListener("dblclick", () => {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
// });

// penBtn.classList.add("active");
// canvas.style.cursor = `url('${penCursorSvg}') 0 24, auto`;

// window.addEventListener(
//   "keydown",
//   function (e) {
//     if ((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
//       e.preventDefault();
//       e.stopImmediatePropagation();

//       const link = document.createElement("a");
//       link.download = "drawing.jpg";
//       link.href = canvas.toDataURL("image/jpeg", 0.9);
//       link.click();

//       return false;
//     }
//   },
//   true,
// );

// рисование
const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
const book = document.querySelector(".book");
const penBtn = document.querySelector(".pen");
const eraserBtn = document.querySelector(".eraser");
const colorPicker = document.querySelector(".color"); // ИСПРАВЛЕНО
const palette = document.querySelector(".palette");
const colorOptions = document.querySelectorAll(".color-option");

let isDrawing = false;
let currentTool = "pen";
let currentColor = "#2a2a2a";
let lastX = 0;
let lastY = 0;

const PEN_SIZE = 2;
const ERASER_SIZE = 15;

let points = [];

// SVG курсоры
const penCursorSvg = `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>`)}`;

const eraserCursorSvg = `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>`)}`;

// Выбор цвета
colorOptions.forEach((option) => {
  option.addEventListener("click", (e) => {
    currentColor = e.target.dataset.color;
    currentTool = "pen";
    penBtn.classList.add("active");
    eraserBtn.classList.remove("active");
    canvas.style.cursor = `url('${penCursorSvg}') 0 24, auto`;

    // Подсветка выбранного цвета
    colorOptions.forEach((opt) => opt.classList.remove("active"));
    e.target.classList.add("active");
  });
});

// Установка первого цвета активным
if (colorOptions.length > 0) {
  colorOptions[0].classList.add("active");
}

// Остальной код без изменений...
function resizeCanvas() {
  const rect = book.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  let existingDrawing = null;
  if (canvas.width > 0 && canvas.height > 0) {
    existingDrawing = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  ctx.scale(dpr, dpr);
  if (existingDrawing) {
    ctx.putImageData(existingDrawing, 0, 0);
  }
  canvas.style.width = rect.width + "px";
  canvas.style.height = rect.height + "px";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
}

resizeCanvas();
window.addEventListener("resize", () => {
  clearTimeout(window.resizeTimer);
  window.resizeTimer = setTimeout(resizeCanvas, 100);
});

function getCoordinates(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

function drawPencilLine(x1, y1, x2, y2) {
  const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const steps = Math.max(1, distance / 2);

  for (let i = 0; i < steps; i++) {
    const t = i / steps;
    const x = x1 + (x2 - x1) * t;
    const y = y1 + (y2 - y1) * t;

    for (let j = 0; j < 3; j++) {
      const offsetX = (Math.random() - 0.5) * PEN_SIZE * 1.5;
      const offsetY = (Math.random() - 0.5) * PEN_SIZE * 1.5;
      const size = Math.random() * PEN_SIZE * 0.6 + PEN_SIZE * 0.4;
      const opacity = Math.random() * 0.3 + 0.7;

      ctx.globalAlpha = opacity;
      ctx.fillStyle = currentColor;
      ctx.beginPath();
      ctx.arc(x + offsetX, y + offsetY, size / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.globalAlpha = 1;
}

function startDrawing(e) {
  isDrawing = true;
  const coords = getCoordinates(e);
  lastX = coords.x;
  lastY = coords.y;
  points = [{ x: lastX, y: lastY }];

  if (currentTool === "pen") {
    ctx.globalCompositeOperation = "source-over";
    drawPencilLine(lastX, lastY, lastX, lastY);
  }
}

function draw(e) {
  if (!isDrawing) return;

  const coords = getCoordinates(e);
  points.push({ x: coords.x, y: coords.y });

  if (points.length > 5) {
    points.shift();
  }

  if (currentTool === "pen") {
    drawPencilLine(lastX, lastY, coords.x, coords.y);
  } else {
    ctx.globalCompositeOperation = "destination-out";
    ctx.lineWidth = ERASER_SIZE;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  }

  lastX = coords.x;
  lastY = coords.y;
}

function stopDrawing() {
  isDrawing = false;
  points = [];
}

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseleave", stopDrawing);

canvas.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY,
  });
  canvas.dispatchEvent(mouseEvent);
});

canvas.addEventListener("touchmove", (e) => {
  e.preventDefault();
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY,
  });
  canvas.dispatchEvent(mouseEvent);
});

canvas.addEventListener("touchend", () => {
  const mouseEvent = new MouseEvent("mouseup", {});
  canvas.dispatchEvent(mouseEvent);
});

// Переключение инструментов
penBtn.addEventListener("click", () => {
  currentTool = "pen";
  penBtn.classList.add("active");
  eraserBtn.classList.remove("active");
  canvas.style.cursor = `url('${penCursorSvg}') 0 24, auto`;
});

eraserBtn.addEventListener("click", () => {
  currentTool = "eraser";
  eraserBtn.classList.add("active");
  penBtn.classList.remove("active");
  canvas.style.cursor = `url('${eraserCursorSvg}') 0 24, auto`;
});

eraserBtn.addEventListener("dblclick", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

penBtn.classList.add("active");
canvas.style.cursor = `url('${penCursorSvg}') 0 24, auto`;

// Сохранение
window.addEventListener(
  "keydown",
  function (e) {
    if ((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
      e.preventDefault();
      e.stopImmediatePropagation();

      const link = document.createElement("a");
      link.download = "drawing.jpg";
      link.href = canvas.toDataURL("image/jpeg", 0.9);
      link.click();

      return false;
    }
  },
  true,
);
// тут я пытаюсь сделать кликабельным предемты под шкафом

const wardrobe = document.querySelector(".wardrobebackground");
const closedoor = document.querySelector(".closedoor");
const items = document.querySelectorAll(".men, .baghse, .hair, .hair2, .bookk");

let closeTimeout;

closedoor.addEventListener("mouseenter", () => {
  wardrobe.classList.add("door-open");
});

function scheduleClose() {
  clearTimeout(closeTimeout);
  closeTimeout = setTimeout(() => {
    wardrobe.classList.remove("door-open");
  }, 50);
}

function cancelClose() {
  clearTimeout(closeTimeout);
}

closedoor.addEventListener("mouseleave", scheduleClose);

items.forEach((item) => {
  item.addEventListener("mouseenter", cancelClose);
  item.addEventListener("mouseleave", scheduleClose);
});

wardrobe.addEventListener("mouseleave", scheduleClose);

// Ждем загрузки страницы
document.addEventListener("DOMContentLoaded", function () {
  // Получаем все элементы
  const wardrobe = document.querySelector(".wardrobebackground");
  const men = document.querySelector(".men");
  const memwithhair = document.querySelector(".memwithhair");
  const mangirl = document.querySelector(".mangirl");
  const manhse = document.querySelector(".manhse");
  const baghse = document.querySelector(".baghse");
  const hair = document.querySelector(".hair");
  const hair2 = document.querySelector(".hair2");
  const bookk = document.querySelector(".bookk");

  // Скрываем варианты персонажей по умолчанию
  memwithhair.style.display = "none";
  mangirl.style.display = "none";
  manhse.style.display = "none";

  // Переменные для drag & drop
  let draggedItem = null;
  let startX, startY;
  let initialLeft, initialTop;

  // Функция для добавления класса открытой двери
  function openDoor() {
    wardrobe.classList.add("door-open");
  }

  function closeDoor() {
    wardrobe.classList.remove("door-open");
  }

  // Открываем дверь при наведении
  wardrobe.addEventListener("mouseenter", openDoor);
  wardrobe.addEventListener("mouseleave", closeDoor);

  // Функция для перетаскивания
  function startDrag(e) {
    e.preventDefault();
    draggedItem = this;

    // Получаем позицию мыши
    let clientX, clientY;
    if (e.type === "mousedown") {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.type === "touchstart") {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    // Получаем текущую позицию элемента
    const rect = draggedItem.getBoundingClientRect();
    const parentRect = wardrobe.getBoundingClientRect();

    startX = clientX - rect.left;
    startY = clientY - rect.top;

    initialLeft = rect.left - parentRect.left;
    initialTop = rect.top - parentRect.top;

    // Добавляем класс для стилизации
    draggedItem.style.cursor = "grabbing";
    draggedItem.style.zIndex = "100";

    // Добавляем обработчики
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", stopDrag);
    document.addEventListener("touchmove", onDrag);
    document.addEventListener("touchend", stopDrag);
  }

  function onDrag(e) {
    if (!draggedItem) return;
    e.preventDefault();

    let clientX, clientY;
    if (e.type === "mousemove") {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.type === "touchmove") {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    const parentRect = wardrobe.getBoundingClientRect();
    let newLeft = clientX - startX - parentRect.left;
    let newTop = clientY - startY - parentRect.top;

    // Ограничиваем перемещение в пределах гардероба
    const maxLeft = parentRect.width - draggedItem.offsetWidth;
    const maxTop = parentRect.height - draggedItem.offsetHeight;

    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));

    draggedItem.style.left = newLeft + "px";
    draggedItem.style.top = newTop + "px";
    draggedItem.style.position = "absolute";
  }

  function stopDrag(e) {
    if (!draggedItem) return;

    // Проверяем, куда был брошен предмет (область персонажа)
    const menRect = men.getBoundingClientRect();
    const draggedRect = draggedItem.getBoundingClientRect();

    // Проверяем пересечение с персонажем
    const isOverMen = !(
      draggedRect.right < menRect.left ||
      draggedRect.left > menRect.right ||
      draggedRect.bottom < menRect.top ||
      draggedRect.top > menRect.bottom
    );

    // Если предмет брошен на персонажа
    if (isOverMen) {
      // Определяем какой предмет был перетащен
      if (draggedItem === hair) {
        // Меняем на memwithhair
        men.style.display = "none";
        memwithhair.style.display = "block";
        showMessage(
          "Знакомтесь!Это ученый срендневековья. Его сожгли на костре за асбсурдные идеи.",
        );
      } else if (draggedItem === hair2) {
        // Меняем на mangirl
        men.style.display = "none";
        mangirl.style.display = "block";
        showMessage(
          "Знакомьтесь! Это Мария Анна Моцарт! Общество не приняло её абсурдную идею об игре занятии музыкой, поэтому её выдали замуж.",
        );
      } else if (draggedItem === baghse) {
        // Меняем на manhse
        men.style.display = "none";
        manhse.style.display = "block";
        showMessage(
          "Знакомьтесь! Это студент школы дизайна. Он очень хочет 10, но школа дизайна считает это абсурдным, поэтому ставит только 8.",
        );
      }

      // Анимация появления нового персонажа
      const newChar =
        men.style.display === "none"
          ? memwithhair.style.display === "block"
            ? memwithhair
            : mangirl.style.display === "block"
              ? mangirl
              : manhse
          : null;

      if (newChar) {
        newChar.style.animation = "appear 0.3s ease";
        setTimeout(() => {
          newChar.style.animation = "";
        }, 300);
      }

      // Возвращаем перетащенный предмет на место с анимацией
      resetItemPosition(draggedItem);
    } else {
      // Если не на персонажа, просто возвращаем на место
      resetItemPosition(draggedItem);
    }

    // Убираем стили
    draggedItem.style.cursor = "";
    draggedItem.style.zIndex = "";
    draggedItem = null;

    // Удаляем обработчики
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", stopDrag);
    document.removeEventListener("touchmove", onDrag);
    document.removeEventListener("touchend", stopDrag);
  }

  // Функция возврата предмета на место
  function resetItemPosition(item) {
    // Сохраняем исходные позиции
    const originalPositions = {
      hair: { left: "55vw", top: "46vh" },
      hair2: { left: "46vw", top: "3.5vw" },
      baghse: { left: "70vw", top: "-7vh" },
      bookk: { left: "45vw", top: "50.5vh" },
    };

    const pos = originalPositions[item.classList[0]];
    if (pos) {
      item.style.left = pos.left;
      item.style.top = pos.top;
    }

    // Добавляем анимацию возврата
    item.style.animation = "return 0.3s ease";
    setTimeout(() => {
      item.style.animation = "";
    }, 300);
  }

  // Функция показа сообщения
  function showMessage(text) {
    // Создаем или получаем элемент сообщения
    let message = document.querySelector(".drag-message");
    if (!message) {
      message = document.createElement("div");
      message.className = "drag-message";
      document.body.appendChild(message);
    }

    message.textContent = text;
    message.style.display = "block";
    message.style.animation = "fadeInOut 10s ease";

    setTimeout(() => {
      message.style.display = "none";
    }, 10000);
  }

  // Добавляем обработчики для перетаскивания
  hair.addEventListener("mousedown", startDrag);
  hair.addEventListener("touchstart", startDrag);
  hair2.addEventListener("mousedown", startDrag);
  hair2.addEventListener("touchstart", startDrag);
  baghse.addEventListener("mousedown", startDrag);
  baghse.addEventListener("touchstart", startDrag);
  bookk.addEventListener("mousedown", startDrag);
  bookk.addEventListener("touchstart", startDrag);

  // Кнопка сброса (добавьте в HTML если нужно)
  window.resetWardrobe = function () {
    // Сбрасываем персонажа
    men.style.display = "block";
    memwithhair.style.display = "none";
    mangirl.style.display = "none";
    manhse.style.display = "none";

    // Сбрасываем позиции предметов
    resetItemPosition(hair);
    resetItemPosition(hair2);
    resetItemPosition(baghse);
    resetItemPosition(bookk);

    showMessage("Все сброшено!");
  };
});

// Простой drag & drop для всех minitape
const tapes = document.querySelectorAll('[class^="minitape"]');

let draggedElement = null;
let startX = 0;
let startY = 0;
let initialLeft = 0;
let initialTop = 0;

// Делаем все скотчи перетаскиваемыми
tapes.forEach((tape) => {
  tape.style.cursor = "grab";
  tape.addEventListener("mousedown", startDrag);
  tape.addEventListener("touchstart", startDrag, { passive: false });
});

function startDrag(e) {
  e.preventDefault();
  e.stopPropagation();

  draggedElement = e.currentTarget;
  draggedElement.style.cursor = "grabbing";

  // Получаем текущие координаты из CSS
  const computedStyle = window.getComputedStyle(draggedElement);
  initialLeft = parseInt(computedStyle.left) || 0;
  initialTop = parseInt(computedStyle.top) || 0;

  // Координаты курсора
  const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
  const clientY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;

  startX = clientX;
  startY = clientY;

  // Увеличиваем z-index
  draggedElement.style.zIndex = "1000";

  // Добавляем обработчики
  document.addEventListener("mousemove", moveDrag);
  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchmove", moveDrag, { passive: false });
  document.addEventListener("touchend", endDrag);
}

function moveDrag(e) {
  if (!draggedElement) return;
  e.preventDefault();

  const clientX = e.type.includes("touch") ? e.touches[0].clientX : e.clientX;
  const clientY = e.type.includes("touch") ? e.touches[0].clientY : e.clientY;

  // Вычисляем сдвиг
  const deltaX = clientX - startX;
  const deltaY = clientY - startY;

  // Новая позиция
  const newLeft = initialLeft + deltaX;
  const newTop = initialTop + deltaY;

  // Применяем через style (перебивает CSS)
  draggedElement.style.left = newLeft + "px";
  draggedElement.style.top = newTop + "px";
}

function endDrag(e) {
  if (!draggedElement) return;

  draggedElement.style.cursor = "grab";
  draggedElement.style.zIndex = "";

  document.removeEventListener("mousemove", moveDrag);
  document.removeEventListener("mouseup", endDrag);
  document.removeEventListener("touchmove", moveDrag);
  document.removeEventListener("touchend", endDrag);

  draggedElement = null;
}
