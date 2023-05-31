const newGuess = document.querySelector("#new-guess");
const message = document.getElementById("message");
const checkButton = document.querySelector("#check");
const restartButton = document.querySelector("#restart");
const noOfGuesses = document.getElementById("noOfGuesses");
const prevNums = document.getElementById("prevNums");
const root = document.querySelector(":root");



/*ορισμός των σχετικών χειριστών συμβάντων*/

let previousGuesses = [];
let theGuess;
window.onload = newRandom();

function newRandom(){
    theGuess = Math.floor(Math.random()*100) +1;
    return theGuess;
}
console.log("theGuess: " + theGuess);

newGuess.focus();
newGuess.addEventListener('keyup', checkKey);

checkButton.addEventListener('click', checkGuess);

restartButton.style.visibility = 'hidden';
restartButton.addEventListener('click', restart);



function checkKey(e) {
/* συνάρτηση που βρίσκει ένα τυχαίο αριθμό μεταξύ 1 και 100
 και τον εκχωρεί στη μεταβλητή theGuess */
    if (e.code === 'Enter') {
        e.preventDefault();
        checkGuess();
    }
}

function checkGuess(){
/* συνάρτηση checkGuess η οποία καλείται είτε όταν ο χρήστης πατήσει <<enter>>
στο πεδίο "new-guess" είτε όταν πατήσει το πλήκτρο "check", η οποία είναι ο κεντρικός ελεγκτής,
καλεί τη συνάρτηση processGuess (η οποία αποφαίνεται για την ορθότητα του αριθμού) και κάνει
τις κατάλληλες ενέργειες για να μην μπορεί να εισάγει ο χρήστης νέο αριθμό ή να ανασταλεί η
λειτουργία του <<enter>>, εμφάνιση του πλήκτρου 'restart' και την εξαφάνιση του πλήκτρου 'check'
σε περίπτωση ολοκλήρωσης του παιχνιδιού. */
    const userInput = newGuess.value;
    //console.log(userInput);

    let outcome = processGuess(userInput);

    if (outcome == 'lost' || outcome == 'won') {
        checkButton.disabled = true;
        checkButton.style.visibility = 'hidden';

        restartButton.style.visibility = 'visible';
        
    }

}

function processGuess(newValue){
 /* συνάρτηση processGuess(newValue) η οποία καλείται από τη συνάρτηση checkGuess,
 περιέχει τη λογική του παιχνιδιού, ελέγχει αν η τιμή του χρήστη είναι σωστή, ή αν το παιχνίδι έχει
 τελειώσει χωρίς ο χρήστης να έχει βρει τον αριθμό, και επιστρέφει αντίστοιχα την τιμή "win", ή "lost",
 δημιουργεί και εμφανίζει τα κατάλληλα μηνύματα, αλλάζοντας το χρώμα του στοιχείου μηνυμάτων.
 Όλα τα μηνύματα του προγράμματος εμανίζονται από την processGuess().
 Σε περίπτωση που το παιχνίδι δεν έχει ακόμα τελειώσει, η συνάρτηση μπορεί είτε να μην επιστρέφει κάποια ιδιαίτερη τιμή,
 είτε να επιστρέφει κάποια τιμή της επιλογής σας */

    if (newValue < 1 || newValue > 100 || isNaN(newValue)) {
        message.textContent = "Sorry, input out of bounds.";
        return 'invalid';
    }
    previousGuesses.push(newValue);
    if (newValue < theGuess) {
        message.textContent = "Your guess was too low.";
    } else if (newValue > theGuess) {
        message.textContent = "Your guess was too high.";
    } else {
        message.style.color = 'green';
        message.textContent = "Congrats! You won!";
        return 'won';
    }

    noOfGuesses.textContent = "Number of guesses: " + previousGuesses.length;
    prevNums.textContent = "Previous Numbers: " + previousGuesses;
    if (previousGuesses.length == 10){
        message.style.color = 'red';
        message.textContent = "Sorry, you lost... Play again!";
        previousGuesses.pop(newValue);
        return 'lost';
    }
    
    return ;
    
}


function restart(){
/* συνάρτηση restart η οποία καλείται όταν ο χρήστης πατήσει το πλήκτρο
'restart' και επανεκινεί τη διαδικασία */
    previousGuesses = [];

    checkButton.style.visibility = 'visible';
    checkButton.disabled = false;

    restartButton.style.visibility = 'hidden';

    message.style.color = 'black';
    message.textContent = "";
    noOfGuesses.textContent = ""
    prevNums.textContent = "";
    
    newRandom();
    
    newGuess.value = "";
    
    console.log("theGuess: " + theGuess);
}
