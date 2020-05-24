package com.example.vocab;

public class Question {
    String type="default";
    int length=4;
    String question="";
    String[] answers= new String[length];
    String correctanswer="";
    Question(String a, String[] b, String c) {
        question=a;
        for(int i=0;i<length;i++) {
            answers[i] = b[i];
        }
        correctanswer=c;
    }
    Question(String a, String[] b, String c, String d) {
            question=a;
            for(int i=0;i<length;i++) {
                answers[i]=b[i];
            }
            correctanswer=c;
            type=d;
    }
}
