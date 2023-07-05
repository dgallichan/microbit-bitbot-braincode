radio.onReceivedValueDeprecated(function (name, value) {
    drivebitbot(name, value)
})
function drivebitbot (parameterName: string, parameterValue: number) {
    topSpeed = 0.5
    topSpeedAnalogue = 1
    if (parameterName == "Turn") {
        RawRoll = parameterValue
        MappedRoll = pins.map(
        RawRoll,
        -90,
        90,
        -100,
        100
        )
        RollLeft = MappedRoll
        RollRight = -1 * MappedRoll
    }
    if (parameterName == "Drive") {
        RawPitch = parameterValue
        MappedPitch = pins.map(
        RawPitch,
        -90,
        90,
        -100,
        100
        )
        PitchLeft = MappedPitch
        PitchRight = MappedPitch
    }
    LeftOutput = (PitchLeft + RollLeft) / 2
    RightOutput = (PitchRight + RollRight) / 2
    if (RawPitch == 0 && RawRoll == 0) {
        bitbot.stop(BBStopMode.Coast)
    } else {
        if (LeftOutput > 0) {
            bitbot.move(BBMotor.Left, BBDirection.Forward, topSpeedAnalogue * LeftOutput)
        } else {
            bitbot.move(BBMotor.Left, BBDirection.Reverse, topSpeedAnalogue * (-1 * LeftOutput))
        }
        if (RightOutput > 0) {
            bitbot.move(BBMotor.Right, BBDirection.Forward, topSpeedAnalogue * RightOutput)
        } else {
            bitbot.move(BBMotor.Right, BBDirection.Reverse, topSpeedAnalogue * (-1 * RightOutput))
        }
    }
    if (parameterName == "Go") {
        if (parameterValue >= 0) {
            bitbot.goms(BBDirection.Forward, topSpeed * 100, parameterValue)
        } else {
            bitbot.goms(BBDirection.Reverse, topSpeed * 100, -1 * parameterValue)
        }
    }
    if (parameterName == "Rotate") {
        if (parameterValue >= 0) {
            bitbot.rotatems(BBRobotDirection.Right, topSpeed * 100, parameterValue)
        } else {
            bitbot.rotatems(BBRobotDirection.Left, topSpeed * 100, -1 * parameterValue)
        }
    }
    if (parameterName == "Grabber") {
        bitbot.ledBrightness(Math.map(parameterValue, 0, 90, 0, 255))
    }
}
let RightOutput = 0
let LeftOutput = 0
let PitchRight = 0
let PitchLeft = 0
let MappedPitch = 0
let RawPitch = 0
let RollRight = 0
let RollLeft = 0
let MappedRoll = 0
let RawRoll = 0
let topSpeedAnalogue = 0
let topSpeed = 0
radio.setGroup(240)
basic.showLeds(`
    # # # . .
    # . . # .
    # # # . .
    # . . # .
    # # # . .
    `)
bitbot.select_model(BBModel.Classic)
bitbot.ledRainbow()
basic.forever(function () {
	
})
