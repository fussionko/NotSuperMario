function initInput()
{
    document.addEventListener('keydown', checkKeyPressDown);
    document.addEventListener('keyup', checkKeyPressUp);
}

function initHold()
{
    holdA = 0;
    holdD = 0;
}
