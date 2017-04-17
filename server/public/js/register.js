console.log('connected to register')

$('#post_register').on('click', e => {
  const username = $('#reg_username').val()
  const password = $('#reg_password').val()
  $.ajax({
    url:'/u/register',
    type: 'post',
    data: {
      username: username,
      password: password
    },
    success: result => {
      console.log(result)
    },
    error: err => {
      console.log(err)
    }
  })
})