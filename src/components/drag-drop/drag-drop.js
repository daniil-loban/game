const DROP_AREA_HIGHLIGHT = 'drop-area-highlight';
let allDropAreas;
let allDragWords;
let currentDragOverArea = null;
let callback = null;

function dragOverCheck(x, y) {
  for (let i = 0; i < allDropAreas.length; i += 1) {
    const dest = allDropAreas[i];
    const rc = dest.getBoundingClientRect();
    if (x > rc.left && x < rc.right && y > rc.top && y < rc.bottom) {
      if (currentDragOverArea !== null) {
        currentDragOverArea.classList.remove(DROP_AREA_HIGHLIGHT);
      }
      currentDragOverArea = dest;
      currentDragOverArea.classList.add(DROP_AREA_HIGHLIGHT);
      return dest;
    }
  }
  return true;
}

function touchMove(e) {
  const event = e;
  if (!event.target.classList.contains('drag-element')) return false;
  const touchLocation = event.targetTouches[0];
  event.target.classList.add('dragged-now');
  const compStyles = window.getComputedStyle(event.target);
  const width = parseInt(compStyles.width, 10);
  const height = parseInt(compStyles.height, 10);
  event.target.style.left = `${touchLocation.pageX - width / 2}px`;
  event.target.style.top = `${touchLocation.pageY - height * 2}px`;
  dragOverCheck(touchLocation.pageX, touchLocation.pageY);
  return true;
}

function touchEnd(event) {
  const dest = currentDragOverArea;
  event.target.classList.remove('dragged-now');
  if (dest && !dest.classList.contains('drag-element')
    && dest !== event.target.parentNode
    && (+dest.dataset.maxchildren > dest.children.length
       || dest.dataset.maxchildren === undefined)) {
    dest.appendChild(event.target);
    currentDragOverArea = null;
    if (callback !== null) {
      callback(event);
    }
    dest.classList.remove(DROP_AREA_HIGHLIGHT);
  }
}

function drop(event) {
  event.preventDefault();
  const data = event.dataTransfer.getData('text');
  if (!event.target.classList.contains('drag-element')
     && event.target !== document.getElementById(data).parentNode
     && (+event.target.dataset.maxchildren > event.target.children.length
        || event.target.dataset.maxchildren === undefined)) {
    event.target.appendChild(document.getElementById(data));
    currentDragOverArea = null;
    if (callback !== null) {
      callback(event);
    }
    event.target.classList.remove(DROP_AREA_HIGHLIGHT);
  }
}

function dragLeave(event) {
  event.currentTarget.classList.remove(DROP_AREA_HIGHLIGHT);
}

function allowDrop(event) {
  event.preventDefault();
  event.currentTarget.classList.add(DROP_AREA_HIGHLIGHT);
}


function drag(event) {
  const testClasses = event.target.classList;
  if ((testClasses.contains('drag-element'))
     || (!testClasses.contains('drag-area'))) {
    event.dataTransfer.setData('text', event.target.id);
  }
}

function addDragDropListener(cb) {
  callback = cb;
  allDropAreas = document.querySelectorAll('.drop-area');
  allDragWords = document.querySelectorAll('.drag-element');

  allDragWords.forEach((element) => {
    element.addEventListener('dragstart', drag, false);
    element.setAttribute('draggable', 'true');
  });

  allDropAreas.forEach((element) => {
    element.addEventListener('touchmove', touchMove, { passive: true });
    element.addEventListener('touchend', touchEnd, false);
    element.addEventListener('drop', drop, false);
    element.addEventListener('dragover', allowDrop, false);
    element.addEventListener('dragleave', dragLeave, false);
  });
}

export default { addDragDropListener };
