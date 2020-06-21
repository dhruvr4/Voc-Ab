const Datab = {
    easy :["Hi"],
    medium:[],
    hard :[],
    defaul :[]
}


class Database {
    constructor(a) {
        console.log("hi")
        add_all();
    }
    add=( a,  b, c, type) => {
        toAdd = new Question(a,b,c);
        switch (type) {
            case "easy":
                easy.add(toAdd);
                break;
            case "medium":
                medium.add(toAdd);
                break;
            case "hard":
                hard.add(toAdd);
                break;
            default:
                defaul.add(toAdd);
        }
    }
    add_all = () => {
        add("something not clear",["ambigous","monotonous", "unique","lucid"], "ambigous","medium");
    }
}
class Question {
    type="default";
    question="";
    answers=[];
    correctanswer="";
    constructor( a, b, c) {
        this.question=a;
        for( i=0;i<4;i++) {
            this.answers[i] = b[i];
        }
        this.correctanswer=c;
    }
}
export default Datab