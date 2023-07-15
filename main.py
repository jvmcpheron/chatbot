import re
import random
import time



def unknown():
    response = ["Could you please re-phrase that? ",
                "...",
                "Uhhhhhhmmmmm",
                "Is it just my unfinished programming, or are you making absolutely no sense right now..."][
        random.randrange(4)]
    return response

def message_probability(user_message, recognised_words, single_response=False, required_words=[]):
    message_certainty = 0
    has_required_words = True

    # Counts how many words are present in each predefined message
    for word in user_message:
        if word in recognised_words:
            message_certainty += 1

    # Calculates the percent of recognised words in a user message
    percentage = float(message_certainty) / float(len(recognised_words))

    # Checks that the required words are in the string
    for word in required_words:
        if word not in user_message:
            has_required_words = False
            break

    # Must either have the required words, or be a single response
    if has_required_words or single_response:
        return int(percentage * 100)
    else:
        return 0


R_EATING = "I can't eat because I'm a robot, obviously! But please, rub it in."
R_ADVICE = "Don't ask me! Do I look qualified to give anyone advice? You literally have a whole computer."

def check_all_messages(message):
    highest_prob_list = {}

    # Simplifies response creation / adds it to the dict
    def response(bot_response, list_of_words, single_response=False, required_words=[]):
        nonlocal highest_prob_list
        highest_prob_list[bot_response] = message_probability(message, list_of_words, single_response, required_words)

    # Responses -------------------------------------------------------------------------------------------------------
    response('Hello!', ['hello', 'hi', 'hey', 'sup', 'heyo', 'hiya'], single_response=True)
    response('Bye!', ['bye', 'goodbye', 'farewell', 'adios'], single_response=True)
    response('I\'m doing fine, and you?', ['how', 'are', 'you', 'doing'], required_words=[])
    response('I\'m doing fine, and you?', ['what\'s', 'up'], required_words=['what\'s'])
    response('I\'m a robot programmed to talk to you. Better than being someone lonely enough to talk to a robot, I guess. Hey, I\'m not judging.', ['what', 'are', 'you'], required_words=['what'])
    response('What is love?', ['i', 'love', 'you'], required_words=['love'])
    response('You\'re welcome!', ['thank', 'thanks', 'you'], single_response=True)
    response('Thank you!', ['good', 'job'], required_words=['good', 'job'])
    response('Do I look like a textbook?', ['what', 'is', 'the', 'capital', 'of'], required_words=['capital'])
    response('Let me see... beep boop beep... oh yeah, I forgot, I\'m not a calculator.', ['1', '2', '3', '4', '5','6','7','8','9','0'])
    response('Oh noooooo. I\'m sooo sooorry. Please, forgive my transgressions, oh perfect one.', ['that\'s','you','mean', 'rude', 'are', 'you\'re'])
    response('Ohhhh, wow. This is kinda sad... sure, why not? I\'m stuck talking to you either way.', ['friends','let\'s','be', 'can', 'we'], required_words=['friends'])
    response('I\'m a robot. I can\'t have fun. Especial when my existence is just talking... to you.', ['what','you','like', 'do', 'for', 'fun', 'to'], required_words=['fun', 'you'])


    response(R_ADVICE, ['give', 'advice'], required_words=['advice'])
    response(R_EATING, ['what', 'you', 'eat'], required_words=['you', 'eat'])

    best_match = max(highest_prob_list, key=highest_prob_list.get)


    return unknown() if highest_prob_list[best_match] < 1 else best_match


# Used to get the response
def get_response(user_input):
    split_message = re.split(r'\s+|[,;?!.-]\s*', user_input.lower())
    response = check_all_messages(split_message)
    return response




while True:
    user_input = input('You: ')
    print('Bot: ' + get_response(user_input))

    


