import random
import json

def get_daily_whakatauki():
    """
    Selects a random whakataukī from a predefined list.
    In a real application, this might come from a database or API.
    """
    whakatauki_list = [
        {
            "maori": "He aha te mea nui o te ao? He tāngata, he tāngata, he tāngata.",
            "english": "What is the most important thing in the world? It is the people, it is the people, it is the people."
        },
        {
            "maori": "Mā te kōrero, ka mōhio; mā te mōhio, ka mārama; mā te mārama, ka mātau; mā te mātau, ka ora.",
            "english": "Through discussion comes awareness; through awareness comes understanding; through understanding comes knowledge; through knowledge comes wellbeing."
        },
        {
            "maori": "Whaowhia te kete mātauranga.",
            "english": "Fill the basket of knowledge."
        },
        {
            "maori": "Poipoia te kakano kia puawai.",
            "english": "Nurture the seed and it will blossom."
        }
    ]
    
    selected = random.choice(whakatauki_list)
    return json.dumps(selected)

if __name__ == "__main__":
    print(get_daily_whakatauki())
