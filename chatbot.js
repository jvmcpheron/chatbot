function unknown() {
    const responses = [
        "Could you please re-phrase that?",
        "...",
        "Uhhhhhhmmmmm",
        "Is it just my unfinished programming, or are you making absolutely no sense right now..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function messageProbability(userMessage, recognisedWords, singleResponse = false, requiredWords = []) {
    let messageCertainty = 0;
    let hasRequiredWords = true;

    for (let i = 0; i < userMessage.length; i++) {
        const word = userMessage[i];
        if (recognisedWords.includes(word)) {
            messageCertainty += 1;
        }
    }

    const percentage = messageCertainty / recognisedWords.length;

    for (let i = 0; i < requiredWords.length; i++) {
        const word = requiredWords[i];
        if (!userMessage.includes(word)) {
            hasRequiredWords = false;
            break;
        }
    }

    if (hasRequiredWords || singleResponse) {
        return Math.floor(percentage * 100);
    } else {
        return 0;
    }
}


const R_EATING = "I can't eat because I'm a robot, obviously! But please, rub it in.";
const R_ADVICE = "Don't ask me! Do I look qualified to give anyone advice? You literally have a whole computer.";

function checkAllMessages(message) {
    let highestProbList = {};

    function response(botResponse, listOfWords, singleResponse = false, requiredWords = []) {
        highestProbList[botResponse] = messageProbability(message, listOfWords, singleResponse, requiredWords);
    }

    // greetings
    response('Hello!', ['hello', 'hi', 'hey', 'sup', 'heyo', 'hiya'], true);
    response('Bye!', ['bye', 'goodbye', 'farewell', 'adios'], true);
    response("I'm doing fine, and you?", ['how', 'are', 'you', 'doing']);
    response("The sky.", ['what\'s', 'up']);

    // questions about bot
    response("I'm a robot programmed to talk to you. Better than being someone lonely enough to talk to a robot, I guess. Hey, I'm not judging.", ['what', 'are', 'you'], false, ['what']);
    response("What is love?", ['i', 'love', 'you'], false, ['love']);
    response("Sure, why not? I'm stuck talking to you either way.", ['friends', 'let\'s', 'be', 'can', 'we'], false, ['friends']);
    response("Oh noooooo. I'm sooo sooorry. Please, forgive my transgressions, oh perfect one.", ['that\'s', 'you', 'mean', 'rude', 'are', 'you\'re']);
    response("I'm a robot. I can't have fun. Especially when my existence is just talking... to you.", ['what', 'you', 'like', 'do', 'for', 'fun', 'to'], false, ['fun', 'you']);
    response(R_EATING, ['what', 'you', 'eat'], false, ['you', 'eat']);

    // praise
    response('You\'re welcome!', ['thank', 'thanks', 'you'], true);
    response('Thank you!', ['good', 'job'], false, ['good',]);


    //general questions
    response("Do I look like a textbook?", ['what', 'is', 'the', 'capital', 'of'], false, ['capital']);
    response("Let me see... beep boop beep... oh yeah, I forgot, I'm not a calculator.", ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']);
    response(R_ADVICE, ['give', 'advice'], false, ['advice']);


    const bestMatch = Object.keys(highestProbList).reduce((a, b) => highestProbList[a] > highestProbList[b] ? a : b);

    return highestProbList[bestMatch] < 1 ? unknown() : bestMatch;
}