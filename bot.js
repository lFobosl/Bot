const Discord = require("discord.js");//Es un archivo de discord que se puede descargar

const Token = "NDkyMzQzNjA1MDU1MTkzMDg5.XQPPcg.blbn54OWS4ZNWEr0pRAJDLR4e0s"//Es el toke del bot para poder conectarse al servidor

const bot = new Discord.Client();

const config = require("./config.json");

bot.on("ready",() => {
	console.log("Estoy listo");
});

bot.on("message", (message) =>{

    var prefix = config.prefix;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    const command = args.shift().toLowerCase();



if(command === 'join'){ // Comando para que el bot pueda entrar en un canal de voz
	let Canalvoz = message.member.voiceChannel;

	if(!Canalvoz || Canalvoz.type !== 'voice'){
		message.channel.send('¡Nesetas unirte al canal de voz').catch(error => message.channel.send(error));
	} else if (message.guild.voiceConnection){
		message.channel.send('Ya estoy conectado al canal de voz');
	} else{
		message.channel.send('Conenctando....').then(m =>{
				Canalvoz.join().then(() =>{
					m.edit(':white_check_mark: | Conectado exitosamente.').catch(error => message.channel.send(error));
				}).catch(error => message.channel.send(error));
		}).catch(error => message.channel.send(error));
	}
}
 
	if (command === 'leave') { // Comando para desconectar el bot del canal de voz
        let Canalvoz = message.member.voiceChannel;
        if (!Canalvoz) {
            message.channel.send('No estoy en un canal de voz.');
        } else {
            message.channel.send('Dejando el canal de voz.').then(() => {
            Canalvoz.leave();
            }).catch(error => message.channel.send(error));
        }   
    }


    if (command === 'play'){

        const ytdl = require ("ytdl-core");
        
        let voiceChannel = message.member.voiceChannel;

        if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz!');

        if(!args) return message.channel.send('Ingrese un enlace de youtube para poder reproducurlo');


        voiceChannel.join()

        .then(connection => {
            
            const url = ytdl(args, { filter : 'audioonly' });

            const dispatcher = connection.playStream(url);

            message.channel.send('Reproduciendo ahora '+ args);

            message.delete();
            
            dispatcher.on ('Acabouse', () =>{
                //Se activa cuando la transmisión/canción ha terminado.
            });
            
            dispatcher.on('error' , e =>{
                //Se activa cuando detecta cualqier error que pueda surgir.
                console.log(e);
            });
            
            dispatcher.setVolume(0.5); //Ajuste el volumen a 50%
            dispatcher.setVolume(1); //Adjustar el volumen de nuevo al 100%
            
            
            dispatcher.time; // El tiempo en milisegundos durante la secuancias que ha estado en transmisón.
            
            dispatcher.pause(); // Detener la secuencia de transmisión
            dispatcher.resume(); // Continuar la secuencia de transmisión
            
            disparcher.end() // Finalizar el dispatcher, emite evento 'end' 
            
        })

        .catch(console.error);
    }
    if(command  === 'radio'){

        let voiceChannel = message.member.voiceChannel;

        if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
            voiceChannel.join().then(conexion =>{
            conexion.playStream('http://stream.electroradio.fm:80/192k/;');
            message.channel.send('Radio electro activado.')
            return;
      })
      
      .catch(console.error);
  }


    }
});

bot.login(Token);