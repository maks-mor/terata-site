@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Установка окружения и создание ярлыка Terata

echo ============================================================
echo      НАСТРОЙКА КОРПОРАТИВНОГО САЙТА TERATA
echo ============================================================
echo.

:: Шаг 1. Проверка наличия Node.js
echo [1/3] Проверка Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo Node.js не обнаружен. Начинаем автоматическую установку...
    echo Пожалуйста, если Windows попросит разрешение, нажмите "Да"...
    echo.
    winget install OpenJS.NodeJS.LTS --accept-source-agreements --accept-package-agreements
    if %errorlevel% neq 0 (
        echo.
        echo Не удалось установить автоматически через winget.
        echo Открываем официальный сайт Node.js для ручной загрузки в один клик...
        start https://nodejs.org/en/download/
        echo После установки Node.js просто запустите этот файл еще раз!
        pause
        exit /b
    )
    echo.
    echo Node.js успешно установлен!
    echo Обновляем пути среды...
    set "PATH=%ProgramFiles%\nodejs;%APPDATA%\npm;%PATH%"
) else (
    for /f "tokens=*" %%v in ('node -v') do set NODE_VERSION=%%v
    echo Node.js уже установлен: %NODE_VERSION%
)

:: Шаг 2. Установка зависимостей проекта
echo.
echo [2/3] Подготовка модулей сайта (npm install)...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo Внимание: возникла заминка при установке модулей. Повторяем...
    call npm install
)

:: Шаг 3. Создание ярлыка на Рабочем столе
echo.
echo [3/3] Создание ярлыка на Рабочем столе...
powershell -NoProfile -ExecutionPolicy Bypass -Command "$ws = New-Object -ComObject WScript.Shell; $desktop = [Environment]::GetFolderPath('Desktop'); $shortcut = $ws.CreateShortcut([System.IO.Path]::Combine($desktop, 'Запустить Сайт Terata.lnk')); $shortcut.TargetPath = [System.IO.Path]::Combine('%~dp0', 'Запустить_Сайт.bat'); $shortcut.WorkingDirectory = '%~dp0'; $shortcut.IconLocation = 'shell32.dll,14'; $shortcut.Description = 'Запуск корпоративного сайта Terata'; $shortcut.Save()"

echo.
echo ============================================================
echo   ПОЗДРАВЛЯЕМ! ВСЕ ГОТОВО К РАБОТЕ!
echo.
echo   1. На вашем Рабочем столе появился ярлык:
echo      "Запустить Сайт Terata"
echo.
echo   2. Теперь откройте Antigravity, выберите "Open Folder"
echo      и укажите эту папку. Ассистент готов к работе!
echo ============================================================
echo.
echo Нажмите любую клавишу, чтобы сразу запустить сайт в браузере...
pause >nul

start "" "%~dp0Запустить_Сайт.bat"
exit /b
