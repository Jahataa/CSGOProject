$(document).ready(function(){

  $("#playerForm").submit(function (e){
      if(!$("#steamId").val()){
        e.preventDefault();
      }
  })
})
