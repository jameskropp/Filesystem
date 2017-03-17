$(document).ready(()=>{
  $('.upload-btn').on('click', function (){
      $('#upload-input').click();
      $('.progress-bar').text('0%');
      $('.progress-bar').width('0%');
  });

// Grabs all the files from the backend
  viewDownload();
  function viewDownload(){
    $.ajax({
      url: '/viewfiles',
      type: 'POST',
      dataType: "json",
      success: function(data){
          var text = "";
          for (var key in data) {
              text += '<div class="col-sm-3 col-xs-6 col-center">';
              text += '<div class="panel panel-default">';
              text += '<span class="glyphicon glyphicon-download"></span>';
              text += '<h4>'+data[key]+'</h4>';
              text += '<input id="'+data[key]+'" class="btn btn-lg download-btn" value="download" type="button" /><br />';
              text += '<span id="'+data[key]+'" class="glyphicon glyphicon-remove"></span>';
              text += '</div></div>';
          }
          $("#downloads").html(text);
      },
    });
  }

// Sends the filename to the backend to start the download.
  $('#downloads').on('click', ".download-btn", function(e){
    var idClicked = e.target.id;
    console.log(idClicked);
    window.location = "/download?filename="+idClicked;
  });

  // Sends the filename to the backend to delete the file.
    $('#downloads').on('click', ".glyphicon-remove", function(e){
      var idClicked = e.target.id;
      $.ajax({
        url: '/delete',
        type: 'GET',
        data: {"filename": idClicked},
        success: function(data){
          console.log("Deleted");
          viewDownload();
        },
      });
    });

  $('#upload-input').on('change', function(){

    var files = $(this).get(0).files;
    if (files.length > 0){
      var formData = new FormData();
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        formData.append('uploads[]', file, file.name.replace(/\s+/g, '-').toLowerCase());
      }

// Sends the upload data to the backend
      $.ajax({
        url: '/upload',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
            console.log('upload successful!\n' + data);
            viewDownload();
        },
        xhr: function() {
          var xhr = new XMLHttpRequest();
          xhr.upload.addEventListener('progress', function(evt) {

            if (evt.lengthComputable) {
              var percentComplete = evt.loaded / evt.total;
              percentComplete = parseInt(percentComplete * 100);
              $('.progress-bar').text(percentComplete + '%');
              $('.progress-bar').width(percentComplete + '%');
              if (percentComplete === 100) {
                $('.progress-bar').html('Done');
              }
            }
          }, false);
          return xhr;
        }
      });
    }
  });
});
