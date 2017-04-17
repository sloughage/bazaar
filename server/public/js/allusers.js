$.ajax({
  url: '/u/allusers/data',
  type: 'get',
  success: result => {
    $('#content').replaceWith(result.content)
  },
  error: err => {
    console.log(err)
  }
})
