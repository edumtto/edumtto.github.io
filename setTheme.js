function setThemeColor() {
  var r = document.querySelector(':root');
  r.style.setProperty('--accent', localStorage.getItem('accent'))
}

document.addEventListener('DOMContentLoaded', function() {
  setThemeColor();
});