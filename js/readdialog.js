function readDialog(callback, c){
  $.ajax({
    url: 'https://api.vk.com/method/execute.getLastmes',
    data: {
      'c': (10||c),
      'v': 5.2,
      'user_id': 343536964,
      'access_token': 'c2d61ab549cde71de94e3591a6fb5566ad912c9df557d8f568ec6c85743aa1894561c18e2e29d1d075e50'
    },
    type: 'GET',
    crossDomain: true,
    dataType: 'jsonp',
    success: callback,
    error: callback
  });
}
