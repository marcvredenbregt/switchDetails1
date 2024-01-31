# switchDetails1
Parse switch details

Uit een switch komt de ruwe data, zie bijlage: switch-transceiver-details.txt
We willen dit converteren naar het onderstaande JSON formaat met de volgende voorwaarden: 
Alle keys moeten naar lowercaseDe spaties in de keys moeten vervangen worden voor underscoresBij de keys, alle tekens na een niet alfanumeriek karakter negerenThreshold regels mag je negeren en hoeven niet terug te komen in de resultatenNumerieke waarden converteren naar een integer of float 
Voorbeeld output:
[   
    {       
        "port": 1,      
        "media_type": "SF+_SR",     
        "vendor_name": "FS",
        "part_number": "SFP-10GSR-85",
        "serial_number": "G1807220408",
        "wavelength": "850 nm",
        "temp": 
        {    
            "value": 35.00,    
            "status": "Normal"
        },
        "voltage_aux-1": {
            "value": 3.27,
            "status": "Normal"
        },
        "tx_power": {
            "value": -2.82,
            "status": "Normal"
        },
        "rx_power": {
            "value": -4.47,
            "status": "Normal"
        },
        "tx_bias_current": {
            "value": 5.28,
            "status": "Normal"
        },
    }, 
    ... 
    { 
        "port": 22, 
        "error": "Transceiver is not present on this port",
    },
    ...
    {
        "port": 25, 
        "error": "DDMI is not supported on this 1000T transceiver",
    },
] 
