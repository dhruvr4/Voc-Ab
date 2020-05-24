package com.example.vocab;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import org.w3c.dom.Text;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

public class MainActivity extends AppCompatActivity {
    Dictionary dictionary = new Dictionary();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // run dictionary
        // have another acdtivity to get type as extra
        String type = "medium";
        // choose question
        nextquestion();

    }
    int corrects=0;
    int total = 0;
    int correct_answer=0;
    TextView score = findViewById(R.id.score);
    void answered(View a){
        total++;
        int answer = Integer.parseInt(a.getTag().toString());
        if (answer == correct_answer) {
            Toast.makeText(this, "Correct Answer", Toast.LENGTH_SHORT).show();
            corrects++;
        } else {
            Toast.makeText(this, "Wrong Answer", Toast.LENGTH_SHORT).show();
        }
        score.setText(corrects + "/" + total );
        nextquestion();
    }
    void nextquestion() {
        int length = dictionary.medium.size();
        Random random = new Random();
        int index = random.nextInt(length);
        Question ask = dictionary.medium.get(index);
        correct_answer = Arrays.asList(ask.answers).indexOf(ask.correctanswer);
        TextView question = findViewById(R.id.question);
        Button one = findViewById(R.id.button1);
        Button two = findViewById(R.id.button2);
        Button three = findViewById(R.id.button3);
        Button four = findViewById(R.id.button4);

        question.setText(ask.question);
        one.setText(ask.answers[0]);
        two.setText(ask.answers[1]);
        three.setText(ask.answers[2]);
        four.setText(ask.answers[3]);

    }




    void onCreate(){
    }
}
