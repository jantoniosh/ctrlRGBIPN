import ujson
from machine import Timer, Pin, I2C, ADC

potR = ADC(28)
potG = ADC(27)
potB = ADC(26)

factor_16 = 3.3 / (65535)

def counter(timer):
    global count
    r = factor_16 * potR.read_u16()
    g = factor_16 * potG.read_u16()
    b = factor_16 * potB.read_u16()
    rgb = ujson.dumps({"r": str(r),"g": str(g),"b": str(b)})
    print(rgb)
    
timer = Timer(-1)

timer.init(period=1000, mode=Timer.PERIODIC, callback=counter)

