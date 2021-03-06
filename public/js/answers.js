$(document).ready(function() {
  $(".vote-up").submit(function(e) {
    e.preventDefault();

    console.log("come on")
    var postId = $(this).data("id");
    $.ajax({
      type: "PUT",
      url: "/answer/" + postId + "/vote-up",
      success: function(data) {
        console.log("voted up!");
      },
      error: function(err) {
        console.log(err.messsage);
      }
    });
  });

  $(".vote-down").submit(function(e) {
    e.preventDefault();

    var postId = $(this).data("id");
    $.ajax({
      type: "PUT",
      url: "/answer/" + postId + "/vote-down",
      success: function(data) {
        console.log("voted down!");
      },
      error: function(err) {
        console.log(err.messsage);
      }
    });
  });
});

$(document).ready(function() {
  $(".vote-up-question").submit(function(e) {
    e.preventDefault();

    var postId = $(this).data("id");
    $.ajax({
      type: "PUT",
      url: "/posts/" + postId + "/vote-up",
      success: function(data) {
        console.log("voted up!");
      },
      error: function(err) {
        console.log(err.messsage);
      }
    });
  });

  $(".vote-down-question").submit(function(e) {
    e.preventDefault();

    var postId = $(this).data("id");
    $.ajax({
      type: "PUT",
      url: "/posts/" + postId + "/vote-down",
      success: function(data) {
        console.log("voted down!");
      },
      error: function(err) {
        console.log(err.messsage);
      }
    });
  });
});

for (const btn of document.querySelectorAll('.voteDown')) {
  btn.addEventListener('click', event => {
    event.target.classList.toggle('on');
    document.querySelector('.voteUp').classList.remove('on')
  });
}

for (const btn of document.querySelectorAll('.voteUp')) {
  btn.addEventListener('click', event => {
    event.target.classList.toggle('on');
    document.querySelector('.voteDown').classList.remove('on')
  });
}

for (const btn of document.querySelectorAll('.voteDownQuestion')) {
  btn.addEventListener('click', event => {
    event.target.classList.toggle('on');
    document.querySelector('.voteUpQuestion').classList.remove('on')
  });
}

for (const btn of document.querySelectorAll('.voteUpQuestion')) {
  btn.addEventListener('click', event => {
    event.target.classList.toggle('on');
    document.querySelector('.voteDownQuestion').classList.remove('on')
  });
}