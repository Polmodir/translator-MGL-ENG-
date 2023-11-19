// IMPORTING STUFF
import Telegram from "node-telegram-bot-api";
import Translate from "translate";

// TRANSLATE STUFF
Translate.engine = "google"; // picking google as my translate engine
Translate.key = process.env.DEEPL_KEY; // process something???

// TELEGRAM BOT STUFF
const token = "6955852038:AAHrcrMB63X7CeQLO0yZmDagLRFPn0F0TdI"; // my telegram token(very important)
const bot = new Telegram(token, { polling: true }); // i think its using the token to get into that bot and idk what polling does tbh

// ALPHABET
const mongolAlphabet = [
  "а","б","в","г","д","е","ё","ж","з","и","й","к","л","м","н","о","ө","п","р","с","т","у","ү","ф","х","ц","ч","ш","щ","ъ","ь","э","ю","я",
];
const englishAlphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
];
// A FUNCTION THAT CHECKS WHETHER THE INCOMING MESSAGE HAS ENGLISH LETTERS OR MONGOL LETTERS
function letterCheck(inputText, letters) {
  var state = false;
  letters.map((element) => {
    if (inputText.toLowerCase().includes(element)) {
      state = true;
    }
  });
  return state;
}
// TRANSLATOR
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  if (messageText == "/start") {
    var text =
      "Hello. I am a Mongolian and English translator made by Polmodir. Tell me something in either English or Mongolian";
  } else if (
    letterCheck(messageText, englishAlphabet) == true &&
    letterCheck(messageText, mongolAlphabet) == false
  ) {
    var text = await Translate(messageText, {from: "English", to: "Mongolian"});
  } else if (
    letterCheck(messageText, englishAlphabet) == false &&
    letterCheck(messageText, mongolAlphabet) == true
  ) {
    var text = await Translate(messageText, {from: "Mongolian", to: "English"});
  } else {
    var text = "error";
  }
  bot.sendMessage(chatId, text);
});
