package com.example.vocab;

import java.util.ArrayList;

public class Dictionary {
    ArrayList<Question> easy = new ArrayList<Question>();
    ArrayList<Question> medium = new ArrayList<Question>();
    ArrayList<Question> hard = new ArrayList<Question>();
    ArrayList<Question> defaul = new ArrayList<Question>();
    Dictionary() {
        add_all();
    }
    void add(String a, String[] b, String c, String type){
        Question toAdd = new Question(a,b,c);
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
    void add_all() {
        add("something not clear",new String[]{"ambigous","monotonous", "unique","lucid"}, "ambigous","medium");


    }
}
