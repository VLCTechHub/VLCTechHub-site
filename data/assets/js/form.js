function addFormClassnameOnSubmit() {
  let forms = document.querySelectorAll('form');
  forms.forEach(form => {
    let submitButton = form.querySelector('button[data-type=submit]');
    if(submitButton) {
      submitButton.addEventListener('click', () => form.setAttribute('data-submit-attempted', true));
    }
  });
}
window.addEventListener('load', addFormClassnameOnSubmit);
