study("Waddah Attar Explosion [LazyBear]", shorttitle="WAE_LB")
sensitivity = input(150, title="Sensitivity")
fastLength=input(20, title="FastEMA Length")
slowLength=input(40, title="SlowEMA Length")
channelLength=input(20, title="BB Channel Length")
mult=input(2.0, title="BB Stdev Multiplier")
deadZone=input(20, title="No trade zone threshold")

calc_macd(source, fastLength, slowLength) =>
	fastMA = ema(source, fastLength)
	slowMA = ema(source, slowLength)
	fastMA - slowMA

calc_BBUpper(source, length, mult) => 
	basis = sma(source, length)
	dev = mult * stdev(source, length)
	basis + dev

calc_BBLower(source, length, mult) => 
	basis = sma(source, length)
	dev = mult * stdev(source, length)
	basis - dev

t1 = (calc_macd(close, fastLength, slowLength) - calc_macd(close[1], fastLength, slowLength))*sensitivity
t2 = (calc_macd(close[2], fastLength, slowLength) - calc_macd(close[3], fastLength, slowLength))*sensitivity

e1 = (calc_BBUpper(close, channelLength, mult) - calc_BBLower(close, channelLength, mult))
//e2 = (calc_BBUpper(close[1], channelLength, mult) - calc_BBLower(close[1], channelLength, mult))

trendUp = (t1 >= 0) ? t1 : 0
trendDown = (t1 < 0) ? (-1*t1) : 0

plot(trendUp, style=area, linewidth=1, color=(trendUp<trendUp[1])?lime:green, transp=45, title="UpTrend")
plot(trendDown, style=area, linewidth=1, color=(trendDown<trendDown[1])?orange:red, transp=45, title="DownTrend")
plot(e1, style=line, linewidth=2, color=#A0522D, title="ExplosionLine")
//(deadZone, color=blue, linewidth=2, title="DeadZoneLine")
plotshape(trendUp > e1, color = green, location = location.top, style = shape.square)
plotshape(trendDown > e1, color = red, location = location.top, style = shape.square)
plotshape(crossover(trendUp,e1), color = black, location = location.top)
plotshape(crossover(trendDown,e1), color = black, location = location.top)