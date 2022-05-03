import array
import colorama
from colorama import Fore

class HammingCode():
    def __init__(self):
        self.data=[]#data
        self.reversed_data = []
        self.paritybits=[]#check bits
        self.reversed_paritybits = []
        self.hc = array.array('i')#full hamming code

    def createData(self,data):
        print(Fore.WHITE+"--------------------------------------------------------")
        for i in range(0, len(data)):
            self.data.append(int(data[i]))
        for i in reversed(self.data):#reverse's the data
            self.reversed_data.append(i)

        for i in range(len(self.data),0,-1):
            print(Fore.RED+" D"+str(i),end="")#for coloring output
        print(Fore.RED+": Location names")

        #print(*range(0+1, len(data)+1))
        print(Fore.BLUE+str(self.data)+": The given data")
        #self.reversed_data))

    def createParity(self):
        print(Fore.WHITE+"--------------------------------------------------------")
        if(len(self.data)==4):
            p1 = self.data[3] ^ self.data[2] ^ self.data[0]
            p2 = self.data[3] ^ self.data[1] ^ self.data[0]
            p3 = self.data[2] ^ self.data[1] ^ self.data[0]
            self.paritybits.append(p3)
            self.paritybits.append(p2)
            self.paritybits.append(p1)

        for i in range(len(self.paritybits),0,-1):
            print(Fore.GREEN+" P"+str(i),end="")#for coloring output
        print(Fore.GREEN+": Location names")  # for coloring output
        for i in reversed(self.paritybits):#reverse's the data
            self.reversed_paritybits.append(i)
        print(Fore.BLUE+str(self.paritybits)+": The check bits ")
        #print("The reversed check bits: " + str(self.reversed_paritybits))
        print(Fore.WHITE+"--------------------------------------------------------")
    def createHammingCode(self,data):
        self.createData(data)
        self.createParity()
        sayac_parity = 0
        sayac_data = 0
        for i in range(1,len(self.reversed_paritybits + self.reversed_data)+1):
            if((i&(i-1) == 0) and i != 0):#check if a number is a power of two
                self.hc.append(self.reversed_paritybits[sayac_parity])
                sayac_parity = sayac_parity + 1
            else:
                self.hc.append(self.reversed_data[sayac_data])
                sayac_data = sayac_data + 1
        self.hc.reverse()
        #For writing objects in hamming code
        sayac_parity = 1
        sayac_data = 1
        b = []
        print("",end="")
        for i in range(1, len(self.reversed_paritybits + self.reversed_data)+1):
            if ((i & (i - 1) == 0) and i != 0):  # check if a number is a power of two
                b.append("P"+str(sayac_parity))
                sayac_parity = sayac_parity + 1
            else:
                b.append("D"+str(sayac_data))
                sayac_data = sayac_data + 1
        b.reverse()
        print(Fore.MAGENTA+str(b)+": Location of bits")
        #For writing objects in hamming code
        print(Fore.BLUE+str(self.hc)+": The hamming code")
        print(Fore.WHITE + "--------------------------------------------------------")
    def calcRedundantBits(self,m):
        for i in range(m):
            if (2 ** i >= m + i + 1):
                return i

    def posRedundantBits(self,data, r):
        j = 0
        k = 1
        m = len(data)
        res = ''
        for i in range(1, m + r + 1):
            if (i == 2 ** j):
                res = res + '0'
                j += 1
            else:
                res = res + data[-1 * k]
                k += 1
        return res[::-1]

    def calcParityBits(self,arr, r):
        n = len(arr)
        for i in range(r):
            val = 0
            for j in range(1, n + 1):
                if (j & (2 ** i) == (2 ** i)):
                    val = val ^ int(arr[-1 * j])
            arr = arr[:n - (2 ** i)] + str(val) + arr[n - (2 ** i) + 1:]

        sayac_parity = 1
        sayac_data = 1
        b = []
        for i in range(1, len(arr) + 1):
            if ((i & (i - 1) == 0) and i != 0):  # check if a number is a power of two
                b.append("P" + str(sayac_parity))
                sayac_parity = sayac_parity + 1
            else:
                b.append("D" + str(sayac_data))
                sayac_data = sayac_data + 1
        b.reverse()
        print(Fore.MAGENTA + str(b) + ": Location of bits")
        return arr

    def detectError(self,nr):
        print(Fore.WHITE + "--------------------------------------------------------")
        error = input(Fore.BLUE+"put error:")
        print("Error Data is: " + Fore.MAGENTA +error)
        n = len(error)
        res = 0
        for i in range(nr):
            val = 0
            for j in range(1, n + 1):
                if (j & (2 ** i) == (2 ** i)):
                    val = val ^ int(error[-1 * j])
            res = res + val * (10 ** i)
        return int(str(res), 2)

data=input("enter data bits: ")
object=HammingCode()
if(len(data)==4):#created for 4 data bit
    object.createHammingCode(data)
    r = object.calcRedundantBits(4)
    correction = object.detectError(r)
    print(Fore.BLUE +"The position of error is: " + Fore.RED+str(correction))
elif(len(data)<4):
    print("\033[1;32mdata bit's length has to be bigger or equal than 4.\nTry again.")

else:#created other than 4 data bit
    data=str(data)
    m = len(data)
    r = object.calcRedundantBits(m)
    arr =object.posRedundantBits(data, r)
    hammingcode =object.calcParityBits(arr, r)
    print(Fore.BLUE+ hammingcode+": The hamming code is")
    correction = object.detectError(r)
    print("The position of error is: " + str(correction))