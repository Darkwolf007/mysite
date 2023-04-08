// function toggleDescription(titleElement) {
//     var description = titleElement.nextElementSibling;
//     var arrow = titleElement.previousElementSibling;
//     if (description.style.display === "none") {
//       description.style.display = "block";
//       arrow.classList.add("open");
//     } else {
//       description.style.display = "none";
//       arrow.classList.remove("open");
//     }
//   }

const resumeItems = document.querySelectorAll('.resume-item');

resumeItems.forEach(item => {
  const description = item.querySelector('.item-description');

  item.addEventListener('click', () => {
    description.style.display = (description.style.display === 'none') ? 'block' : 'none';
  });
});
