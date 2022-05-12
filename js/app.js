


const app = new Vue({
    el: '#app',
    data: {
        newMessage: '',
        search: '',
        activeIndex: 0,
        activeContact: null,
        contacts: [
            {
            name: 'Michele',
            avatar: 'img/avatar_1.jpeg',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Hai portato a spasso il cane?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Ricordati di stendere i panni',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 16:15:22',
                    message: 'Tutto fatto, ma mi devi dire dove metterli!',
                    status: 'received'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Dentro all ármadio, nel secondo cassetto.',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'A dopo.',
                    status: 'sent'
                },
            ],
        },
        {
            name: 'Fabio',
            avatar: 'img/avatar_2.jpeg',
            visible: true,
            messages: [
                {
                    date: '20/03/2020 16:30:00',
                    message: 'Ciao come stai?',
                    status: 'sent'
                },
                {
                    date: '20/03/2020 16:30:55',
                    message: 'Bene grazie! Stasera ci vediamo?',
                    status: 'received'
                },
                {
                    date: '20/03/2020 16:35:00',
                    message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                    status: 'sent'
                }
            ],
        },
        {
            name: 'Samuele',
            avatar: 'img/avatar_3.jpeg',
            visible: true,
            messages: [
                {
                    date: '28/03/2020 10:10:40',
                    message: 'La Marianna va in campagna',
                    status: 'received'
                },
                {
                    date: '28/03/2020 10:20:10',
                    message: 'Sicuro di non aver sbagliato chat?',
                    status: 'sent'
                },
                {
                    date: '28/03/2020 16:15:22',
                    message: 'Ah scusa!',
                    status: 'received'
                }
            ],
        },
        {
            name: 'Alessandro B.',
            avatar: 'img/avatar_4.jpeg',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Lo sai che ha aperto una nuova pizzeria?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Si, ma preferirei andare al cinema',
                    status: 'received'
                }
            ],
        },
        {
            name: 'Alessandro L.',
            avatar: 'img/avatar_5.jpeg',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Ricordati di chiamare la nonna',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Va bene, stasera la sento',
                    status: 'received'
                }
            ],
        },
        {
            name: 'Claudia',
            avatar: 'img/avatar_6.jpeg',
            visible: true,
            lastAccess: '15:03',
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Ciao Claudia, hai novità?',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Non ancora',
                    status: 'received'
                },
                {
                    date: '10/01/2020 15:51:00',
                    message: 'Nessuna nuova, buona nuova',
                    status: 'sent'
                }
            ],
        },
        {
            name: 'Federico',
            avatar: 'img/avatar_7.jpeg',
            visible: true,
            messages: [
                {
                    date: '10/01/2020 15:30:55',
                    message: 'Fai gli auguri a Martina che è il suo compleanno!',
                    status: 'sent'
                },
                {
                    date: '10/01/2020 15:50:00',
                    message: 'Grazie per avermelo ricordato, le scrivo subito!',
                    status: 'received'
                }
            ],
        },
        {
            name: 'Davide',
            avatar: 'img/avatar_8.jpeg',
            visible: true,
            messages: [],
        }
        ]
    },
    computed: {
        reversedMessage: function() {
            console.log('reversed message fire!')
            return this.newMessage.split('').reverse().join('');
        },
        numeroMessaggi: function() {
            const messages = this.contacts[ this.activeIndex ].messages;
            // console.log( messages );
            return messages.length;
        },
        contattiFiltrati: function() {

            const nuovoArray = this.contacts.filter( el => {
                return el.name.toLowerCase().includes( this.search.toLowerCase() )
            })

            return nuovoArray;

        }
    },
    methods: {
        revert: function(text) {
            console.log('revert method fire!')
            return text.split('').reverse().join('');
        },
        selectContact: function(contact,index) {
            this.activeIndex = index
            this.activeContact = contact;
            // console.log(this.activeContact);
        },
        getHours: function( date ) {
            const ora = date.split(' ')[1];
            return ora.substring(0,5);
        },
        send: function(index) {

            // creaimo il messaggio come obj con le prop message, date e status
            console.log('messaggio inviato nella chat: ', this.activeIndex )
            const message = this.createMessage( this.newMessage,'sent' );
            // const index = this.activeIndex;
            console.log('indice interno a send: ', index )
            // pushare il messaggio dentro all'array di messaggi del contatto attivo
            this.contacts[index].messages.push( message );
            
            // resettare l'input
            this.newMessage = '';

            //dopo 1 s mandare una risposta automatica
            setTimeout( () => {
                console.log( this )
                this.replyTo( index );
            }, 2000 );
        },
        replyTo: function(index) {
            // console.log('ripsondo dopo 1 secondo')

            console.log('risposta inviata nella chat: ', this.activeIndex )
            console.log('indice interno a replyTo: ', index )
            const message = this.createMessage('ok','received');

           this.contacts[ index ].messages.push( message );
        },
        createMessage: function(message,status) {
            const d = new Date();

            const date = dayjs().format('DD/MM/YYYY HH:mm:ss')
            console.log( date );

            const newMessage = {
                status: status,
                message: message,
                date
            }


            return newMessage;

        },
        filtraContatti: function() {
            // console.log( this.search );
            this.contacts.forEach( el => {
                
                if( el.name.toLowerCase().includes( this.search.toLowerCase() ) ) {
                    console.log( el.name );
                    el.visible = true
                } else {
                    el.visible = false
                }

            })

        },
        getLastMessage: function( contact ) {

            const { messages } = contact;

            if( messages.length === 0) {
                return '';
            }
            const lastIndex = messages.length - 1;
            const lastMessage = messages[ lastIndex ];
            // console.log( lastIndex, lastMessage )
            return lastMessage.message;

        }
    },
    created() {
        this.selectContact( this.contacts[0],0 );
    },
})
