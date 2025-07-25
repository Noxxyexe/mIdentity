-- Generated automaticly by RB Generator.
fx_version('cerulean')
games({ 'gta5' })

server_scripts({
    'server.lua',
    '@oxmysql/lib/MySQL.lua'
});

client_scripts({
    'client.lua',
});

ui_page('ui/index.html')

files({
    'ui/index.html',
    'ui/style.css',
    'ui/script.js',
    'ui/img/parent/*.png',
});

dependency('esx_skin', 'skinchanger')