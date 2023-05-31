let newTask = document.getElementById("newTask");
let maxOffset = 5;
function changeShadowAngle(event) {
  let newTaskRect = newTask.getBoundingClientRect();
  const mouseX = event.clientX - newTaskRect.left;
  const mouseY = event.clientY - newTaskRect.top;

  const centerX = newTaskRect.width / 2;
  const centerY = newTaskRect.height / 2;

  const deltaX = mouseX - centerX;
  const deltaY = mouseY - centerY;

  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  console.log(distance);
  const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
  const offsetX = Math.min(
    maxOffset,
    Math.max(-maxOffset, distance * Math.cos(angle * (Math.PI / 180)))
  );
  const offsetY = Math.min(
    maxOffset,
    Math.max(-maxOffset, distance * Math.sin(angle * (Math.PI / 180)))
  );
  console.log(angle);
  newTask.style.boxShadow = `${-offsetX}px ${-offsetY}px 5px 0px rgba(0, 0, 0, 0.75)`;
}
window.addEventListener("mousemove", changeShadowAngle);
