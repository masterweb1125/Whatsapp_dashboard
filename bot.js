const wppconnect = require('@wppconnect-team/wppconnect');
wppconnect
  .create({
    // ...
    session: 'barkery',
    puppeteerOptions: {
      userDataDir: 'log/barkery', // or your custom directory
      args: ['--no-sandbox']
    },
    catchQR: (base64Qrimg, asciiQR, attempts, urlCode) => {
        // console.log('Number of attempts to read the qrcode: ', attempts);
        // console.log('Terminal qrcode: ', asciiQR);
        // console.log('base64 image string qrcode: ', base64Qrimg);
        // console.log('urlCode (data-ref): ', urlCode);
    },
    statusFind: (statusSession, session) => {
        
        console.log('Status Session: ', statusSession);
        console.log('Session name: ', session);
    }, 
    headless: true,
    devtools: true,
    useChrome: true,
    debug: false,
    autoClose: false,
    tokenStore: 'log/barkery/file',
    folderNameToken: 'log/barkery/token',

    // ...
  })
  .then((client) => start(client))
  .catch((error) => console.log(error));

  function start(client) {
    client.onMessage(async (message) => {
        var content = message.body.toLowerCase()

        console.log("message => ", content);

        if (content.includes('yes')) {
            await client.sendText(message.from, 'Please pick the preferred date (July 22, 23, 24)')
        }

        if (content.includes('July') || content.includes('22') || content.includes('thank you')) {
            // await client.sendImage(message.from, './uploads/bye.gif')
            await client.sendText(message.from, 'Please pick the preferred time(8:00 PM, 9:00 PM, 10:00 PM, 11:00 PM)')
        }

        if (content.includes('PM') || content.includes('8') || content.includes('9')) {
            // await client.sendImage(message.from, './uploads/bye.gif')
            await client.sendText(message.from, 'How many guests will you bring (+1, +2, +3, +4')
        }

        if (content.includes('+1') || content.includes('+2') || content.includes('+3') || content.includes('+4')) {
            await client.sendText(message.from, 'Share Location(Reply "Share") or I want a digital invitation(Reply "digital")')
        }

        if (content.includes('share') || content.includes('address') ) {
            await client.sendText(message.from, 'Thank you, our courier will contact you asap')
        }

        if (content.includes('digital')) {
            await client.sendText(message.from, 'Thank you, our support will send you your digital invitation asap')
        }
    });
  }