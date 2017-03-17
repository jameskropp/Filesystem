$(document).ready(()=>{
  $('.upload-btn').on('click', function (){
      $('#upload-input').click();
      $('.progress-bar').text('0%');
      $('.progress-bar').width('0%');
  });

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
              text += '<input id="'+data[key]+'" class="btn btn-lg download-btn" value="download" type="button" />';
              text += '</div></div>';
          }
          $("#downloads").html(text);
      },
    });
  }

  $('#downloads').on('click', ".download-btn", function(e){
    var idClicked = e.target.id;
    console.log(idClicked);
    window.location = "/download?filename="+idClicked;
  });

  $('#upload-input').on('change', function(){

    var files = $(this).get(0).files;

    if (files.length > 0){
      // create a FormData object which will be sent as the data payload in the
      // AJAX request
      var formData = new FormData();

      // loop through all the selected files and add them to the formData object
      for (var i = 0; i < files.length; i++) {
        var file = files[i];

        // add the files to formData object for the data payload
        formData.append('uploads[]', file, file.name);
      }

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
          // create an XMLHttpRequest
          var xhr = new XMLHttpRequest();

          // listen to the 'progress' event
          xhr.upload.addEventListener('progress', function(evt) {

            if (evt.lengthComputable) {
              // calculate the percentage of upload completed
              var percentComplete = evt.loaded / evt.total;
              percentComplete = parseInt(percentComplete * 100);

              // update the Bootstrap progress bar with the new percentage
              $('.progress-bar').text(percentComplete + '%');
              $('.progress-bar').width(percentComplete + '%');

              // once the upload reaches 100%, set the progress bar text to done
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
