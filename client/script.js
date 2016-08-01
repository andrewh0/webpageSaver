var jobId = null;

var updateJobId = function(id) {
  jobId = id;
  $('.job-id').html(jobId);
  $('.job-id-display').show();
};

var updateJobStatus = function(status) {
  $('.webpage').attr('srcdoc', status);
};

var initialize = function() {
  $('.job-id-display').hide();
};

$('.url-submit').click(function() {
  var url = $('.url-field').val();
  $.ajax({
    type: 'POST',
    url: 'http://localhost:8080/url',
    data: {
      url: url
    },
    success: function(data) {
      updateJobId(data);
    }
  });
});

$('.status-submit').click(function() {
  var jobId = $('.status-field').val();
  if (jobId) {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8080/job/' + jobId,
      success: function(data) {
        updateJobStatus(data);
      }
    });
  }
});

initialize();
