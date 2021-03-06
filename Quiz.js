class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();
    var displaypositiony = 250;
    var displaypositionx = 350;

    //write code to change the background color here
    background("yellow")

    //write code to show a heading for showing the result of Quiz
    fill("black")
    textSize(25);
    text("result of the quiz !", 370,50)
    //call getContestantInfo( ) here
    Contestant.getContestantInfo()

    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){
      fill("blue");
      textSize(20);
      //write code to add a note here
      text("*Note: Contestant who answered correct are highlighted in green color!",130,230)
     
    }

 //write code to highlight contest who answered correctly

    for(var plr in allContestants){
      
      displaypositiony=displaypositiony+50;
     // displaypositionx=displaypositionx+200;
      var correctAns ="2";
      console.log(allContestants[plr].answer)
      if(correctAns===allContestants[plr].answer)
        fill("green")
      else 
        fill("red");

        textSize(15);
      text(allContestants[plr].name+":"+allContestants[plr].answer,displaypositionx,displaypositiony)
    }
    
  }

}
