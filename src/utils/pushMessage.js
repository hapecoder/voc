export function textToMsg(text, isSend = false) {
  let len = text.length

  switch (len) {
    //type text
    case 1:
      return {
        msg: text,
          isSend: isSend,
          type: "text",
          time: new Date(),
      };
      //type shortcut
    case 2:
      let software = text[0],
        method = text[1]
      return {
        msg: software == "None" ? "text-response": [software, method],
          isSend: isSend,
          type: software == "None" ? "text" : "shortcut",
          time: new Date()
      };
      //type audio
    case 3:
      return {
        msg: text[0],
          isSend: isSend,
          type: "audio",
          time: new Date(),
          timedelta: text[1], //duration
          waveTotal: text[2] //every wave's height 
      };
    default:
      return {
        msg: text,
          isSend: false,
          type: "text",
          time: new Date(),
      }
  }
}
