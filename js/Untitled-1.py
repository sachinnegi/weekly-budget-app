# cook your dish here
def find_max_sum(arr): 
    initial = 0
    extial = 0
    intttsstrng = ''
    extstrng = ''
    for i in arr:

        neeww_extial = extial if extial>initial else initial 
        new_extialstring = extstrng if extial>initial else intttsstrng
        initial = extial + i 
        if i > 0:
            intttsstrng = str(i) + " " +  extstrng
        extial = neeww_extial 
        extstrng = new_extialstring
        if extial == initial:
            j = 0
            fxx = extstrng.split()
            In = intttsstrng.split()
            while (j < len(fxx) and j < len(In)):
                if int(fxx[j]) > int(In[j]):
                    intttsstrng = extstrng
                    break
                elif int(fxx[j]) == int(In[j]):
                    j += 1
                else:
                    extstrng = intttsstrng
                    break
    if extial > initial:
        return extstrng.replace(" ","")
    elif extial == initial:
        return extstrng.replace(" ","")
    else:
        return intttsstrng.replace(" ","")
  
for T in range(int(input())):
    N = int(input())
    arr = list(map(int, input().split()))
    print(find_max_sum(arr))