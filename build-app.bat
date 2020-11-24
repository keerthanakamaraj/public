@echo off
REM Build Angular App 

setlocal

    echo Build Options
    echo 1. Cloud Build ( default )
    echo 2. Demo Server Build
    echo 3. Canara Bank IUT Build
    echo 4. Canara Bank SIT Build

    set _option=1
    set /p _option="Select Option from above "

    @REM echo Selected : %_option%

    set config=production

    IF %_option% == 2 (
        set config=demo
    ) ELSE (
        IF %_option% == 3 (
            set config=canara-iut
        ) ELSE (
            IF %_option% == 4 (
                set config=canara-sit
            ) ELSE (
                set config=production
            )
        )
    )

    echo selected config %config%
    echo running command ng build --configuration %config% --base-href /rlo/ --sourceMap=true

    ng build --configuration %config% --base-href /rlo/ --sourceMap=true

endlocal
