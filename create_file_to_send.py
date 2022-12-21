import csv

date=[]
heure=[]
vitesse=[]
nombreDePas=[]
longitude=[]
latitude=[]
altitude=[]
frequenceCardiaque=[]
data_pas=[]

def recup_step_from_file():
    i=0
    with open("C:/Users/louis/Desktop/raspberry/code_final/file/step.csv", 'r') as file:
        csvreader = csv.reader(file)
        for row in csvreader:
            if i != 0:
                data_pas.append(float(row[2]))
            i+=1

def traitement_pas():
    nombre_de_pas=0
    somme = sum(data_pas)
    moyenne = somme/len(data_pas)
    for j in range(int(len(data_pas)/10)):
        for i in range(10):
            if data_pas[10*j+i]-moyenne > 0 and data_pas[10*j+i+1]-moyenne < 0 and (data_pas[10*j+i]-moyenne)-(data_pas[10*j+i+1]-moyenne) > 0.75:
                nombre_de_pas+=1
        nombreDePas.append(nombre_de_pas) 
        nombre_de_pas=0

def recup_gps_from_file():
    i=0
    with open("C:/Users/louis/Desktop/raspberry/code_final/file/GPS.csv", 'r') as file:
        csvreader = csv.reader(file)
        for row in csvreader:
            if i!=0:
                date.append(row[2]+":"+row[0]+":"+row[4])
                heure.append(row[6]+":"+row[8]+":"+row[10])
                latitude.append(float(row[12]))
                longitude.append(float(row[14]))
                vitesse.append(float(str(round(float(row[22])*1.852,2))))
                altitude.append(row[20])
            i+=1

def recup_heart_rate_from_file():
    i=0
    with open("C:/Users/louis/Desktop/raspberry/code_final/file/HB.csv", 'r') as file:
        csvreader = csv.reader(file)
        for row in csvreader:
            if i!=0:
                frequenceCardiaque.append(row[0].split(",")[0][1:])
            i+=1


def create_file():
    with open('C:/Users/louis/Desktop/raspberry/code_final/file/data.csv','w',newline='') as fichiercsv:
        writer=csv.writer(fichiercsv)
        writer.writerow(['Date', 'Heure', 'Latitude', 'Longitude', 'Vitesse', 'Altitude', 'Frequence cardiaque', 'Nombre de pas'])
        for i in range(len(date)):
            if len(nombreDePas)<=i:
                nombreDePas.append("None")
            if len(frequenceCardiaque)<=i:
                frequenceCardiaque.append("None")
            writer.writerow([date[i], heure[i],latitude[i], longitude[i], vitesse[i], altitude[i], frequenceCardiaque[i], nombreDePas[i]])

recup_gps_from_file()
recup_heart_rate_from_file()
recup_step_from_file()
traitement_pas()
create_file()
