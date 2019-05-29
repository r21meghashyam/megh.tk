'use strict';
particlesJS.load('particles-js', './scripts/particles.json');
$(document).ready(function(){
  $(document).scroll(function(){
   
    if($(this).scrollTop()>=$('#skills').position().top)
      $(".me").fadeIn();
    else
    $(".me").fadeOut();
  });
  $(document).scroll();
  $("a[href^='#']").click(function(e){
    
    e.preventDefault();
    location.hash="";
    
    $('html,body').animate({
      scrollTop:$($(this).attr("href")).position().top
    },500);
  });
  $(".menu-icon").click(function(){
    if( $(".telepathy ul").css("display")=="none")
      $(".telepathy ul").fadeIn();
    else
    $(".telepathy ul").fadeOut();
  });
  $("form").submit(function(e){
    e.preventDefault();
    var name=$("[name=name]").val(),
        email=$("[name=email]").val(),
        msg=$("[name=message]").val();
        if(!name.trim().length)
         toast("Please enter your name");
         else if(!email.trim().length)
           toast("Please enter your email");
        else if(!msg.trim().length)
         toast("What's the message?");
        else 
        {
          let db = firebase.firestore();
            db.collection("comments").add({name:name,email:email,msg:msg,date:new Date()})
          .then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
              toast("Message sent");
              $('form')[0].reset();
          })
          .catch(function(error) {
              console.error("Error adding document: ", error);
              toast("Some error occured :(");
          });
        }
         
  });

  $(".nav-skills>.right").click(function(){
    var current = Number($(".skills-list").attr('data'));
    var next = current+1;
    $("#item-"+current).hide();
    $("#item-"+next).css('display','inline-block');
    $(".skills-list").attr('data',next);
    if($("#item-"+(next+1)).length==0)
      $(".nav-skills .right").hide();
    $(".nav-skills .left").css('display','inline-block');
  });

  $(".nav-skills .left").click(function(){
    var current = Number($(".skills-list").attr('data'));
    var next = current-1;
    $("#item-"+current).hide();
    $("#item-"+next).css('display','inline-block');
    $(".skills-list").attr('data',next);
    if($("#item-"+(next-1)).length==0)
      $(".nav-skills .left").hide();
    $(".nav-skills .right").css('display','inline-block');
  });

  $(".nav-sites>.right").click(function(){
    var current = Number($(".works-list").attr('data'));
    var next = current+1;
    $("#site-"+current).hide();
    $("#site-"+next).css('display','inline-block');
    $(".works-list").attr('data',next);
    if($("#site-"+(next+1)).length==0)
      $(".nav-sites .right").hide();
    $(".nav-sites .left").css('display','inline-block');
  });

  $(".nav-sites .left").click(function(){
    var current = Number($(".works-list").attr('data'));
    var next = current-1;
    $("#site-"+current).hide();
    $("#site-"+next).css('display','inline-block');
    $(".works-list").attr('data',next);
    if($("#site-"+(next-1)).length==0)
      $(".nav-sites .left").hide();
    $(".nav-sites .right").css('display','inline-block');
  });
});

function toast(msg){
  var t=document.createElement("span"),th=document.createElement("div");
  th.className="toast-holder";
  t.className="toast";
  th.appendChild(t);
  document.body.appendChild(th);
  t.innerHTML=msg;
  $(th).animate({
    bottom:100
  },500).delay(2000).fadeOut(function(){
    $(this).remove();
  });
}
