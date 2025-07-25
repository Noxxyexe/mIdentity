ESX = exports['es_extended']:getSharedObject()

function GetMainIdentifier(src)
    for _, v in ipairs(GetPlayerIdentifiers(src)) do
        if string.sub(v, 1, 8) == "license:" then
            return string.sub(v, 9)
        end
    end
    return GetPlayerIdentifiers(src)[1]
end

RegisterNetEvent('checkIdentity')
AddEventHandler('checkIdentity', function(src)
    if not src then src = source end
    local identifier = GetMainIdentifier(src)
    MySQL.Async.fetchAll('SELECT firstname, lastname FROM users WHERE identifier = @identifier', {
        ['@identifier'] = identifier
    }, function(result)
        if result[1] == nil or result[1].firstname == nil or result[1].firstname == '' or result[1].lastname == nil or result[1].lastname == '' then
            TriggerClientEvent('mIdentity:openUI', src)
        end
    end)
end)

AddEventHandler('esx:playerLoaded', function(playerId, xPlayer)
    TriggerEvent('checkIdentity', playerId)
end)

RegisterNetEvent('mIdentity:saveIdentity')
AddEventHandler('mIdentity:saveIdentity', function(data)
    local src = source
    local identifier = GetMainIdentifier(src)

    local firstname = data.firstname or ''
    local lastname = data.lastname or ''
    local dateofbirth = data.dateofbirth or ''
    local sex = data.sex or ''
    local height = tonumber(data.height) or 0
    local history = data.history or ''

    exports.oxmysql:execute([[
        UPDATE users
        SET firstname = @firstname,
            lastname = @lastname,
            dateofbirth = @dateofbirth,
            sex = @sex,
            height = @height,
            history = @history
        WHERE identifier = @identifier
    ]], {
        ['@firstname'] = firstname,
        ['@lastname'] = lastname,
        ['@dateofbirth'] = dateofbirth,
        ['@sex'] = sex,
        ['@height'] = height,
        ['@history'] = history,
        ['@identifier'] = identifier
    }, function(affectedRows)
        if affectedRows == 0 then
            print('⚠️ [mIdentity] Aucun utilisateur trouvé avec l\'identifier : ' .. identifier)
        else
            print('✅ [mIdentity] Infos mises à jour pour : ' .. identifier)
        end
    end)
end)