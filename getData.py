import time
import board
import busio
import adafruit_adxl34x
import max30102
import hrcalc
from pa1010d import PA1010D
import csv

m = max30102.MAX30102()

i2c = busio.I2C(board.SCL,board.SDA)
accelerometer = adafruit_adxl34x.ADXL345(i2c)
xCorrection=0.4971779
yCorrection=-0.9767423
zCorection=9.6654343
gps = PA1010D()
dataPas=[]
dataHB=[]
dataGPS=[]
def create_file_Pas():
    with open('C:/Users/louis/Desktop/raspberry/code_final/file/steo.csv','w',newline='') as fichiercsv:
        writer=csv.writer(fichiercsv)
        writer.writerow(["x","y","z"])
        for i in range(len(dataPas)):
            writer.writerow(dataPas[i])
def create_file_HB():
    with open('C:/Users/louis/Desktop/raspberry/code_final/file/steo.csv','w',newline='') as fichiercsv:
        writer=csv.writer(fichiercsv)
        writer.writerow([HB])
        for i in range(len(dataHB)):
            writer.writerow(dataHB[i])
def create_file_GPS():
    with open('C:/Users/louis/Desktop/raspberry/code_final/file/steo.csv','w',newline='') as fichiercsv:
        writer=csv.writer(fichiercsv)
        writer.writerow(["timMon","timMday","timYear","timHour","timMin","timSec","latitude","longitude","fix_quality","satellites","altitude_m","speed_knots","track_angle_deg","horizontal_dilution","height_geoid"])
        for i in range(len(dataPas)):
            writer.writerow(dataGPS[i])
while True:
        dataPas.append(accelerometer.acceleration)
        red, ir = m.read_sequential()
        dataHB.append(hrcalc.calc_hr_and_spo2(ir, red))
        result = gps.update()
        if result:
            dataGPS.append("""
                T: {timestamp}
                N: {latitude}
                E: {longitude}
                Alt: {altitude}
                Sats: {num_sats}
                Qual: {gps_qual}
                Speed: {speed_over_ground}
                Fix Type: {mode_fix_type}
                PDOP: {pdop}
                VDOP: {vdop}
                HDOP: {hdop}
                """.format(**gps.data)
                )


        time.sleep(1)
