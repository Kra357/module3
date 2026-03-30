Использована нейтросеть Kimi только для js, проверка и починка кода, так как свой код летел. html css написаны вручную. 

Списки конкретных задач:
(мне нужна тут плавная анимация появление и затухания\
Добавь opacity и transition:)

(На pen не сработал курасор, а на ластик сработал почему?
Проверь порядок инициализации. Возможно, penBtn.classList.add("active") и установка курсора происходят до того, как DOM загрузился.
Вот исправленный код с проверкой:)

const penCursorSvg = "..img/eraser-kyrsor1.png";
const eraserCursorSvg = "..img/pen-kyrsor1.png"; не работает
const penCursorSvg = `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg " width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>`)}`;
const eraserCursorSvg = `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg " width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"/><path d="M22 21H7"/><path d="m5 11 9 9"/></svg>`)}`;
мне нужно поставить туда свои курасоры из папки img

продолжение следует...
