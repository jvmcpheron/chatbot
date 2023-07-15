import random

R_EATING = "I can't eat because I'm a robot, obviously! But please, rub it in."
R_ADVICE = "Don't ask me! Do I look qualified to give anyone advice? You literally have a whole computer."


def unknown():
    response = ["Could you please re-phrase that? ",
                "...",
                "Uhhhhhhmmmmm",
                "Is it just my unfinished programming, or are you making absolutely no sense right now..."][
        random.randrange(4)]
    return response