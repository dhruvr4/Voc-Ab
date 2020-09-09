import GRE1 from './Data/GRE_list_1.json';
import GRE2 from './Data/GRE_list_2.json';
import GRE3 from './Data/GRE_list_3.json';
import GRE4 from './Data/GRE_list_4.json';
import GRE5 from './Data/GRE_list_5.json';
import SAT1 from './Data/SAT_list_1.json';
import SAT2 from './Data/SAT_list_2.json';
import SAT3 from './Data/SAT_list_3.json';
import SAT4 from './Data/SAT_list_4.json';
import SAT5 from './Data/SAT_list_5.json';
import Easy from './Data/EasyList.json';


class Question {
    question = "";
    correctanswer = "";
    constructor(a, c) {
        this.question = a;
        this.correctanswer = c;
    }
}
const datab = {
    easy: [],
    medium: [],
    hard: [],
    default: []
}
function create_database(val) {
    if (val == "easy") {
        for (var i = 0; i < Object.values(Easy.Adjective).length; i++) {
            add(Easy.Adjective[i], Easy.Word[i], "easy");
        }
    }
    if (val == "medium") {
        for (var i = 0; i < Object.values(SAT1.Adjective).length; i++) {
            add(SAT1.Adjective[i], SAT1.Word[i], "medium");
        }
        for (var i = 0; i < Object.values(SAT2.Adjective).length; i++) {
            add(SAT2.Adjective[i], SAT2.Word[i], "medium");
        }
        for (var i = 0; i < Object.values(SAT3.Adjective).length; i++) {
            add(SAT3.Adjective[i], SAT3.Word[i], "medium");
        }
        for (var i = 0; i < Object.values(SAT4.Adjective).length; i++) {
            add(SAT4.Adjective[i], SAT4.Word[i], "medium");
        }
        for (var i = 0; i < Object.values(SAT5.Adjective).length; i++) {
            add(SAT5.Adjective[i], SAT5.Word[i], "medium");
        }
    }
    if (val == "hard") {
        for (var i = 0; i < Object.values(GRE1.Adjective).length; i++) {
            add(GRE1.Adjective[i], GRE1.Word[i], "hard");
        }
        for (var i = 0; i < Object.values(GRE2.Adjective).length; i++) {
            add(GRE2.Adjective[i], GRE2.Word[i], "hard");
        }
        for (var i = 0; i < Object.values(GRE3.Adjective).length; i++) {
            add(GRE3.Adjective[i], GRE3.Word[i], "hard");
        }
        for (var i = 0; i < Object.values(GRE4.Adjective).length; i++) {
            add(GRE4.Adjective[i], GRE4.Word[i], "hard");
        }
        for (var i = 0; i < Object.values(GRE5.Adjective).length; i++) {
            add(GRE5.Adjective[i], GRE5.Word[i], "hard");
        }
    }
}
function add(a, def, type) {
    const toAdd = new Question(a, def);
    datab[type].push(toAdd)
    datab['default'].push(toAdd)
}
function load(val) {
    //console.log(datab)
    console.log("Load function started")
    create_database(val)
}
load("easy")
load("medium")
load("hard")
export default datab