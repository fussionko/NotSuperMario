function checkKeyPressDown(e)
{
    //a
    if(e.keyCode == "65")
    {
        player.left = 1;
        holdA = 1;
    }
    //d
    if(e.keyCode == "68")
    {
        player.right = 1;
        holdD = 1;
    }

    if(e.keyCode == "32" && !player.jump && !player.fall)
    {
        player.startJump();
    }
}

function checkKeyPressUp(e)
{
    //a
    if(e.keyCode == "65")
    {
        player.left = 0;
        holdA = 0;
    }
    //d
    else if(e.keyCode == "68")
    {
        player.right = 0;
        holdD = 0;
    }
}


function checkKeyHold()
{
    if(holdA)
        player.left = 1;
    if(holdD)
        player.right = 1;
}