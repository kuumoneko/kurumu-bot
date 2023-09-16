from Bard import Chatbot as BardChatBot
from EdgeGPT.EdgeGPT import Chatbot as EdgeChatBot
from EdgeGPT.EdgeGPT import ConversationStyle
import json
import asyncio
from asgiref.sync import sync_to_async
import re

config = json.loads(
    open('.\\database\\config.json', encoding="utf-8").read())




Secure_1PSID = config['Secure_1PSID']
Secure_1PSIDTS = config['Secure_1PSIDTS']

try:    
    edgechatbot = EdgeChatBot(cookies=config['cookies'])
except Exception as e:
    er = e
    
    
try:    
    bardchatbot = BardChatBot(Secure_1PSID, Secure_1PSIDTS)
except Exception as e:
    er =e



mess = "PC config for IT developer"
mode = "creative"


async def testing(mess, mode):

    output: str = ""

    if mode == "bard":
        
        res = await sync_to_async(bardchatbot.ask)(mess)
        output += res['content']

    elif mode == "creative":
        
        res = await edgechatbot.ask(prompt=mess,
                                    conversation_style=ConversationStyle.creative,
                                    simplify_response=True)
        output += res['text']
    elif mode == "balanced":
        res = await edgechatbot.ask(prompt=mess,
                                    conversation_style=ConversationStyle.balanced,
                                    simplify_response=True)
        output += res['text']
    elif mode == "precise":
        res = await edgechatbot.ask(prompt=mess,
                                    conversation_style=ConversationStyle.precise,
                                    simplify_response=True)
        output += res['text']
        

    emoji_pattern = re.compile(
        "["
        u"\U0001F600-\U0001F64F"  # emoticons
        u"\U0001F300-\U0001F5FF"  # symbols & pictographs
        u"\U0001F680-\U0001F6FF"  # transport & map symbols
        u"\U0001F1E0-\U0001F1FF"  # flags (iOS)
        "]+",
        flags=re.UNICODE,
    )
    
    if (output.find('}') != -1):
        output = output.split('}')[1];
    

    output = emoji_pattern.sub("", output)

    while output.find("[^") != -1:
        remp = output.find("[^")
        temp = output[remp: (len(output) + 5 + remp) - len(output)]
        output = output.replace(temp, "")

    while output.find("(^") != -1:
        remp = output.find("(^")
        temp = output[remp: (len(output) + 5 + remp) - len(output)]
        output = output.replace(temp, "")

    print(output)


def check(mess, mode):
    asyncio.run(testing(mess, mode))


if __name__ == "__main__":
    asyncio.run(testing(mess, mode))
