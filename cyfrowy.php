<!DOCTYPE html>
<html lang="pl">
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zegar cyfrowy</title>

    <link rel="stylesheet" href="cyfrowy/cyfrowy.css?n=<?=rand()?>">

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

    <script src="cyfrowy/makeDarker.js?n=<?=rand()?>"></script>
    <script src="cyfrowy/saving.js?n=<?=rand()?>"></script>
    <script src="cyfrowy/clock.js?n=<?=rand()?>"></script>
    <script src="cyfrowy/cyfrowy-settings.js?n=<?=rand()?>"></script>
    <script src="cyfrowy/colorChanger.js?n=<?=rand()?>"></script>
    <script src="cyfrowy/reloader.js?n=<?=rand()?>"></script>
    <script src="cyfrowy/themes.js?n=<?=rand()?>"></script>
    <script src="cyfrowy/app.js?n=<?=rand()?>"></script>

    <link rel="stylesheet" href="cyfrowy/cyfrowy-settings.css?n="<?=rand()?>">
    <link rel="stylesheet" href="cyfrowy/settings-preview.css?n="<?=rand()?>">

    <style id="custom-css"></style>
</head>
<body>
    <?php require_once("cyfrowy/settings.html") ?>    
    <div class="container">
        <div class="clock-and-settings">
            <div class="top-bar">
                <div class="settings-button">ustawienia</div>
                <a href="/"><div class="come-back">come back</div></a>
            </div>
            <div style="display:flex;justify-content:center;align-items:center;" class="clock">21:37</div>
        </div>
        <div class="progress-container">
            <div class="info"></div>
            <div class="progress-bar">
                <div class="progress-filled"></div>
            </div>
        </div>
    </div>
</body>
</html>