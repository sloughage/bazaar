$('#add_creator').on('click', e => {
  $('#creator_box').append('<input class="creator txtbox">')
})

$('#add_tag').on('click', e => {
  $('#tag_box').append('<input class="tag txtbox">')
})

$('#new_submit').on('click', e => {
  $.ajax({
    url: '/i/new',
    type: 'post',
    data: {
      title: $('#title').val(),
      creators: $('.creator').get().map(x => x.value.trim()),
      tags: $('.tag').get().map(x => x.value.trim()),
      price: $('#price').val()
    },
    success: result => {
      window.location.href = result
    },
    error: err => {
      console.log(err)
    }
  })
})