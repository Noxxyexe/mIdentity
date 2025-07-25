ESX = exports['es_extended']:getSharedObject()

AddEventHandler('playerSpawned', function()
    TriggerServerEvent('checkIdentity')
end)

RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function()
    TriggerServerEvent('checkIdentity')
end)

RegisterNetEvent('mIdentity:openUI')
AddEventHandler('mIdentity:openUI', function()
    CameraIdentityMenu()
    SetEntityCoords(PlayerPedId(), -797.630737, 327.283508, 189.701050, false, false, false, true)
    SetEntityHeading(PlayerPedId(), 5.669291)
    Wait(1000)
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'openIdentityUI'
    })
end)

RegisterNetEvent('mIdentity:openSkin')
AddEventHandler('mIdentity:openSkin', function()
    SetNuiFocus(true, true)
    SendNUIMessage({
        action = 'openSkinUI'
    })
end)

RegisterNUICallback('submitIdentity', function(data, cb)
    TriggerServerEvent('mIdentity:saveIdentity', data)
    SetNuiFocus(false, false)
    cb('ok')
    DoScreenFadeOut(500)
    Wait(1000)
    ResetCameras()
    Wait(500)
    CameraSkinMenu()
    DoScreenFadeIn(500)
    Wait(500)
    TriggerEvent('mIdentity:openSkin')
end)

RegisterNUICallback('closeSkinUI', function(_, cb)
    SetNuiFocus(false, false)
    cb('ok')
    DoScreenFadeOut(500)
    Wait(1500)
    SetEntityCoords(PlayerPedId(), -775.213196, 312.514282, 85.692993, false, false, false, true)
    SetEntityHeading(PlayerPedId(), 170.078735)
    ResetCameras()
    Wait(500)
    DoScreenFadeIn(500)
    TriggerEvent('skinchanger:getSkin', function(skin)
        TriggerServerEvent('esx_skin:save', skin)
    end)
    DisplayRadar(true)
end)

RegisterNUICallback('showNotification', function(data, cb)
    if ESX and ESX.ShowNotification then
        ESX.ShowNotification(data.text or 'Notification')
    end
    cb('ok')
end)

RegisterNUICallback("changeGender", function(data, cb)
    local gender = tonumber(data.gender)
    if gender then
        changeGender(gender)
    end
    if cb then cb("ok") end
end)

local Character = {}
local pedModel = 'mp_m_freemode_01'
function changeGender(sex)
	if sex == 0 then
		Character['sex'] = 0
		pedModel = 'mp_m_freemode_01'
		changeModel(pedModel)
	else
		Character['sex'] = 1
		pedModel = 'mp_f_freemode_01'
		changeModel(pedModel)
	end
end

RegisterNUICallback('setGender', function(data, cb)
    local sex = tonumber(data.sex)
    changeGender(sex)
    cb({})
end)

function changeModel(skin)
	local model = GetHashKey(skin)
    if IsModelInCdimage(model) and IsModelValid(model) then
        RequestModel(model)
        while not HasModelLoaded(model) do
            Citizen.Wait(0)
        end
        SetPlayerModel(PlayerId(), model)
        SetPedDefaultComponentVariation(PlayerPedId())

        if skin == 'mp_m_freemode_01' then
            SetPedComponentVariation(GetPlayerPed(-1), 3, 15, 0, 2) -- arms
            SetPedComponentVariation(GetPlayerPed(-1), 11, 15, 0, 2) -- torso
            SetPedComponentVariation(GetPlayerPed(-1), 8, 15, 0, 2) -- tshirt
            SetPedComponentVariation(GetPlayerPed(-1), 4, 61, 4, 2) -- pants
            SetPedComponentVariation(GetPlayerPed(-1), 6, 34, 0, 2) -- shoes

            Character['arms'] = 15
            Character['torso_1'] = 15
            Character['tshirt_1'] = 15
            Character['pants_1'] = 61
            Character['pants_2'] = 4
            Character['shoes_1'] = 34
            Character['glasses_1'] = 0

        elseif skin == 'mp_f_freemode_01' then
            SetPedComponentVariation(GetPlayerPed(-1), 3, 15, 0, 2) -- arms
            SetPedComponentVariation(GetPlayerPed(-1), 11, 5, 0, 2) -- torso
            SetPedComponentVariation(GetPlayerPed(-1), 8, 15, 0, 2) -- tshirt
            SetPedComponentVariation(GetPlayerPed(-1), 4, 57, 0, 2) -- pants
            SetPedComponentVariation(GetPlayerPed(-1), 6, 35, 0, 2) -- shoes

            Character['arms'] = 15
            Character['torso_1'] = 5
            Character['tshirt_1'] = 15
            Character['pants_1'] = 57
            Character['pants_2'] = 0
            Character['shoes_1'] = 35
            Character['glasses_1'] = -1
        end

        SetModelAsNoLongerNeeded(model)
    end
end

local heritage = {
    mom = 0,
    dad = 0,
    shapeMix = 0.5
}

RegisterNUICallback("updateHeritage", function(data, cb)
    heritage.mom = data.mom or heritage.mom
    heritage.dad = data.dad or heritage.dad
    heritage.shapeMix = data.shapeMix or heritage.shapeMix

    TriggerEvent('skinchanger:change', 'mom', heritage.mom)
    TriggerEvent('skinchanger:change', 'dad', heritage.dad)
    TriggerEvent('skinchanger:change', 'ShapeMixData', heritage.shapeMix)

    cb("ok")
end)

RegisterNUICallback("updateFaceMdWeight", function(data, cb)
    local weight = tonumber(data.face_md_weight)
    if weight then
        TriggerEvent("skinchanger:change", "face_md_weight", weight)
        TriggerEvent("skinchanger:change", "skin_md_weight", weight)
    end
    cb("ok")
end)

RegisterNUICallback("updateEyeColor", function(data, cb)
    local eyeColor = tonumber(data.eye_color)
    if eyeColor then
        TriggerEvent("skinchanger:change", "eye_color", eyeColor)
    end
    cb("ok")
end)

RegisterNUICallback("updateEyebrows", function(data, cb)
    local val = tonumber(data.eyebrows_1)
    if val then
        TriggerEvent("skinchanger:change", "eyebrows_1", val)
        TriggerEvent("skinchanger:change", "eyebrows_2", 10)
    end
    cb("ok")
end)

RegisterNUICallback("updateEyebrowsColor", function(data, cb)
    local eyebrowsColor = tonumber(data.eyebrows_3)
    if eyebrowsColor then
        TriggerEvent("skinchanger:change", "eyebrows_3", eyebrowsColor)
    end
    cb("ok")
end)

RegisterNUICallback("updateHair", function(data, cb)
    local hairValue = tonumber(data.hair_1)
    if hairValue then
        TriggerEvent("skinchanger:change", "hair_1", hairValue)
    end
    cb("ok")
end)

RegisterNUICallback("updateHairColor", function(data, cb)
    local hairColor = tonumber(data.hair_color_1)
    if hairColor then
        TriggerEvent("skinchanger:change", "hair_color_1", hairColor)
    end
    cb("ok")
end)

RegisterNUICallback("updateBeard", function(data, cb)
    local beardValue = tonumber(data.beard_1)
    if beardValue then
        TriggerEvent("skinchanger:change", "beard_1", beardValue)
        TriggerEvent("skinchanger:change", "beard_2", 10)
    end
    cb("ok")
end)

RegisterNUICallback("updateBeardColor", function(data, cb)
    local beardColor = tonumber(data.beard_3)
    if beardColor then
        TriggerEvent("skinchanger:change", "beard_3", beardColor)
    end
    cb("ok")
end)

local identityCamera = nil
local skinCamera = nil

function CameraIdentityMenu()
    if identityCamera then
        DestroyCam(identityCamera, true)
        identityCamera = nil
    end
    DisplayRadar(false)
    FreezeEntityPosition(PlayerPedId(), true)
    identityCamera = CreateCam("DEFAULT_SCRIPTED_CAMERA", true)
    SetCamCoord(identityCamera, -785.802185, 342.131866, 188.112061)
    SetCamRot(identityCamera, 0.0, 0.0, 175.748032, 0)
    SetCamActive(identityCamera, true)
    RenderScriptCams(true, true, 500, true, true)
end

function CameraSkinMenu()
    if skinCamera then
        DestroyCam(skinCamera, true)
        skinCamera = nil
    end
    DisplayRadar(false)
    skinCamera = CreateCam("DEFAULT_SCRIPTED_CAMERA", true)
    SetCamCoord(skinCamera, -797.723083, 328.839569, 191.501050)
    SetCamRot(skinCamera, -10.0, 0.0, 181.417328, 2)
    SetCamActive(skinCamera, true)
    RenderScriptCams(true, true, 500, true, true)
    FreezeEntityPosition(playerPed, true)
end

function ResetCameras()
    RenderScriptCams(false, true, 500, true, true)
    if identityCamera then DestroyCam(identityCamera, true) identityCamera = nil end
    if skinCamera then DestroyCam(skinCamera, true) skinCamera = nil end
end