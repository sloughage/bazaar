const ref = document.createElement('a')
ref.href = document.referrer

$('#login_submit').on('click', e => {
  $.ajax({
    url: '/u/login',
    type: 'post',
    data: {
      username: $('#login_username').val(),
      password: $('#login_password').val()
    },
    success: result => {
      if (window.location.pathname !== ref.pathname) {
        window.location.href = ref.pathname
      } else {
        window.location.href = '/s'
      }
    },
    error: err => {
      console.log(err)
    }
  })
})