import { reactive } from 'vue';

export const store = reactive({
    contatore: 0,
    contatoreOrizzontale: 0,
    contatoreBackground: 0,
    contatoreBackgroundOrizzontale: 0,

    confArray: [
        ['showroom', 'Sezione della pagina dedicata alla presentazione', false],
        ['projects', 'Qui di seguito troverai i vari progetti e potrai approfondirne i dettagli', false],
        ['projects', "Questo Progetto è una prova incosistente, rappresentazione della manchevolezza umana, il vuoto come presenza fissa, l'incosistenza dell'esperire umano. Cancellami.", true, ['Progetto di prova esempio', 'https://sitiwebfox.it/images/realizzazione-siti-web-professionali.png', 'https://kinsta.com/it/wp-content/uploads/sites/2/2020/02/migliori-pratiche-di-web-design-1024x512.jpg'], '#FF5154', [['html', '#e47c0f'], ['css', '#57a2e7'], ['javascript', '#D6AB27'], ['laravel', '#f44336'], ['php', '#6C4BC0']], 'Fullstack'],
        ['projects', 'Progetto2 di prova con elementi specifici per verede che succede se metto info lunghe che sembrano volere dire  qualcosa.', true, ['Prova due - prova', 'https://kinsta.com/it/wp-content/uploads/sites/2/2021/09/how-to-translate-a-website-1024x512.jpeg', 'https://www.ionos.it/digitalguide/fileadmin/DigitalGuide/Teaser/web-apps-t.jpg', 'https://www.raiscuola.rai.it/cropgd/1900x1069/dl/img/2021/02/09/1612868746079_monitor-1307227_1920.jpg', 'https://files.spazioweb.it/32/3d/323d8cfb-176d-4c90-9ba9-a4fe6eab5d58.jpeg'], '#5E2A40', [['html', '#e47c0f'], ['MySql', '#b65284'], ['laravel', '#f44336'], ['php', '#6C4BC0']], 'Backend'],
        ['contacts', 'Danesh@mail.it', false],
        ['extra', 'qui puoi vedere progetti extra', false]
    ],

    newConfArray: [['showroom', 'Sezione della pagina dedicata alla presentazione', false],
    ['projects', 'Qui di seguito troverai i vari progetti e potrai approfondirne i dettagli', false],
    ['projects', "Questo Progetto è una prova incosistente, rappresentazione della manchevolezza umana, il vuoto come presenza fissa, l'incosistenza dell'esperire umano. Cancellami.", true, ['Progetto di prova esempio', 'https://sitiwebfox.it/images/realizzazione-siti-web-professionali.png', 'https://kinsta.com/it/wp-content/uploads/sites/2/2020/02/migliori-pratiche-di-web-design-1024x512.jpg'], '#FF5154', [['html', '#e47c0f'], ['css', '#57a2e7'], ['javascript', '#D6AB27'], ['laravel', '#f44336'], ['php', '#6C4BC0']], 'Fullstack'],
    ['projects', 'Progetto2 di prova con elementi specifici per verede che succede se metto info lunghe che sembrano volere dire  qualcosa.', true, ['Prova due - prova', 'https://kinsta.com/it/wp-content/uploads/sites/2/2021/09/how-to-translate-a-website-1024x512.jpeg', 'https://www.ionos.it/digitalguide/fileadmin/DigitalGuide/Teaser/web-apps-t.jpg', 'https://www.raiscuola.rai.it/cropgd/1900x1069/dl/img/2021/02/09/1612868746079_monitor-1307227_1920.jpg', 'https://files.spazioweb.it/32/3d/323d8cfb-176d-4c90-9ba9-a4fe6eab5d58.jpeg'], '#5E2A40', [['html', '#e47c0f'], ['MySql', '#b65284'], ['laravel', '#f44336'], ['php', '#6C4BC0']], 'Backend'],
    ['contacts', 'Danesh@mail.it', false],
    ['extra', 'qui puoi vedere progetti extra', false]
    ],
});