// console.log('header.js connected')
// $('#dropdown_button').on('click', e => {
//   console.log('clicked')
//   $('#dropdown').toggleClass('hidden')
// })

$('#login_submit').on('click', e => {
  $.ajax({
    url: '/u/login',
    type: 'post',
    data: {
      username: $('#login_username').val(),
      password: $('#login_password').val()
    },
    success: result => {
      window.location.reload()
    },
    error: err => {
      console.log(err)
    }
  })
})

$('#logout_submit').on('click', e => {
  $.ajax({
    url: '/u/logout',
    type: 'post',
    success: result => {
      window.location.reload()
    },
    error: err => {
      console.log(err)
    }
  })
})