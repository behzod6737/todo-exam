const signUpLink = document.querySelector('.sign-up__link')
const signInLink = document.querySelector('.sign-in__link')
signUpLink.addEventListener('click', (e) => {
  e.preventDefault()
  document.body.classList.remove('auth-body--sign-up')
  document.body.classList.add('auth-body--sign-in')
})
signInLink.addEventListener('click', (e) => {
  e.preventDefault()
  document.body.classList.add('auth-body--sign-up')
  document.body.classList.remove('auth-body--sign-in')
})