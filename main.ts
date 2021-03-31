input.onButtonPressed(Button.A, function () {
    if (paddleA.get(LedSpriteProperty.X) > 0) {
        paddleA.change(LedSpriteProperty.X, -1)
        paddleB.change(LedSpriteProperty.X, -1)
    }
})
input.onButtonPressed(Button.B, function () {
    if (paddleA.get(LedSpriteProperty.X) < 3) {
        paddleA.change(LedSpriteProperty.X, 1)
        paddleB.change(LedSpriteProperty.X, 1)
    }
})
input.onGesture(Gesture.Shake, function () {
    control.reset()
})
let paddleB: game.LedSprite = null
let paddleA: game.LedSprite = null
let jukebox = randint(1, 2)
paddleA = game.createSprite(2, 4)
paddleB = game.createSprite(3, 4)
let ball = game.createSprite(randint(0, 4), 0)
let directionY = 1
let directionX = randint(-1, 1)
basic.pause(500)
basic.forever(function () {
    ball.change(LedSpriteProperty.X, directionX)
    ball.change(LedSpriteProperty.Y, directionY)
    if (ball.isTouching(paddleA) || ball.isTouching(paddleB)) {
        ball.change(LedSpriteProperty.X, directionX * -1)
        ball.change(LedSpriteProperty.Y, -1)
        directionY = -1
        directionX = randint(-1, 1)
        game.addScore(1)
    } else {
        if (ball.get(LedSpriteProperty.Y) <= 0) {
            directionY = 1
            directionY = randint(-1, 1)
        } else if (ball.get(LedSpriteProperty.Y) >= 4) {
            ball.set(LedSpriteProperty.Blink, 0)
            basic.pause(1000)
            music.stopMelody(MelodyStopOptions.Background)
            for (let index = 0; index < 3; index++) {
                basic.showString("GAME OVER")
                basic.showNumber(game.score())
            }
            control.reset()
        }
        if (ball.get(LedSpriteProperty.X) <= 0) {
            directionX = 1
        } else if (ball.get(LedSpriteProperty.X) >= 4) {
            directionX = -1
        }
        basic.pause(500)
    }
})
basic.forever(function () {
    if (input.buttonIsPressed(Button.AB)) {
        if (jukebox == 1) {
            music.startMelody(music.builtInMelody(Melodies.Entertainer), MelodyOptions.ForeverInBackground)
        } else if (jukebox == 2) {
            music.startMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.ForeverInBackground)
        }
    } else if (game.isGameOver()) {
        music.stopMelody(MelodyStopOptions.Background)
    }
})
